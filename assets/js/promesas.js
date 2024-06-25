import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "./firebase.js";  // Importamos la instancia de Firestore

// Función para registrar una nueva persona
// Para: persona (objeto con datos de la persona a registrar)
// Retorna: nada
export const registrarPersona = async (persona) => {
    try {
        const docRef = await addDoc(collection(db, "personas"), persona);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// Función para obtener todas las personas
// Para: ninguno
// Retorna: array de objetos persona
export const obtenerPersonas = async () => {
    const ref = collection(db, "personas");
    const querySnapshot = await getDocs(ref);
    let personas = [];
    querySnapshot.forEach((doc) => {
        // Itera sobre cada documento en la colección personas y agrega sus datos al array personas
        personas.push({ ...doc.data(), id: doc.id });
    });
    return personas;
};

// Función para obtener una persona por ID
// Para: id (ID del documento a obtener)
// Retorna: objeto persona
export const obtenerPersona = async (id) => {
    const ref = doc(db, "personas", id);
    try {
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            return { ...docSnap.data(), id: docSnap.id };
        } else {
            throw new Error("No such document!");
        }
    } catch (e) {
        console.error("Error getting document: ", e);
    }
};

// Función para actualizar una persona
// Para: persona (objeto con los nuevos datos de la persona), id (ID del documento a actualizar)
// Retorna: nada
export const actualizarPersona = async (persona, id) => {
    const ref = doc(db, "personas", id);
    try {
        await updateDoc(ref, persona);
        console.log("Document updated with ID: ", id);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

// Función para eliminar una persona
// Para: id (ID del documento a eliminar)
// Retorna: nada
export const eliminarPersona = async (id) => {
    const ref = doc(db, "personas", id);
    try {
        await deleteDoc(ref);
        console.log("Document deleted with ID: ", id);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};
