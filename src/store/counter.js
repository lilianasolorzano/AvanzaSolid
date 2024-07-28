  // import { ref, computed } from 'vue'
  import { defineStore } from 'pinia'

  export const useDataStore = defineStore({
    id: 'datos',
    state:()=>({
      dataUsers:[{
        id: '', 
        name: '', 
        username: '', 
        email: '', 
      }]
    }),
    actions: {
      // async fetchUsers() {
      //   try {
      //     const querySnapshot = await getDocs(collection(db, 'usuarios'));
      //     this.dataUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      //   } catch (error) {
      //     console.error('Error al obtener los usuarios:', error);
      //   }
      // },
              // almacenar dato del JSON 
      userJson(id, name, username,  email) {
      this.dataUsers.push({
      id,
      name,
      username,
      email,
                })
      },
    }
    // const count = ref(0)
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //   count.value++
    // }

    // return { count, doubleCount, increment }
  })
