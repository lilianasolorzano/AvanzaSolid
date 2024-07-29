// firebaseService.js
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig"; // Ajusta el path según tu configuración

// Función para eliminar un documento
export const removeData = async (id) => {
  try {
    if (!id) {
      throw new Error("ID del documento no proporcionado");
    }

    // Crear la referencia al documento usando el ID
    const docRef = doc(db, "usuarios", id);

//     // Eliminar el documento
//     await deleteDoc(docRef);

    console.log("Documento eliminado con ID:", id);
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
  }
};
