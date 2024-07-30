<template>
  <div class="background-container">
<div class="formComplet">

  <div class="container">
    <div class="image-section">
      <!-- <div  class="containerB"> -->
        <h3>Bienvienido</h3>
        <!-- <h4>Avanza Solid</h4> -->

      <!-- </div> -->
    </div>
    <div class="form-section">
      <div class="content">
        <div class="form-container">
          <form @submit.prevent="login" class="form">
            <h2>Inicio de Sesión</h2>
            <div class="form-group">
              <label for="email">Correo:</label>
            <v-icon icon="mdi-account" color="#fff" size="30" class="icon" />

              <input type="email" v-model="email" class="form-control" id="email" required>
            </div>
            <div class="form-group">
            <v-icon icon="mdi-lock" color="#fff" size="30" />

              <label for="password">Contraseña:</label>
              <input type="password" v-model="password" class="form-control" id="password" required>
            </div>
        <button type="submit" class="btn">Iniciar Sesión</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</div>
</div>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import VueCookies from 'vue-cookies';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const login = async () => {
  try {
    const userQuery = query(
      collection(db, 'usuarios'),
      where('email', '==', email.value),
      where('password', '==', password.value)
    );

    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      // poder encontrar el usuario
      const user = querySnapshot.docs[0].data();
      console.log('Usuario autenticado:', user);

      // Guardar el estado de autenticación en una cookie
      VueCookies.set('userAuthenticated', true, '1h'); // 1h indicacion de que expira en 1 hora

      router.push({ name: 'users' });
    } else {
      error.value = 'Correo o contraseña incorrectos';
    }
  } catch (err) {
    error.value = 'Error al iniciar sesión: ' + err.message;
  }
};
</script>

<style scoped>
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      font-family: Arial, sans-serif;
    }

    .container {
      display: flex;
      width: 80%;
      height: 80vh;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      background-color: white;
      /* padding-top: 70px; */
    }
    .background-container {
      position: relative;
      min-height: 100vh;
      width: 100%;
      height: 100%;
      background: url('./icons/d83a8989cc5a955358a8bf95aa12ba34.jpg') no-repeat center center;
      background-size: cover; 
    }

    .content {
      padding-top:70px ;

      /* border: solid 2px black; */
      border-radius: 20px;
      /* background-color: white; */
      /* position: relative; */
      z-index: 1; /* Asegura que el contenido esté delante de la imagen */
      color: black; 
      padding: 70px;
      align-items: center;
    }
.forms {
    background-color: #20c3a8;
    animation: brillo 2s ease-in-out infinite alternate;
    color: #ffffff;
    /* align-content: center; */
    border: 3px solid #ccc;
    border-radius: 10px;
    width: 500px;
    height: auto;
    margin: 100px;
    /* padding: 70px; */
    /* flex: 1; */
}
.image-section {
      flex: 1;
      background: url('./icons/d1f0b8f919ced3799afd41ebc4a4bb5d.jpg') no-repeat center center;
      background-size: cover;
      display: flex;
      justify-content: center; 
      align-items: flex-end; 
    }
.image-section h3{
      color: black;
      margin: 20px 0; 
      font-size: 2rem;
}
.form-section {
  background-color: #20c3a8;
  width: 100px;
      flex: 1;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border: 3px solid #ccc;
      width: 50%;


    }
.form-section ,form-container {
      width: 80%;
      border: #ffffff solid 20px;
     border-radius: 50px solid;
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
    margin: 0; 

    }
 h2 {
      margin-bottom: 20px;
      text-align: center;
      margin-bottom:30px ;
    }
.formComplet{
      padding-top: 70px;
    }
.btn{
color: #20c3a8;
background: white;
border-radius: 10px;
border: #20c3a8 solid 3px;
align-content: center;
align-items: center;
margin-top: 30px;
margin-left: 50px;
}

</style>
