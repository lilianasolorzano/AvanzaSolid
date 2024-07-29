<!-- <template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-container grid-list-md>
          <v-card>
            <v-card-text>
              <h1>Edit User</h1>
              <v-layout row wrap>
                <v-flex xs4>
                  <input id="nome" v-model="userEdit.user_id" label="ID">
                </v-flex>
                <v-flex xs4>
                  <input id="email" v-model="userEdit.name" label="Nome">
                </v-flex>
                <v-flex xs4>
                  <input id="nome" v-model="userEdit.email" label="E-mail">
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn to="/users" color="primary">
                <v-icon color="white">arrow_back</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="red">
                <v-icon color="white">cancel</v-icon>
              </v-btn>
              <button color="green" @click="updateUser">
                <v-icon color="white">save</v-icon>
              </button>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const showEditModal = ref(false);
const userEdit = ref({ user_id: '', user_name: '', user_email: '' });

const fetchUser = async () => {
  const userId = route.params.id;
  if (!userId) {
    console.error('No se encontró el ID del usuario en la ruta');
    return;
  }
  const userDoc = await getDoc(doc(db, 'usuarios', userId));
  if (userDoc.exists()) {
    userEdit.value = { user_id: userDoc.id, ...userDoc.data() };
  } else {
    console.error('No se encontró el usuario');
  }
};

const updateUser = async () => {
  if (userEdit.value.user_id) {
    const usersCollection = collection(db, 'usuarios');
    const q = query(usersCollection, where('id', '==', userEdit.value.user_id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      await updateDoc(docSnapshot.ref, {
        user_id: userEdit.value.user_id,
        user_name: userEdit.value.user_name,
        user_email: userEdit.value.user_email
      });
    });
    showEditModal.value = false;
    router.push('/users'); // Redirigir después de la edición
  }
};

onMounted(() => {
  fetchUser();
});
</script> -->

<!-- <template>
  <div>
    <h1>Editar Usuario</h1>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="email">Correo:</label>
        <input type="email" v-model="user.email" class="form-control" id="email" required>
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" v-model="user.name" class="form-control" id="name" required>
      </div>
      <div class="form-group">
        <label for="username">Nombre de Usuario:</label>
        <input type="text" v-model="user.username" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="user.password" class="form-control" id="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useUserStore } from '../store/userStore';

const router = useRouter();
const userStore = useUserStore();
const user = ref({});

onMounted(() => {
  user.value = userStore.selectedUser;
});

