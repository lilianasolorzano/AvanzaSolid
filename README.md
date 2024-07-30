# Nombre del  proyecto
Avanza Solid
# Descripcion 
Este proyecto se enfoca en el registro, eliminacion y edicion de usuario, el usuario podra iniciar sesion, ver los usuarios registrados, asi como su manipulacion. Todo con la ayuda de firebase, para el almacenamiento de datos.

# Configuracion 

### Firebase, Vue, Javascript
 Asegurarse de tener instalado Nodejs, para la inicialización del proyecto en vue con vite.
 ```powershell 
 # instalacion de vue con vite
 npm create vite@latest "nombre del proyecto"
 √ Select a framework: » Vue

Scaffolding project in C:\path
 
Done. Now run:
 
  cd "nombre del proyecto"

# instalar las dependencias
  npm install 

# inicializar el servidor
  npm run dev 
 ```

### Instalacion de Firebase y su configuracion
```powershell
# instalacion de firebase
npm install firebase

```
```javascript
# configuracion creacion un archivo firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyAXru_gaJhKryEpfXnUkM6V0yzKa0GuxLE",
  authDomain: "prueba-817f8.firebaseapp.com",
  projectId: "prueba-817f8",
  storageBucket: "prueba-817f8.appspot.com",
  messagingSenderId: "42587712920",
  appId: "1:42587712920:web:d9c640f62658c42bbe8fed",

};
```

# Estructura del proyecto
```
└── 📁src
    └── App.vue
    └── 📁assets
        └── base.css
        └── logo.svg
        └── main.css
    └── 📁axios
        └── axios.js
    └── 📁components
        └── addUsers.vue
        └── BtnGlobal.vue
        └── configFire.js
        └── 📁icons
            └── 13e0485bb8e745b87b5cc84338c553b9.jpg
            └── 6b0eeaa790f173bb907e446c46153c2b.jpg
            └── ba77a2648407004454000c65f561a411.jpg
            └── d1f0b8f919ced3799afd41ebc4a4bb5d.jpg
            └── d83a8989cc5a955358a8bf95aa12ba34.jpg
        └── login.vue
        └── update.vue
        └── users.vue
    └── 📁firebase
        └── firebaseConfig.js
    └── main.js
    └── 📁plugins
        └── vuetify.js
        └── webfontloader.js
    └── 📁router
        └── router.js
    └── 📁store
        └── userStore.js
```
# Componentes
`App.vue`: En este archivo se hizo la conexion con la base de datos de firebase, al igual que se hizo el consumo de la API.


` addUsers.vue`: Este es un componente en donde se agregan los nuevos usuarios, haciendo uso de `addDoc`, herramienta de firestore que facilita el agregar datos.
```javascript
import { addDoc, collection, getFirestore } from 'firebase/firestore';
const saveDataFire = async () => {
  try {

    if (!user.value.name || !user.value.username || !user.value.email || !user.value.password) {
      throw new error('los datos de la API no son un objeto valido')
    }
    console.log('Colección:', collection(db, 'usuarios'));
    // guardar datos de la api 
    const saveDoc = await addDoc(collection(db, 'usuarios'), {
      id: user.value.id,
      name: user.value.name,
      username: user.value.username,
      email: user.value.email,
      password: user.value.password

    })
  }}
```

`BtnGlobal.vue`: Boton global reutilizable, se puede importar en diferentes componentes.


`icons`: Carpeta donde se guardan todos lo iconos que se van a usar dentro del proyecto, en este caso tambien se uso para guardar imagenes. 
`login.vue`: Donde se realiza el inicio de sesion, en ella se configuro que la contraseña pertenezca al usuario con el cual se quiere ingresar. 
```javascript
const login = async () => {
  try {
    const userQuery = query(
      collection(db, 'usuarios'),
      where('email', '==', email.value),
      where('password', '==', password.value)
    );

    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      console.log('Usuario autenticado:', user);
      VueCookies.set('userAuthenticated', true, '1h'); 
      router.push({ name: 'users' });
    } else {
      error.value = 'Correo o contraseña incorrectos';
    }
  } catch (err) {
    error.value = 'Error al iniciar sesión: ' + err.message;
  }
};
```

`update.vue`: Editar el usuario seleccionado por medio de su id. Llevando esos datos actualizados por medio de `updateDoc` herremienta de firebase, pero tambien se hace el uso de pinia, para almacenar los datos y poder extraer el id de una manera mas eficiente.

```javascript
const updateUser = async () => {
  try {
    console.log("Actualizando usuario con ID interno:", user.value.id);

    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    console.log("Documentos obtenidos:", querySnapshot.docs.map(doc => doc.id));

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
```

`users.vue`: Componente en donde se muestran los datos en una tabla, en donde se puede seleccionar un usuario para su eliminacion o su edicion. Cuenta con un filtro para la busqueda de informacion, colocar los datos de manera ascendente o descendente. 


`firebaseConfig.js`: Configuracion de firebase, para poder hacer la conexion con la base de datos. 
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAXru_gaJhKryEpfXnUkM6V0yzKa0GuxLE",
  authDomain: "prueba-817f8.firebaseapp.com",
  projectId: "prueba-817f8",
  storageBucket: "prueba-817f8.appspot.com",
  messagingSenderId: "42587712920",
  appId: "1:42587712920:web:d9c640f62658c42bbe8fed",

};
```

`main.js`: Componente  ayuda a la importacion de las herramientas a utilizar dentro del proyecto.

`router.js`: Es un componente que nos ayuda a navegar de un componente a otro. Aqui se utilizo el `auth` de firebase, que ayuda a authentificar al usuario
```javascript
import { createRouter, createWebHistory } from "vue-router";
import login from "../components/login.vue";



const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },{
    path: "/users",
    name: "users",
    component: () => import("../components/users.vue"),
    meta: { requiresAuth: true},
  },]
```

`userStore.js`: Es el store de pinia, que sirve para almacenar datos de firebase, para que sea mejor el manero de los datos y poder ser llamado de manera directa, por medio de acciones y se llama en los componentes donde se ejecutara la accion. Vea el siguiente ejemplo:
```javascript
export const useUserStore = defineStore("userStore", {
  state: () => ({
    selectedUser: null,
  }),
  actions: {
    setSelectedUser(user) {
      this.selectedUser = user;
    }}})
  
`Componente donde se llama la accion`
onMounted(() => {
  if (userStore.selectedUser) {
    user.value = { ...userStore.selectedUser };
    console.log("Usuario seleccionado:", user.value);
  } else {
    console.error("No se ha seleccionado un usuario");
    router.push({ name: 'dataTable' });
  }
});
```

