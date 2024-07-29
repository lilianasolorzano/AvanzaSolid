<!-- <template>
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

<BtnGlobal btn_global="Guardar cambio" @click="onEdit" class="btn btn-primary"/>
    
  </div>


</template> -->
<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-container grid-list-md>
          <v-card>
            <v-card-text>
              <h1>Edit User</h1>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-text-field id="nome" v-model="editUser.user_id" label="ID"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field id="email" v-model="editUser.user_name" label="Nome"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field id="nome" v-model="editUser.user_email" label="E-mail"> </v-text-field>
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
              <v-btn color="green" @click="onEdit">
                <v-icon color="white">save</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import BtnGlobal from './BtnGlobal.vue';
// import router from '@/router/router';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter()
const route = useRoute()
const showEditModal = ref(false)
// const userEdit = ref({ id: '', name: '', username: '', email: '', password: '' });
const userEdit = ref({ user_id: '', user_name: '', user_email: '' })

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
// const saveUser = async () => {
//   try {
//     await updateDoc(doc(db, 'usuarios', userEdit.value.id), {
//       name: userEdit.value.name,
//       username: userEdit.value.username,
//       email: userEdit.value.email,
//       password: userEdit.value.password,
//     });
//     console.log('Usuario actualizado');
//     router.push({ name: 'users' });
//   } catch (error) {
//     console.error('Error al actualizar el usuario:', error);
//   }
// };

const onEdit = async (user) => {
  userEdit.value = { ...user }
  showEditModal.value = true
}
const updateUser = async () => {
  if (userEdit.value) {
    const usersCollection = collection(db, 'usuarios')
    const q = query(usersCollection, where('id', '==', userEdit.value.id))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (docSnapshot) => {
      await updateDoc(docSnapshot.ref, {
        user_id: userEdit.value.user_id,
        user_name: userEdit.value.user_name,
        user_username: userEdit.value.user_name,
        user_email: userEdit.value.user_email
      })
    })
    showEditModal.value = false
    refresh() // Refrescar la lista de usuarios después de la edición
  }
}

// Llamada a fetchUser cuando el componente se monta
onMounted(() => {
  fetchUser();
});
</script>