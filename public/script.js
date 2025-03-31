document.addEventListener('DOMContentLoaded', () => {
    // Obtener los datos de la tabla de "Personas"
    const fetchProducts = async () => {
        const res = await fetch('/productos');
        const productos = await res.json();
        const body = document.getElementById("personasBody");
        body.innerHTML = '';
        productos.forEach((producto) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${producto.ID_Persona}</td>
                <td>${producto.Nombre}</td>
                <td>${producto.Edad}</td>
                <td>${producto.Genero}</td>
                <td>${producto.IMC}</td>
                <td>${producto.Peso}</td>
                <td>${producto.Estatura}</td>
                <td>
                    <button onclick="deleteProduct(${producto.ID_Persona})">Eliminar</button>
                </td>
            `;
            body.appendChild(row);
        });
    };

    // Obtener los datos de la tabla de "Data Mart"
    const fetchDataMart = async () => {
        const res = await fetch('/datamart');
        const datamart = await res.json();
        const body = document.getElementById("datamartBody");
        body.innerHTML = '';
        datamart.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.ID_Paciente}</td>
                <td>${item.Nombre}</td>
                <td>${item.Edad}</td>
                <td>${item.Genero}</td>
                <td>${item.IMC}</td>
                <td>${item.Peso}</td>
                <td>${item.Estatura}</td>
            `;
            body.appendChild(row);
        });
    };

    // Eliminar un producto de la base de datos "Personas"
    const deleteProduct = async (id) => {
        await fetch('/productos/' + id, { method: 'DELETE' });
        fetchProducts();
    };

    // Ejecutar el proceso ETL
    const ejecutarETL = async () => {
        const res = await fetch('/ejecutarETL', { method: 'POST' });
        const result = await res.json();
        alert(result.message);
        fetchDataMart();
    };

    // Manejar el formulario de agregar personas
    document.getElementById("personaForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const genero = document.getElementById("genero").value;
        const edad = document.getElementById("edad").value;
        const imc = document.getElementById("imc").value;
        const peso = document.getElementById("peso").value;
        const estatura = document.getElementById("estatura").value;
        
        await fetch('/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, genero, edad, imc, peso, estatura })
        });

        fetchProducts(); // Recargar la tabla de personas
        e.target.reset(); // Limpiar el formulario
    });

    // Ejecutar proceso ETL al hacer clic en el botón
    document.getElementById("ejecutarETL").addEventListener("click", ejecutarETL);

    // Inicializar tablas al cargar la página
    fetchProducts();
    fetchDataMart();
});
