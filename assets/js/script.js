function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

function toggleFontSize() {
    document.body.classList.toggle('large-font');
}

import { actualizarPersona, obtenerPersonas, registrarPersona, eliminarPersona, obtenerPersona } from "./promesas.js";

// Espera a que la ventana cargue para agregar eventos a los elementos
window.addEventListener("load", () => {
    document.getElementById("toggleContrastButton").addEventListener("click", toggleContrast);
    document.getElementById("toggleFontSizeButton").addEventListener("click", toggleFontSize);
    document.getElementById("btnRegistrar").addEventListener("click", registrar);
    traerDatos();
    document.getElementById("btnActualizar").addEventListener("click", actualizar);
    document.getElementById("btnEliminar").addEventListener("click", eliminar);
});

// Función para validar el formato de un correo electrónico
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// Función para registrar una persona nueva
const registrar = () => {
    let eNombre = document.getElementById("nombre").value.trim();
    let eApellido = document.getElementById("apellido").value.trim();
    let eRut = document.getElementById("rut").value.trim();
    let eTelefonoCasa = document.getElementById("telefonocasa").value.trim();
    let eCelular = document.getElementById("celular").value.trim();
    let eEdad = document.getElementById("edad").value.trim();
    let eCorreo = document.getElementById("correo").value.trim();
    let eFechaNacimiento = document.getElementById("fechanacimiento").value.trim();
    let eGenero = document.getElementById("genero").value.trim();
    let eDireccion = document.getElementById("direccion").value.trim();
    let eAceptaTerminos = document.getElementById("acepto").checked;

    // Validación de campos
    if (!eNombre || !eApellido || !eRut || !eTelefonoCasa || !eCelular || !eEdad || !eCorreo || !eFechaNacimiento || !eGenero || !eDireccion) {
        alert("Todos los campos deben estar llenos.");
        return;
    }

    if (isNaN(eEdad) || eEdad <= 0) {
        alert("La edad debe ser un número positivo.");
        return;
    }

    if (!validateEmail(eCorreo)) {
        alert("El correo no tiene un formato válido.");
        return;
    }

    if (!eAceptaTerminos) {
        alert("Debe aceptar los términos y condiciones.");
        return;
    }

    let persona = {
        nombre: eNombre,
        apellido: eApellido,
        rut: eRut,
        telefonoCasa: eTelefonoCasa,
        celular: eCelular,
        edad: eEdad,
        correo: eCorreo,
        fechaNacimiento: eFechaNacimiento,
        genero: eGenero,
        direccion: eDireccion
    };

    // Registrar la persona en Firebase
    registrarPersona(persona).then(() => {
        alert("Se registró con éxito");
        traerDatos();
    }).catch((error) => {
        console.log(error);
    });
};

// Función para traer los datos de las personas registradas
const traerDatos = () => {
    obtenerPersonas().then((personas) => {
        let estructura = '';
        for (let persona of personas) {
            estructura += `
                <tr>
                    <td>${persona.nombre}</td>
                    <td>${persona.apellido}</td>
                    <td>${persona.rut}</td>
                    <td>${persona.telefonoCasa}</td>
                    <td>${persona.celular}</td>
                    <td>${persona.edad}</td>
                    <td>${persona.correo}</td>
                    <td>${persona.fechaNacimiento}</td>
                    <td>${persona.genero}</td>
                    <td>${persona.direccion}</td>
                    <td><button onclick="llenarFormulario('${persona.id}', 'actualizar')">Actualizar</button></td>
                    <td><button onclick="llenarFormulario('${persona.id}', 'eliminar')">Eliminar</button></td>
                </tr>
            `;
        }
        document.getElementById("tbPersonas").innerHTML = estructura;
    }).catch((error) => {
        console.log(error);
    });
};

// Función para actualizar los datos de una persona
const actualizar = () => {
    let idPersona = document.getElementById("idPersona").value;
    let personaActualizada = {
        nombre: document.getElementById("UPDnombre").value,
        apellido: document.getElementById("UPDapellido").value,
        rut: document.getElementById("UPDrut").value,
        telefonoCasa: document.getElementById("UPDtelefonocasa").value,
        celular: document.getElementById("UPDcelular").value,
        edad: document.getElementById("UPDedad").value,
        correo: document.getElementById("UPDcorreo").value,
        fechaNacimiento: document.getElementById("UPDfechanacimiento").value,
        genero: document.getElementById("UPDgenero").value,
        direccion: document.getElementById("UPDdireccion").value
    };

    actualizarPersona(idPersona, personaActualizada).then(() => {
        alert("Se actualizó con éxito");
        traerDatos();
    }).catch((error) => {
        console.log(error);
    });
};

// Función para eliminar una persona
const eliminar = () => {
    let idPersona = document.getElementById("idPersona").value;
    eliminarPersona(idPersona).then(() => {
        alert("Se eliminó con éxito");
        traerDatos();
    }).catch((error) => {
        console.log(error);
    });
};

// Función para llenar el formulario de actualización o eliminación
const llenarFormulario = (id, accion) => {
    obtenerPersona(id).then((persona) => {
        if (accion === "actualizar") {
            document.getElementById("UPDnombre").value = persona.nombre;
            document.getElementById("UPDapellido").value = persona.apellido;
            document.getElementById("UPDrut").value = persona.rut;
            document.getElementById("UPDtelefonocasa").value = persona.telefonoCasa;
            document.getElementById("UPDcelular").value = persona.celular;
            document.getElementById("UPDedad").value = persona.edad;
            document.getElementById("UPDcorreo").value = persona.correo;
            document.getElementById("UPDfechanacimiento").value = persona.fechaNacimiento;
            document.getElementById("UPDgenero").value = persona.genero;
            document.getElementById("UPDdireccion").value = persona.direccion;
            document.getElementById("idPersona").value = id;
        } else if (accion === "eliminar") {
            document.getElementById("DELnombre").value = persona.nombre;
            document.getElementById("DELapellido").value = persona.apellido;
            document.getElementById("DELrut").value = persona.rut;
            document.getElementById("DELtelefonocasa").value = persona.telefonoCasa;
            document.getElementById("DELcelular").value = persona.celular;
            document.getElementById("DELedad").value = persona.edad;
            document.getElementById("DELcorreo").value = persona.correo;
            document.getElementById("DELfechanacimiento").value = persona.fechaNacimiento;
            document.getElementById("DELgenero").value = persona.genero; // Agregar el campo genero
            document.getElementById("DELdireccion").value = persona.direccion; // Agregar el campo direccion
            document.getElementById("idPersona").value = id;
        }
    }).catch((error) => {
        console.log(error);
    });
};
