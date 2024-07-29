<!-- <template>
  <h1>Tabla de datos</h1>
  <BtnGlobal btn_global="Agregar usuario" @click="add" class="btn btn-primary" />
  <div class="input-group mb-3">
    <input class="form-control" v-model="searchData" type="text" placeholder="Buscar...">
    <div class="input-group-append">
      <button @click="filterData" class="btn btn-primary">Buscar</button>
    </div>
  </div>
  <div class="tableData">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="text-left">UserId</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Nombre de usuario</th>
          <th class="text-left">Correo</th>
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
            <button @click="editUser(item.id)" class="btn btn-warning">Editar</button>
            <button @click="deleteUser(item.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
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

const router = useRouter();
const searchData = ref('');
const filteredData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const data = ref([]);
const users = ref([])

const add = () => {
  router.push({ name: 'addUsers' });
};

const getDataFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    const userData = await Promise.all(querySnapshot.docs.map(async (doc) => {
      const subCollectionRef = collection(db, `${doc.id}/subcoleccion`);
      const subCollectionSnapshot = await getDocs(subCollectionRef);
      console.log(subCollectionRef.path)

      const subCollectionData = subCollectionSnapshot.docs.map(subDoc => ({
        subId: subDoc.id,
        ...subDoc.data()
      }));

      return {
        id: doc.id,
        ...doc.data(),
        subCollection: subCollectionData
      };
    }));
    users.value = userData;
  } catch (error) {
    console.error('Error al obtener los datos', error);
  }
};


onMounted(() => {
  getDataFirebase();
});

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

const editUser = (id) => {
  router.push({ name: 'update', params: { id } });
};

const deleteUser = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    try {
      await deleteDoc(doc(db, 'usuarios', id));
      getDataFirebase(); // Refresca los datos después de eliminar
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }
};
</script>

<style scoped>
.tableData {
  border: solid 4px black;
}
</style> -->
<!-- 
<template>
  <div>
    <h1>Usuarios</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="editUser(user.id)">Editar</button>
            <button @click="saveUserId(user.id)">Guardar ID</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const router = useRouter();
const users = ref([]);

// Obtener datos de la colección principal y la subcolección
const getDataFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    const userData = await Promise.all(querySnapshot.docs.map(async (doc) => {
      const subCollectionRef = collection(db, `${doc.id}/subcoleccion`);
      const subCollectionSnapshot = await getDocs(subCollectionRef);
      console.log(subCollectionRef.path)

      const subCollectionData = subCollectionSnapshot.docs.map(subDoc => ({
        subId: subDoc.id,
        ...subDoc.data()
      }));

      return {
        id: doc.id,
        ...doc.data(),
        subCollection: subCollectionData
      };
    }));
    users.value = userData;
  } catch (error) {
    console.error('Error al obtener los datos', error);
  }
};

onMounted(() => {
  getDataFirebase();
});

const editUser = (id) => {
  router.push({ name: 'update', params: { id } });
};

// Guardar el ID del documento en otra base de datos (colección)
const saveUserId = async (userId) => {
  try {
    await setDoc(doc(db, 'userIds', userId), {
      userId: userId,
      timestamp: new Date().toISOString() // Opcional: agregar un timestamp
    });
    alert('ID del usuario guardado exitosamente.');
  } catch (error) {
    console.error('Error al guardar el ID del usuario:', error);
  }
};
</script> -->

<!-- <template>
  <h1>Tabla de datos</h1>
  <BtnGlobal btn_global="Agregar usuario" @click="add" class="btn btn-primary" />
  <div class="input-group mb-3">
    <input class="form-control" v-model="searchData" type="text" placeholder="Buscar...">
    <div class="input-group-append">
      <button @click="filterData" class="btn btn-primary">Buscar</button>
    </div>
  </div>
  <div class="tableData">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="text-left">UserId</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Nombre de usuario</th>
          <th class="text-left">Correo</th>
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
            <button @click="editUser(item.id)" class="btn btn-warning">Editar</button>
            <button @click="deleteUser(item.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
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
const filteredData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const data = ref([]);
const users = ref([]);
const userStore = useUserStore();

const add = () => {
  router.push({ name: 'addUsers' });
};

const getDataFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    const userData = await Promise.all(querySnapshot.docs.map(async (userDoc) => {
      const subCollectionRef = collection(db, `${userDoc.id}`);
      const subCollectionSnapshot = await getDocs(subCollectionRef);

      userStore.setSelectedUser(subCollectionRef.path);
      console.log(userDoc.id)

      const subCollectionData = subCollectionSnapshot.docs.map(subDoc => ({
        subId: subDoc.id,
        ...subDoc.data()
      }));

      return {
        id: userDoc.id,
        ...userDoc.data(),
        subCollection: subCollectionData
      };
    }));
    // userStore.setUsers(userData)
    users.value = userData;
    filteredData.value = userData; // Inicializa filteredData con los datos obtenidos
  } catch (error) {
    console.error('Error al obtener los datos', error);
  }
};

onMounted(() => {
  getDataFirebase();
});

const filterData = () => {
  if (searchData.value.trim() === '') {
    filteredData.value = users.value; // Filtra sobre users en lugar de data
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

const editUser = (id) => {
  // userStore.setSelectedUser(id)
  router.push({ name: 'update', params: { id } });
};

const deleteUser = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    try {
      await deleteDoc(doc(db, 'usuarios', id));
      getDataFirebase(); // Refresca los datos después de eliminar
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }
};
</script>

<style scoped>
.tableData {
  border: solid 4px black;
}
</style> -->


<template>
  <h1>Tabla de datos</h1>
  <div>
    <h1>Datos de Usuario</h1>
    <button @click="logout" class="btn btn-danger">Cerrar Sesión</button>
    <!-- Resto del contenido -->
  </div>
  <BtnGlobal btn_global="Agregar usuario" @click="add" class="btn btn-primary" />
  <div class="input-group mb-3">
    <input class="form-control" v-model="searchData" type="text" placeholder="Buscar...">
    <div class="input-group-append">
      <button @click="filterData" class="btn btn-primary">Buscar</button>
    </div>
  </div>
  <div class="tableData">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="text-left">UserId</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Nombre de usuario</th>
          <th class="text-left">Correo</th>
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

const filterData = () => {
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

// const deleteUser = async (docId) => {
//   if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
//     try {
//       await deleteDoc(doc(db, "usuarios", docId));
//       getDataFirebase();
//     } catch (error) {
//       console.error('Error al eliminar el usuario:', error);
//     }
//   }

// };

const deleteUser = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {

    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    console.log("Documentos obtenidos:", querySnapshot.docs.map(doc => doc.id));

    // Encontrar el documento que contiene el ID interno del usuario
    const userDoc = querySnapshot.docs.find(doc => doc.data().id === id);
    console.log("userDocs", userDoc)

    try {
      await deleteDoc(doc(db, 'usuarios', userDoc.id));
      getDataFirebase();
      console.log("deleteDocs: ", userDoc.id)
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }
};

// import { useRouter } from 'vue-router';
import VueCookies from 'vue-cookies';

// const router = useRouter();

const logout = () => {
  VueCookies.remove('userAuthenticated');
  router.push({ name: 'login' });
};

</script>

<style scoped>
.tableData {
  border: solid 4px black;
}
</style>
