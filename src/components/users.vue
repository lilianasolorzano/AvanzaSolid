<template>
  <h1>Tabla de datos </h1>
  <!-- buscador  -->
<BtnGlobal btn_global="Agregar usuario" @click="add" class="btn btn-primary"/>
<div class="input-group mb-3">
  <input class="form-control" v-model="searchData" type="text" placeholder="Buscar...">
   
    <div class="input-group-append">
      <button @click="filterData" class="btn btn-primary">Buscar</button>
    </div>
  </div>
  <div class="tableData" >

    <table height="300px" class="table table-striped table-hover"  >
      <thead>
        <tr>
          <th class="text-left">
            userId
          </th>
          <th class="text-left">
            Nombre
          </th>
          <th class="text-left">
            Nombre de usuario
          </th>
          <th class="text-left">
            Correo
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>

      <tbody >
        <tr v-for="items in paginatedData" :key="items.id">

        <td>{{ items.id}}</td>
          <td>{{ items.name}}</td>
          <td>{{ items.username}}</td>
          <td>{{ items.email}}</td>
          <!-- <td>{{ data.completed}}</td> -->
          <td>
<button btn_global="Editar" @click="editData(items.id)" class="btn btn-warning">Editar</button>
<button btn_global="Eliminar" @click="removeUser(items.id)" class="btn btn-danger" >Eliminar</button>

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
import db from "../firebase/firebaseConfig";
import BtnGlobal from './BtnGlobal.vue';
import { ref, onMounted, computed } from 'vue';
import { getDocs, collection, doc , deleteDoc, setDoc} from 'firebase/firestore';


import { useRouter } from 'vue-router'; 
const router = useRouter();

// creacion de la busqueda 
const searchData = ref('');
const filteredData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(35);

const data = ref([])
// const error = ref(null);  

// leer datos de firebase 
const getDataFirebase = async() => {
  try{
    const getData = await getDocs(collection(db, 'usuarios'));
    data.value = getData.docs.map(doc => ({
      id:  doc.id,
      ...doc.data()
    }));
filteredData.value=data.value;
  }catch(error){
console.error('Error al obtener los datos', error)
  }
};
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
  currentPage = 1;
};

/// datos paginados
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});

//  número total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value);
});

// Cambiar de página
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};


// enviar a la pagina addUsers
const add =()=>
  {
    router.push({name:'addUsers'})

  }


// eliminar un documento 
const removeUser = async (items) => {
  try {
    await removeData(String(items));
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
  }
};

const removeData = async (items) => {
  try {
    if (typeof items !== 'string') {
      throw new Error('El items del usuario no es una cadena de texto');
    }
    await deleteDoc(doc(db, 'usuarios', items));
    console.log('Usuario eliminado', items);
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
  }
};
getDataFirebase();



// editar datos del documento 
const editData = (id) => {
  router.push({ name: 'update', params: { id } });
};

</script>

<style scoped>
.tableData{
  border: solid 4px black;
}

</style>
  