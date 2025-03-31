const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Habilitar CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Middleware para procesar datos JSON en las solicitudes
app.use(express.json());

// Servir archivos estáticos (como script.js)
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la base de datos 'obesidad'
const connectionObesidad = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'obesidad' // Base de datos para las tablas relacionadas con personas y datos clínicos
});

// Conexión a la base de datos 'datamart'
const connectionDataMart = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'datamart' // Base de datos del datamart
});

// Conectar a las bases de datos
connectionObesidad.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos "obesidad"');
});

connectionDataMart.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos "datamart"');
});

// Función para realizar el proceso ETL
const ejecutarETL = () => {
    return new Promise((resolve, reject) => {
        const queryExtract = "SELECT p.ID_Persona, p.Nombre, p.Edad, p.Genero, dc.IMC, dc.Peso, dc.Estatura " +
                             "FROM Persona p JOIN DatosClinicos dc ON p.ID_Persona = dc.ID_Persona";  // Consultar la tabla de 'Persona' y 'DatosClinicos'

        connectionObesidad.query(queryExtract, (err, datosPersonas) => {
            if (err) {
                reject("Error al extraer datos: " + err);
                return;
            }

            // Transformación de los datos
            const datosTransformados = datosPersonas.map((persona) => {
                return {
                    ID_Paciente: persona.ID_Persona,
                    Nombre: persona.Nombre,
                    Edad: persona.Edad,
                    Genero: persona.Genero,
                    IMC: persona.IMC,
                    Peso: persona.Peso,
                    Estatura: persona.Estatura
                };
            });

            const queryLoad = "INSERT INTO datamart (ID_Paciente, Nombre, Edad, Genero, IMC, Peso, Estatura) VALUES ?";
            const values = datosTransformados.map((p) => [
                p.ID_Paciente,
                p.Nombre,
                p.Edad,
                p.Genero,
                p.IMC,
                p.Peso,
                p.Estatura
            ]);

            connectionDataMart.query(queryLoad, [values], (err) => {
                if (err) {
                    reject("Error al cargar datos en datamart: " + err);
                    return;
                }
                resolve("Proceso ETL completado correctamente");
            });
        });
    });
};

// Ruta para obtener los datos de personas y datos clínicos
app.get('/personas', (req, res) => {
    const query = `
        SELECT p.ID_Persona, p.Nombre, p.Edad, p.Genero, dc.IMC, dc.Peso, dc.Estatura
        FROM Persona p
        JOIN DatosClinicos dc ON p.ID_Persona = dc.ID_Persona
    `;
    connectionObesidad.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Ruta para agregar una persona a la base de datos 'Persona' y los datos clínicos a 'DatosClinicos'
app.post('/personas', (req, res) => {
    const { nombre, genero, edad, imc, peso, estatura } = req.body;

    // Insertar en la tabla Persona
    const queryPersona = 'INSERT INTO Persona (Nombre, Genero, Edad) VALUES (?, ?, ?)';
    connectionObesidad.query(queryPersona, [nombre, genero, edad], (err, resultPersona) => {
        if (err) throw err;
        const personaId = resultPersona.insertId;

        // Insertar en la tabla DatosClinicos
        const queryDatosClinicos = 'INSERT INTO DatosClinicos (ID_Persona, IMC, Peso, Estatura) VALUES (?, ?, ?, ?)';
        connectionObesidad.query(queryDatosClinicos, [personaId, imc, peso, estatura], (err, resultDatos) => {
            if (err) throw err;
            res.status(201).json({ message: 'Persona y datos clínicos agregados correctamente' });
        });
    });
});

// Ruta para eliminar una persona y sus datos clínicos
app.delete('/personas/:id', (req, res) => {
    const { id } = req.params;
    
    // Eliminar de la tabla DatosClinicos primero
    connectionObesidad.query('DELETE FROM DatosClinicos WHERE ID_Persona = ?', [id], (err) => {
        if (err) throw err;

        // Luego eliminar de la tabla Persona
        connectionObesidad.query('DELETE FROM Persona WHERE ID_Persona = ?', [id], (err) => {
            if (err) throw err;
            res.status(200).json({ message: 'Persona y datos clínicos eliminados correctamente' });
        });
    });
});

// Ruta para obtener los datos del Data Mart
app.get('/datamart', (req, res) => {
    connectionDataMart.query('SELECT * FROM datamart', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Ruta para ejecutar el proceso ETL
app.post('/ejecutarETL', async (req, res) => {
    try {
        const message = await ejecutarETL();
        res.json({ message });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Ruta para servir el archivo 'index.html' cuando se accede a la raíz del servidor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
