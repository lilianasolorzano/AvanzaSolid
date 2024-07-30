<template>
  <div class="body">
    <div class="header">
      <button type="submit" class="btn-cancel" @click="cancel">Cancelar</button> 
      <h1>Editar Usuario</h1>
    </div>
 
    <form @submit.prevent="updateUser" class="formAdd">

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
      <button type="submit" class="btn">Actualizar</button>
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

    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    console.log("Documentos obtenidos:", querySnapshot.docs.map(doc => doc.id));

    // Encontrar el documento que contiene el ID interno del usuario
    const userDoc = querySnapshot.docs.find(doc => doc.data().id === user.value.id);
    console.log("Documento del usuario encontrado:", userDoc);

    if (userDoc) {
      await updateDoc(doc(db, 'usuarios', userDoc.id), {
        email: user.value.email,
        name: user.value.name,
        username: user.value.username,
        password: user.value.password,
      });
      
      userStore.clearSelectedUser();
      router.push({ name: 'users' });
    } else {
      console.error('No se encontró el documento del usuario para actualizar');
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};

// const cancel = () => {
//   router.push({ name: 'users' });
// };
const cancel = () => {
  router.back()
}

</script>

<style scoped>
.body{
  background-color: #20c3a8;
  min-height: 100vh;
  /* background-image: url(./icons/6b0eeaa790f173bb907e446c46153c2b.jpg); */

}
form {
    border: 3px solid  white;
    margin: 30px;
    border-radius: 15px;
    height: auto;
    width: 600px;
    background-color: hsla(0, 0%, 2%, 0.2);
    align-content: center;
    align-items: center;
}

div {
    /* margin: 20px; */
    align-content: center;
    /* align-items: ; */
}

h1 {
    font-family: cursive;
    padding: 20px;
    font-style: italic;
    color:black;
    text-align: left;
    letter-spacing: 1px;
}

button {
    margin-left: 40px;
}
.btn{
color: #20c3a8;
background: white;
border-radius: 10px;
border: #20c3a8 solid 1px;
align-content: center;
align-items: center;
margin-top: 10px;
margin-left: 40%;
margin-bottom: 20px;
}
.formAdd{
  padding: 10px;
  align-items: center;
  align-content: center;
  margin: 50px;
}
.header {
  display: flex;
}
.btn-cancel{
/* padding: 5px; */
background-color: white;
width: 70px;
height: 40px;
border-radius: 10px;
margin-top: 30px;
color: #20c3a8;
}
.form-group{
  margin: 20px;
}


</style>
