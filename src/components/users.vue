<template>
  <h1>Tabla de datos</h1>
  <BtnGlobal btn_global="Agregar usuario" @click="add" class="btn btn-primary" />
  <div class="input-group mb-3">
      <input class="form-control" v-model="searchData" type="text" placeholder="Buscar...">
      <button @click="filterDatas" class="btn btn-primary">Buscar</button>
  </div>

  <div class="input-group mb-3">
    <input class="form-control" v-model="searchId" type="text" placeholder="Buscar por ID">
    <input class="form-control" v-model="searchName" type="text" placeholder="Buscar por Nombre">
    <input class="form-control" v-model="searchUsername" type="text" placeholder="Buscar por Nombre de usuario">
    <input class="form-control" v-model="searchEmail" type="text" placeholder="Buscar por Correo">
    <div class="input-group-append">
        <button @click="filterData" class="btn btn-primary">Buscar</button>
      </div>
    </div>
  
  <div class="tableData">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="text-left"  @click="lisTable('id')">UserId</th>
          <th class="text-left"  @click="lisTable('name')">Nombre</th>
          <th class="text-left"  @click="lisTable('username')">Nombre de usuario</th>
          <th class="text-left" @click="lisTable('email')">Correo</th>
          <th class="text-left">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>
            <button @click="editUser(item)" class="btn btn-warning">Editar</button>
            <button @click="deleteUser(item.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import BtnGlobal from './BtnGlobal.vue';
import { useUserStore } from '../store/userStore';


const router = useRouter();
const searchData = ref('');
const searchId = ref('');
const searchName = ref('');
const searchUsername = ref('');
const searchEmail = ref('');
const filteredData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const users = ref([]);
const userStore = useUserStore();

const add = () => {
  router.push({ name: 'addUsers' });
};

const getDataFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    const userData = querySnapshot.docs.map(userDoc => ({
      id: userDoc.id,
      ...userDoc.data(),
    }));
    users.value = userData;
    filteredData.value = userData;
  } catch (error) {
    console.error('Error al obtener los datos', error);
  }
};

onMounted(() => {
  getDataFirebase();
});

// manera ascendente y descendente 
const AscDesKey = ref(''); 
const ActOrder = ref('asc'); // Orden actual ('asc' o 'desc')


const lisTable = (key) => {
  if (AscDesKey.value === key) {
    ActOrder.value = ActOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    AscDesKey.value = key;
    ActOrder.value = 'asc';
  }
  
  // Ordenar la lista
  filteredData.value.sort((a, b) => {
    let result = 0;
    if (a[key] > b[key]) {
      result = 1;
    } else if (a[key] < b[key]) {
      result = -1;
    }
    
    return ActOrder.value === 'asc' ? result : -result;
  });
};
// nn 

const filterData = () => {
  filteredData.value = users.value.filter(item => {
    return (
      (searchId.value === '' || item.id.toLowerCase().includes(searchId.value.toLowerCase())) &&
      (searchName.value === '' || item.name.toLowerCase().includes(searchName.value.toLowerCase())) &&
      (searchUsername.value === '' || item.username.toLowerCase().includes(searchUsername.value.toLowerCase())) &&
      (searchEmail.value === '' || item.email.toLowerCase().includes(searchEmail.value.toLowerCase()))
    );
  });
  currentPage.value = 1;
};
const filterDatas = () => {
  if (searchData.value.trim() === '') {
    filteredData.value = users.value;
  } else {
    const query = searchData.value.toLowerCase();
    filteredData.value = users.value.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.username.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query)
    );
  }
  currentPage.value = 1;
};

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const editUser = (user) => {
  userStore.setSelectedUser(user);
  router.push({ name: 'update' });
};


// const deleteUser = async (id) => {
//   if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
//     await userStore.deleteUser(id);
//     filterData();
//   }
// };
const deleteUser = async (id) => {
  // await deleteDoc(doc(db, 'usuarios', id));
  if (confirm(`¿Estás seguro de que deseas eliminar este usuario? ${id}`)) {
    await userStore.deleteUser(id);
    filterData();
  }
};



</script>

<style scoped>
.tableData {
  border: solid 4px black;
}
</style>
