<template>
  <router-view/>
</template>

<script setup lang="js">

// // importacion de firebase para leer datos 
import { collection, getDocs, addDoc } from "firebase/firestore";
// // importacion de la base de datos
import db from "@/firebase/firebaseConfig";
import axios from 'axios';


const obtenerDatos = async() => {
  const datos = await getDocs (collection(db, 'usuarios'))
datos.forEach((documento)=> {
  console.log(documento.data());
})
}
obtenerDatos()


// const fetchData = async () => {
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users'); 
//     data.value = response.data;

//     if(typeof data == 'object' && data !== null){
//       // throw new error ('los datos de la API no son un objeto valido')
//       // guardar datos de la api 
//       const saveDoc = await addDoc(collection(db,'usuarios'), data);
//       console.log('datos guardados:', saveDoc.id);
//     }else{
//       throw new Error('la respuesta de la api no es un objeto valido ')
//     }



//   } catch (error) {
//     console.error('error al momento de guardar los datos:', error)
//   }
// };

// fetchData();

const importData = async () => {
  try {
    // Obtener datos de la API
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const data = response.data;

    // Guardar datos en Firestore
    const collectionRef = collection(db, 'usuarios');
    for (const user of data) {
      await addDoc(collectionRef, user);
    }

    console.log('Datos importados exitosamente.');
  } catch (error) {
    console.error('Error al importar los datos:', error);
  }
};

// Ejecutar la función cuando el componente se monta

  importData();

</script>
<style>
</style>
