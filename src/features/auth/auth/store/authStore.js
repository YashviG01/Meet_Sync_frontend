import { create } from "zustand";
//global state managemnet
//all the feature-navbar,dashboard,profile,meetinf room require user info
//prop drilling would be tough
const useAuthStore = create((set) => ({
  user: null,

  setUser: (user) =>
    set({
      user,
    }),

  logout: () =>
    set({
      user: null,
    }),
}));

export default useAuthStore;