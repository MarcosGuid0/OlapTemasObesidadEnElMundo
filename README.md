Antes de ejecutar el proyecto dentro de un manejador de base de datos se debe crear dos base de datos no olvidar cambiar las credenciales en server.js en caso de ser diferente usuario:

#Creacion primera base de datos
create database obesidad;
use obesidad;

#CREACION TABLAS
CREATE TABLE Persona (
    ID_Persona INT AUTO_INCREMENT PRIMARY KEY ,
    Nombre VARCHAR(50),
    Genero VARCHAR(10),
    Edad INT,
    FechaNacimiento DATE
);

CREATE TABLE DatosClinicos (
    ID_DatosClinicos INT AUTO_INCREMENT PRIMARY KEY,
    IMC FLOAT,
    Peso FLOAT,
    Estatura FLOAT,
    ID_Persona INT,
    FOREIGN KEY (ID_Persona) REFERENCES Persona(ID_Persona)
);

CREATE TABLE Tratamientos (
    ID_Tratamientos INT AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(50),
    Resultados VARCHAR(255),
    FechaInicio DATE,
    FechaFinal DATE,
    ID_Persona INT,
    FOREIGN KEY (ID_Persona) REFERENCES Persona(ID_Persona)
);

CREATE TABLE HabitosAlimenticios (
    ID_Habitos INT AUTO_INCREMENT PRIMARY KEY,
    TipoDieta VARCHAR(50),
    FrecuenciaComida INT,
    ID_Persona INT,
    FOREIGN KEY (ID_Persona) REFERENCES Persona(ID_Persona)
);

CREATE TABLE Ejercicio (
    ID_Ejercicio INT AUTO_INCREMENT PRIMARY KEY,
    TipoActividad VARCHAR(50),
    FrecuenciaEjercicio INT,
    ID_Persona INT,
    FOREIGN KEY (ID_Persona) REFERENCES Persona(ID_Persona)
);

CREATE TABLE Familia (
    ID_Familia INT AUTO_INCREMENT PRIMARY KEY,
    AntecedentesFamilia VARCHAR(50),
    ID_Persona INT,
    FOREIGN KEY (ID_Persona) REFERENCES Persona(ID_Persona)
);

CREATE TABLE HistorialMedico (
    ID_Historial INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(50),
    Medicamentos VARCHAR(50),
    FechaDiagnostico DATE,
    ID_Persona INT,
    FOREIGN KEY (ID_Persona) REFERENCES Persona(ID_Persona)
);
#FIN DE LA CREACION DE TABLAS



#CREACION REGISTROS
INSERT INTO Persona (Nombre, Genero, Edad, FechaNacimiento) VALUES
('Juan Perez', 'Masculino', 35, '1989-03-15'),
('Ana Gomez', 'Femenino', 28, '1995-07-21'),
('Carlos Ruiz', 'Masculino', 42, '1982-11-30'),
('Maria Lopez', 'Femenino', 51, '1973-02-18'),
('Pedro Sanchez', 'Masculino', 29, '1994-05-10'),
('Luisa Martinez', 'Femenino', 37, '1986-08-14'),
('Ricardo Ortiz', 'Masculino', 50, '1974-01-25'),
('Carmen Diaz', 'Femenino', 45, '1978-10-05'),
('Alberto Vega', 'Masculino', 33, '1990-12-12'),
('Lucia Herrera', 'Femenino', 40, '1983-04-07');

INSERT INTO DatosClinicos (IMC, Peso, Estatura, ID_Persona) VALUES
(30.5, 85, 1.65, 1),
(25.4, 62, 1.55, 2),
(29.8, 92, 1.76, 3),
(32.1, 80, 1.58, 4),
(27.9, 72, 1.63, 5),
(31.3, 88, 1.68, 6),
(34.2, 100, 1.70, 7),
(28.7, 78, 1.60, 8),
(30.1, 82, 1.65, 9),
(26.9, 68, 1.70, 10);

