<template>
  <h1>Tabla de datos </h1>
  <BtnGlobal btn_global="Agregar usuario" @click="add" class="btn btn-primary"/>
  <div class="input-group mb-3">
    <input class="form-control" v-model="searchData" type="text" placeholder="Buscar...">
    <!-- buscador  -->
    <div class="input-group-append">
      <button @click="filterData" class="btn btn-primary">Buscar</button>
    </div>

  </div>
  <div class="tableData">
    <table height="300px" class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="text-left"> userId </th>
          <th class="text-left"> Nombre</th>
          <th class="text-left"> Nombre de usuario</th>
          <th class="text-left"> Correo</th>
          <th class="text-left"> Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="items in paginatedData" :key="items.id">
          <td>{{ items.id}}</td>
          <td>{{ items.name}}</td>
          <td>{{ items.username}}</td>
          <td>{{ items.email}}</td>
          <td>
            <!-- <button btn_global="Editar" @click="editData(items.id)" class="btn btn-warning">Editar</button> -->
            
            <!-- <router-link :to="{
                          name: 'update',
                          params: {id: items.id }
                          // params: {user_id: users.user_id }

                        }">
                        <v-icon style="color:black!important">edit</v-icon>
                      </router-link> -->

            <!-- <button  @click="removeUser(items.user_id)" class="btn btn-danger">Eliminar</button> -->
          </td>
        </tr>
      </tbody>
    </table>

    <!-- paginacion -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Anterior</a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Siguiente</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="js">
import db from '../firebase/firebaseConfig';
import BtnGlobal from './BtnGlobal.vue';
import { ref, onMounted, computed } from 'vue';
import { getDocs, collection } from 'firebase/firestore';
import { useRouter } from 'vue-router'; 
// import { deleteDoc,doc } from "firebase/firestore";
// import { useDataStore } from '@/store/counter';


const router = useRouter();
const searchData = ref('');
const filteredData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(40);

// iniciando pinia
// const userStore = useDataStore(); 
const data = ref([]);

// Enviar a la página addUsers
const add = () => {
  router.push({ name: 'addUsers' });
};

// Función para limpiar los datos
// const clearData = () => {
//   data.value = [];
//   filteredData.value = [];
// };

// Función para obtener los datos de Firebase
const getDataFirebase = async () => {
  try {
    // clearData(); // Limpiar los datos antes de obtener nuevos datos
    const getData = await getDocs(collection(db, 'usuarios'));
    const users = getData.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // userStore.setDataUsers(users);
    // userStore.userJson(users) // Guardar los datos en el store de Pinia
    data.value = users; // Actualizar la referencia local para compatibilidad
  } catch (error) {
    console.error('Error al obtener los datos', error);
  }
};
// const getDataFirebase = async() => {
//   const datos = await getDocs (collection(db, 'usuarios'))
// datos.forEach((documento)=> {
//   console.log(documento.data());
// })

//  userStore().setUserJson(datos.forEach);
// };
getDataFirebase()
// const getDataFirebase = async () => {
//   try {
//     // clearData(); // Asegúrate de que esta función esté definida correctamente

//     const getData = await getDocs(collection(db, 'usuarios'));
//     data.value = getData.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     // filteredData.value = data.value;
//     // useStore().setUserJson(data.value); // Asegúrate de que el store está bien definido y que este método existe
//   } catch (error) {
//     console.error('Error al obtener los datos', error);
//   }
// };

getDataFirebase()


// Función para buscar datos
const filterData = () => {
  if (searchData.value.trim() === '') {
    filteredData.value = data.value;
  } else {
    const query = searchData.value.toLowerCase();
    filteredData.value = data.value.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.username.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query)
    );
  }
  currentPage.value = 1;
};

// Datos paginados
// Computed para obtener los datos paginados desde el store
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  // return userStore.dataUsers.slice(start, end);
});
// const paginatedData = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage.value;
//   return filteredData.value.slice(start, start + itemsPerPage.value);
// });

// Número total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value);
});

// Cambiar de página
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};



// Eliminar un documento
// import { doc, deleteDoc } from "firebase/firestore";

// const users = ref([]);
// import { Firestore } from 'firebase/firestore';
// const deleted = ref(false);

// const removeUser = async (user_id) => {
//   const coletion = collection(db, 'users')
//   const q = query(coletion, where('user_id', '==', user_id))
//   const querySnapshot = await getDocs(q)
//   querySnapshot.forEach(async (docSnapshot) => {
//     await deleteDoc(doc(db, 'usuarios', docSnapshot.id))
//   })
//   deleted.value = true
// }




// Editar datos del documento
// const editData = (id) => {
//   router.push({ name: 'update', params: { id } });
// };


  getDataFirebase();

</script>



<style scoped>
.tableData {
  border: solid 4px black;
}
</style>
