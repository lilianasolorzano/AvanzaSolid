<template>
    <h1>formulario Agregar usuario</h1>
  <div class="mb-3 row">
    <label  class="col-sm-2 col-form-label">Id</label>
    <div class="col-sm-10">
      <input v-model="user.id" type="text" class="form-control"  placeholder="id">
    </div>
  </div>
  <div class="mb-3 row">
    <label for="staticName" class="col-sm-2 col-form-label">name</label>
    <div class="col-sm-10"> 
      <input v-model="user.name"  type="text"  class="form-control" id="staticName" placeholder="name">
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">username</label>
    <div class="col-sm-10"> 
      <input v-model="user.username" type="text"  class="form-control" id="staticUsername" placeholder="username" >
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10"> 
      <input v-model="user.email" type="text"  class="form-control" id="staticEmail" placeholder="email" >
    </div>
  </div>

  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input v-model="user.password" type="password" class="form-control" id="password">
    </div>
  </div>

<BtnGlobal btn_global="Guardar" @click="saveDataFire" class="btn btn-primary"/>

</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import BtnGlobal from './BtnGlobal.vue';
import db from '@/firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import axios from 'axios';
import { ref } from 'vue';

// const saveData =()=> {
//    router.push({name:'users'})
// }
const data = ref(null)
// const users = ref(null)

// datos del usuario 
const user = ref({
  id: '',
  name:'',
  username:'',
  email:'',
  password:''
})

const saveDataFire = async () => {
  try {

    if(!user.value.name || !user.value.username || !user.value.email || !user.value.password){
      throw new error ('los datos de la API no son un objeto valido')
    }
      // guardar datos de la api 
      const saveDoc = await addDoc(collection(db,'usuarios'),{
        id: user.value.id,
        name: user.value.name,
        username: user.value.username,
        email: user.value.email,
        password: user.value.password

      })
    
      console.log('datos guardados:', saveDoc.id);
  
    router.push({name:'users'})


  } catch (error) {
    console.error('error al momento de guardar los datos:', error)
  }
};
</script>