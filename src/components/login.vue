<template>
  <div>
    <h1>Inicio de Sesión</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Correo:</label>
        <input type="email" v-model="email" class="form-control" id="email" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" class="form-control" id="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
    </form>
    <p v-if="error">{{ error }}</p>
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
      // Usuario encontrado
      const user = querySnapshot.docs[0].data();
      console.log('Usuario autenticado:', user);

      // Guardar el estado de autenticación en una cookie
      VueCookies.set('userAuthenticated', true, '1h'); // La cookie expira en 1 hora

      // Redirigir a la página de datos
      router.push({ name: 'users' });
    } else {
      // Usuario no encontrado
      error.value = 'Correo o contraseña incorrectos';
    }
  } catch (err) {
    error.value = 'Error al iniciar sesión: ' + err.message;
  }
};
</script>

<style scoped></style>
