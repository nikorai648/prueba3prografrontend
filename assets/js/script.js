import {actualizarPersona,obtenerPersonas,actualizarPersonas,registrarPersona,eliminarPersona } from "./promesas.js";

window.addEventListener("load",() =>{
    document.getElementById("btnRegistrar").addEventListener("click",registrar);
    traerDatos();
    document.getElementById("btnActualizar").addEventListener("click",actualizar);
    document.getElementById("btnEliminar").addEventListener("click",eliminar);
});

const registrar = () =>(
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eRut = document.getElementById("rut");
    let eTelefonoCasa = document.getElementById("telefonoCasa");
    let eCelular = document.getElementById("celular");
    let eEdad = document.getElementById("edad");
    let eCorreo = document.getElementById("correo");
    let eFechaNacimiento = document.getElementById("fechaNacimiento");

    let VNombre = eNombre.value;
    let VApellido = eApellido.value;
    let VRut = eRut.value;
    let VTelefonoCasa = eTelefonoCasa.value;
    let VCelular = eCelular.value;
    let VEdad = eEdad.value;
    let VCorreo = eCorreo.value;
    let VFechaNacimiento = eFechaNacimiento.value;
);

registrarPersona(objeto).then(() => {
    alert("Se registro con exito ");
    traerDatos();
}).catch((r) => {
    console.log(r);
});

const traerDatos = () =>{
    obtenerPersonas().then((personas) => {
        let estructura ="";
        personas.forEach((p) =>{
            estructura += '<tr><td>'${p.nombre}'</td';
            estructura += '<tr><td>'${p.apellido}'</td';
            estructura += '<tr><td>'${p.rut}'</td';
            estructura += '<tr><td>'${p.telefonoCasa}'</td';
            estructura += '<tr><td>'${p.celular}'</td';
            estructura += '<tr><td>'${p.edad}'</td';
            estructura += '<tr><td>'${p.correo}'</td';
            estructura += '<tr><td>'${p.fechaNacimiento}'</td';
            estructura += '<tr><button id=UPD'${p.id}'>Actualizar</button>/button></td';
            estructura += '<tr><button id=DEL'${p.id}'>Eliminar</button>/button></tr';
        });
        document.getElementById("tbPersonas").innerHTML = estructura;
        personas.forEach((p) => {
            let elemento =document.getElementById('UPD${p.id}');
            elemento.addEventListener("click",()=>{
                document.getElementById("UPDnombre").value = p.nombre;
                document.getElementById("UPDapellido").value = p.apellido;
                document.getElementById("UPDrut").value = p.rut;
                document.getElementById("UPDTelefonoCasa").value = p.telefonoCasa;
                document.getElementById("UPDcelular").value = p.celular;
                document.getElementById("UPDedad").value = p.edad;
                document.getElementById("UPDcorreo").value = p.correo;
                document.getElementById("UPDfechaNacimiento").value = p.fechaNacimiento;

            }
            )
        }

        )
        
        
         

        
        
            
        });
    }

  

  

