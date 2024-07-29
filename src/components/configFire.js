<<<<<<< HEAD
// // firebaseService.js
// import { deleteDoc, doc } from 'firebase/firestore';
// import db from '@/firebase/firebaseConfig'; // Ajusta el path según tu configuración

// // Función para eliminar un documento
// export const removeData = async (id) => {
//   try {
//     if (!id) {
//       throw new Error('ID del documento no proporcionado');
//     }

//     // Crear la referencia al documento usando el ID
//     const docRef = doc(db, 'usuarios', id);
=======
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
>>>>>>> bfce9f8837b14302d4f13fa23361b86c0b7a599b

//     // Eliminar el documento
//     await deleteDoc(docRef);

<<<<<<< HEAD
//     console.log('Documento eliminado con ID:', id);
//   } catch (error) {
//     console.error('Error al eliminar el documento:', error);
//   }
// };
=======
    console.log("Documento eliminado con ID:", id);
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
  }
};
>>>>>>> bfce9f8837b14302d4f13fa23361b86c0b7a599b
