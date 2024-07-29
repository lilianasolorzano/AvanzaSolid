<template>
  <div class="login">
    <h1>Avanza Solid</h1>
    <form @submit.prevent="login">
  <div class="mb-3">
    <label for="email" class="form-label" >Email address</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp"  v-model="email">
    <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" v-model="password">
  </div>
  <!-- <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div> -->
  <button type="submit" class="btn btn-primary" >Login</button>
  <!-- <button type="submit" class="btn btn-primary" :disabled="loading">Submit</button> -->
  <!-- <p v-if="error" class="error">{{ error }}</p> -->
  <p v-if="errorMessage">{{ errorMessage }}</p>
</form>
    <!-- <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useRouter } from 'vue-router';


const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);
const router = useRouter();

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    // Redirigir o mostrar mensaje de éxito
    console.log('Login exitoso');
  } catch (error) {
    // Manejo de errores
    errorMessage.value = error.message;
  }
};

// const login = async () => {
//   // loading.value = true;
//   // error.value = '';
//   try {
//     await signInWithEmailAndPassword(auth, email.value, password.value);
//     // Redirigir o manejar la navegación después del login
//   router.push({ name: 'home' });

//     console.log('Login successful');
//   } catch (error) {
//     // error.value = err.message;
//     errorMessage.value = `Error: ${error.message}`;
//   } finally {
//     loading.value = false;
//   }
// };
</script>

<style scoped>
</style>
