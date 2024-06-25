// firebase.js

// Importa las funciones SDKs(osea las herramientas,bibliotecas y API proporcionadas por Firebase) que se necesita
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"; // Agrega la importación de Firestore

// Importar la configuracion del archivo credenciales.js
import { firebaseConfig } from "./credenciales.js";  

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Obtén una instancia de Firestore

export { db }; // Exporta la instancia de Firestore

