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
  },
});
