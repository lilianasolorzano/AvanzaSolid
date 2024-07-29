// import { defineStore } from "pinia";

// export const useUserStore = defineStore("userStore", {
//   state: () => ({
//     users: [],
//     selectedUser: null,
//   }),
//   actions: {
//     setUsers(users) {
//       this.users = users;
//     },
//     setSelectedUser(user) {
//       this.selectedUser = user;
//     },
//   },
// });

import { defineStore } from "pinia";
// import db from '../firebase/firebaseConfig';
// import {deleteDoc, doc } from 'firebase/firestore';

export const useUserStore = defineStore("userStore", {
  state: () => ({
    selectedUser: null,
  }),
  actions: {
    setSelectedUser(user) {
      this.selectedUser = user;
    },
    clearSelectedUser() {
      this.selectedUser = null;
    }, 
    deleteUser(id) {
      this.selectedUser = id;
    },
    // prueba para eliminar usuario 
  //  async deleteUser(id){
  //     try {
  //        await deleteDoc(doc(db, 'usuarios', id));
  //       this.selectedUser = this.selectedUser.filter(user => user.id !== id);
  //     } catch (error) {
  //       console.error('Error al eliminar el usuario:', error);
  //     }
  //   }
  },
});