const updateUser = async () => {
  try {
    await updateDoc(doc(db, 'usuarios', user.value.id), {
      email: user.value.email,
      name: user.value.name,
      username: user.value.username,
      password: user.value.password,
    });
    alert('Usuario actualizado con éxito');
    router.push({ name: 'dataTable' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};
</script> -->

<!-- <template>
  <div>
    <h1>Editar Usuario</h1>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="email">Correo:</label>
        <input type="email" v-model="user.email" class="form-control" id="email" required>
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" v-model="user.name" class="form-control" id="name" required>
      </div>
      <div class="form-group">
        <label for="username">Nombre de Usuario:</label>
        <input type="text" v-model="user.username" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="user.password" class="form-control" id="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  doc, updateDoc, getDoc

} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useUserStore } from '../store/userStore';

const router = useRouter();
const userStore = useUserStore();
const user = ref({});

onMounted(() => {
  if (userStore.selectedUser) {
    user.value = { ...userStore.selectedUser };
  } else {
    // Maneja el caso donde no hay usuario seleccionado
    console.error("No se ha seleccionado un usuario");
    router.push({ name: 'dataTable' });
  }
});

const updateUser = async () => {
  try {
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
    await updateDoc(doc(db, 'usuarios', user.value.id), {
      email: user.value.email,
      name: user.value.name,
      username: user.value.username,
      password: user.value.password,
    });
    alert('Usuario actualizado con éxito');
    userStore.clearSelectedUser();
    router.push({ name: 'dataTable' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};
</script> -->

<!-- <template>
  <div>
    <h1>Editar Usuario</h1>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="email">Correo:</label>
        <input type="email" v-model="user.email" class="form-control" id="email" required>
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" v-model="user.name" class="form-control" id="name" required>
      </div>
      <div class="form-group">
        <label for="username">Nombre de Usuario:</label>
        <input type="text" v-model="user.username" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="user.password" class="form-control" id="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useUserStore } from '../store/userStore';

const router = useRouter();
const userStore = useUserStore();
const user = ref({});

onMounted(() => {
  if (userStore.selectedUser) {
    user.value = { ...userStore.selectedUser };
  } else {
    // Maneja el caso donde no hay usuario seleccionado
    console.error("No se ha seleccionado un usuario");
    router.push({ name: 'dataTable' });
  }
});

const updateUser = async () => {
  try {
    // Obtener todos los documentos de la colección 'usuarios'
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    // Encontrar el documento con el ID del usuario actual
    const userDoc = querySnapshot.docs.find(doc => doc.id === user.value.id);
    // console.log("asdfsadf", userDoc.data)

    if (userDoc) {
      // Actualizar el documento del usuario
      await updateDoc(doc(db, 'usuarios', user.value.id), {
        email: user.value.email,
        name: user.value.name,
        username: user.value.username,
        password: user.value.password,
      });

      alert('Usuario actualizado con éxito');
      userStore.clearSelectedUser();
      router.push({ name: 'dataTable' });
    } else {
      console.error('No se encontró el documento del usuario para actualizar');
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};
</script> -->


<!-- <template>
  <div>
    <h1>Editar Usuario</h1>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="email">Correo:</label>
        <input type="email" v-model="user.email" class="form-control" id="email" required>
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" v-model="user.name" class="form-control" id="name" required>
      </div>
      <div class="form-group">
        <label for="username">Nombre de Usuario:</label>
        <input type="text" v-model="user.username" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="user.password" class="form-control" id="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useUserStore } from '../store/userStore';

const router = useRouter();
const userStore = useUserStore();
const user = ref({});

onMounted(() => {
  if (userStore.selectedUser) {
    user.value = { ...userStore.selectedUser };
    console.log("Usuario seleccionado:", user.value);
  } else {
    console.error("No se ha seleccionado un usuario");
    router.push({ name: 'dataTable' });
  }
});

const updateUser = async () => {
  try {
    console.log("Actualizando usuario con ID:", user.value.id);

    // Obtener todos los documentos de la colección 'usuarios'
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    console.log("Documentos obtenidos:", querySnapshot.docs);

    // Encontrar el documento con el ID del usuario actual
    const userDoc = querySnapshot.docs.find(doc => doc.id === user.value.id);
    console.log("Documento del usuario encontrado:", userDoc);

    if (userDoc) {
      // Actualizar el documento del usuario
      await updateDoc(doc(db, 'usuarios', user.value.id), {
        email: user.value.email,
        name: user.value.name,
        username: user.value.username,
        password: user.value.password,
      });

      alert('Usuario actualizado con éxito');
      userStore.clearSelectedUser();
      router.push({ name: 'dataTable' });
    } else {
      console.error('No se encontró el documento del usuario para actualizar');
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};
</script> -->

<!-- 
<template>
  <div>
    <h1>Editar Usuario</h1>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="email">Correo:</label>
        <input type="email" v-model="user.email" class="form-control" id="email" required>
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" v-model="user.name" class="form-control" id="name" required>
      </div>
      <div class="form-group">
        <label for="username">Nombre de Usuario:</label>
        <input type="text" v-model="user.username" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="user.password" class="form-control" id="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useUserStore } from '../store/userStore';

const router = useRouter();
const userStore = useUserStore();
const user = ref({});

onMounted(() => {
  if (userStore.selectedUser) {
    user.value = { ...userStore.selectedUser };
    console.log("Usuario seleccionado:", user.value);
  } else {
    console.error("No se ha seleccionado un usuario");
    router.push({ name: 'dataTable' });
  }
});

const updateUser = async () => {
  try {
    console.log("Actualizando usuario con ID:", user.value.id);

    // Obtener todos los documentos de la colección 'usuarios'
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    console.log("Documentos obtenidos:", querySnapshot.docs.map(doc => doc.id));
    const dataId = querySnapshot.docs.map(doc => doc.id);
    // Encontrar el documento con el ID del usuario actual
    const userDoc = querySnapshot.docs.find(doc => doc.id == user.value.id);
    console.log("Documento del usuario encontrado:", userDoc);

    if (userDoc) {
      // Actualizar el documento del usuario
      await updateDoc(doc(db, 'usuarios', doc.id), {
        email: user.value.email,
        name: user.value.name,
        username: user.value.username,
        password: user.value.password,
      });

      alert('Usuario actualizado con éxito');
      userStore.clearSelectedUser();
      router.push({ name: 'dataTable' });
    } else {
      console.error('No se encontró el documento del usuario para actualizar');
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};
</script> -->


<template>
  <div>
    <h1>Editar Usuario</h1>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="email">Correo:</label>
        <input type="email" v-model="user.email" class="form-control" id="email" required>
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" v-model="user.name" class="form-control" id="name" required>
      </div>
      <div class="form-group">
        <label for="username">Nombre de Usuario:</label>
        <input type="text" v-model="user.username" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="user.password" class="form-control" id="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useUserStore } from '../store/userStore';

const router = useRouter();
const userStore = useUserStore();
const user = ref({});

onMounted(() => {
  if (userStore.selectedUser) {
    user.value = { ...userStore.selectedUser };
    console.log("Usuario seleccionado:", user.value);
  } else {
    console.error("No se ha seleccionado un usuario");
    router.push({ name: 'dataTable' });
  }
});

const updateUser = async () => {
  try {
    console.log("Actualizando usuario con ID interno:", user.value.id);

    // Obtener todos los documentos de la colección 'usuarios'
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    console.log("Documentos obtenidos:", querySnapshot.docs.map(doc => doc.id));

    // Encontrar el documento que contiene el ID interno del usuario
    const userDoc = querySnapshot.docs.find(doc => doc.data().id === user.value.id);
    console.log("Documento del usuario encontrado:", userDoc);

    if (userDoc) {
      // Actualizar el documento del usuario
      await updateDoc(doc(db, 'usuarios', userDoc.id), {
        email: user.value.email,
        name: user.value.name,
        username: user.value.username,
        password: user.value.password,
      });

      // alert('Usuario actualizado con éxito');
      userStore.clearSelectedUser();
      router.push({ name: 'users' });
    } else {
      console.error('No se encontró el documento del usuario para actualizar');
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};
</script>
