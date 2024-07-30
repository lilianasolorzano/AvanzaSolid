// firebaseService.js
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig"; 

// Función para eliminar un documento
export const removeData = async (id) => {
  try {
    if (!id) {
      throw new Error("ID del documento no proporcionado");
    }

    const docRef = doc(db, "usuarios", id);
    console.log("Documento eliminado con ID:", id);
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
  }
};
