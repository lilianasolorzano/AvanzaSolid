<template>
<h1>Editar usuario</h1>
<div class="mb-3 row">
    <label  class="col-sm-2 col-form-label">Id</label>
    <div class="col-sm-10">
      <input v-model="userEdit.id" type="text" class="form-control"  placeholder="id" >
    </div>
  </div>
  <div class="mb-3 row">
    <label for="staticName" class="col-sm-2 col-form-label">name</label>
    <div class="col-sm-10"> 
      <input v-model="userEdit.name"  type="text"  class="form-control" id="staticName" placeholder="name"  >
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">username</label>
    <div class="col-sm-10"> 
      <input v-model="userEdit.username" type="text"  class="form-control" id="staticUsername" placeholder="username" >
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10"> 
      <input v-model="userEdit.email"  type="text"  class="form-control" id="staticEmail" placeholder="email" >
    </div>
  </div>

  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input v-model="userEdit.password"  type="password" class="form-control" id="password">
    </div>

<BtnGlobal btn_global="Guardar cambio" @click="saveUser" class="btn btn-primary"/>
    
  </div>


</template>
<script setup>
import { ref, onMounted } from 'vue';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from '@/firebase/firebaseConfig';
import BtnGlobal from './BtnGlobal.vue';
// import router from '@/router/router';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter()
const route = useRoute()

const userEdit = ref({ id: '', name: '', username: '', email: '', password: '' });

const fetchUser = async () => {
  const userId = route.params.id;
  if (!userId) {
    console.error('No se encontró el ID del usuario en la ruta');
    return;
  }
  const userDoc = await getDoc(doc(db, 'usuarios', id));
  if (userDoc.exists()) {
    user.value = { id: userDoc.id, ...userDoc.data() };
  } else {
    console.error('No se encontró el usuario');
  }
};



// Función para guardar los cambios del usuario
const saveUser = async () => {
  try {
    await updateDoc(doc(db, 'usuarios', userEdit.value.id), {
      name: userEdit.value.name,
      username: userEdit.value.username,
      email: userEdit.value.email,
      password: userEdit.value.password,
    });
    console.log('Usuario actualizado');
    router.push({ name: 'users' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};

// Llamada a fetchUser cuando el componente se monta
onMounted(() => {
  fetchUser();
});
</script>