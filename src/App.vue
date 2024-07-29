<template>
  <router-view />
</template>

<script setup lang="js">

// // importacion de firebase para leer datos 
import { collection, getDocs, addDoc } from "firebase/firestore";
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// // importacion de la base de datos
import { db } from "@/firebase/firebaseConfig";
import axios from 'axios';


const obtenerDatos = async () => {
  try {
    const datos = await getDocs(collection(db, 'usuarios'))
    datos.forEach((documento) => {
      console.log(documento.data());
    })
  }
  catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};
obtenerDatos()



// const importData = async () => {
//   try {
//     // Obtener datos de la API
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//     const data = response.data;

//     // Guardar datos en Firestore
//     const collectionRef = collection(db, 'usuarios');
//     for (const user of data) {
//       await addDoc(collectionRef, user);
//     }

//     console.log('Datos importados exitosamente.');
//   } catch (error) {
//     console.error('Error al importar los datos:', error);
//   }
// };



import { query, where } from 'firebase/firestore';

const importData = async () => {
  try {
    // Obtener datos de la API
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const data = response.data;

    // Guardar datos en Firestore si no existen
    const collectionRef = collection(db, 'usuarios');
    for (const user of data) {
      // Verificar si el usuario ya existe en Firestore
      const q = query(collectionRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Si no existe, agregar el usuario
        await addDoc(collectionRef, user);
      } else {
        console.log(`El usuario con email ${user.email} ya existe.`);
      }
    }

    console.log('Datos importados exitosamente.');
  } catch (error) {
    console.error('Error al importar los datos:', error);
  }
};


importData();

</script>
<style></style>