INSERT INTO Tratamientos (Tipo, Resultados, FechaInicio, FechaFinal, ID_Persona) VALUES
('Dieta Baja en Carbohidratos', 'Perdida de 5 kg', '2024-01-15', '2024-02-15', 1),
('Ejercicio Aeróbico', 'Mejor resistencia', '2024-03-01', '2024-04-01', 2),
('Control de Calorías', 'IMC reducido', '2024-05-10', '2024-06-10', 3),
('Dieta Keto', 'Perdida de 4 kg', '2024-07-20', '2024-08-20', 4),
('Entrenamiento de Fuerza', 'Mayor masa muscular', '2024-09-01', '2024-10-01', 5),
('Ayuno Intermitente', 'Reducción de grasa corporal', '2024-02-15', '2024-03-15', 6),
('Dieta Vegetariana', 'Mejor salud general', '2024-04-10', '2024-05-10', 7),
('Entrenamiento HIIT', 'Mejora de metabolismo', '2024-06-15', '2024-07-15', 8),
('Plan de Nutrición Balanceada', 'Mantiene el peso', '2024-08-20', '2024-09-20', 9),
('Dieta Baja en Grasas', 'Perdida de 3 kg', '2024-10-01', '2024-11-01', 10);

INSERT INTO HabitosAlimenticios (TipoDieta, FrecuenciaComida, ID_Persona) VALUES
('Alta en Proteínas', 3, 1),
('Vegetariana', 4, 2),
('Baja en Carbohidratos', 5, 3),
('Mediterránea', 3, 4),
('Dieta Equilibrada', 3, 5),
('Ayuno Intermitente', 2, 6),
('Vegana', 4, 7),
('Alta en Fibra', 3, 8),
('Baja en Grasas', 3, 9),
('Control de Porciones', 5, 10);

INSERT INTO Ejercicio (TipoActividad, FrecuenciaEjercicio, ID_Persona) VALUES
('Caminar', 3, 1),
('Correr', 4, 2),
('Natación', 2, 3),
('Yoga', 3, 4),
('Levantamiento de Pesas', 5, 5),
('Bicicleta', 3, 6),
('Senderismo', 2, 7),
('HIIT', 4, 8),
('Pilates', 3, 9),
('Remo', 2, 10);

INSERT INTO Familia (AntecedentesFamilia, ID_Persona) VALUES
('Diabetes', 1),
('Hipertensión', 2),
('Obesidad', 3),
('Problemas Cardíacos', 4),
('Diabetes', 5),
('Obesidad', 6),
('Hipertensión', 7),
('Problemas Cardíacos', 8),
('Diabetes', 9),
('Obesidad', 10);

INSERT INTO HistorialMedico (Descripcion, Medicamentos, FechaDiagnostico, ID_Persona) VALUES
('Obesidad Grado 1', 'Metformina', '2023-05-10', 1),
('Hipertensión', 'Losartán', '2022-07-11', 2),
('Diabetes Tipo 2', 'Insulina', '2021-09-13', 3),
('Colesterol Alto', 'Estatinas', '2023-03-09', 4),
('Obesidad Grado 2', 'Orlistat', '2024-01-20', 5),
('Hipotiroidismo', 'Levotiroxina', '2023-02-28', 6),
('Obesidad Grado 3', 'Liraglutida', '2024-04-15', 7),
('Diabetes Tipo 1', 'Insulina', '2022-12-10', 8),
('Hipertensión', 'Amlodipino', '2021-11-05', 9),
('Obesidad Grado 1', 'Metformina', '2024-08-07', 10);
#FIN DE LA CREACION DE REGISTRO

select * from persona






#Aqui se crea la segunda base de datos
create database datamart;
use datamart
;
#CREACION TABLAS
CREATE TABLE Paciente (
    ID_Paciente INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Edad INT,
    Genero VARCHAR(10)
);

CREATE TABLE Tratamiento (
    ID_Tratamiento INT PRIMARY KEY,
    TipoTratamiento VARCHAR(100),
    FechaInicio DATE,
    FechaFinal DATE,
    Resultados VARCHAR(255)
);

CREATE TABLE Tratamientos (
    ID_Tiempo INT PRIMARY KEY,
    Ano DATE,
    Mes DATE,
    Dia DATE,
    Trimestre DATE,
    Semana DATE
);

CREATE TABLE Tabla_de_Hechos (
    ID_Persona INT PRIMARY KEY,
    IMC FLOAT,
    Peso FLOAT,
    Altura FLOAT,
    ID_Paciente INT,
    ID_Tratamiento INT,
    ID_Tiempo INT,
    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID_Paciente),
    FOREIGN KEY (ID_Tratamiento) REFERENCES Tratamiento(ID_Tratamiento),
    FOREIGN KEY (ID_Tiempo) REFERENCES Tratamientos(ID_Tiempo)
);


SELECT * FROM Paciente;
SELECT * FROM Tratamiento;
SELECT * FROM Tabla_de_Hechos;
