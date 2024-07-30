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

  },
});
