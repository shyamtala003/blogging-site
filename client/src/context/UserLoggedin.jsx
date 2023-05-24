import { create } from "zustand";

const UserLoggedin = create((set) => ({
  isUserLoggedin: { value: false },
  set_isUserLoggedin: (data) =>
    set((state) => ({
      isUserLoggedin: (state.isUserLoggedin = data),
    })),
}));

export default UserLoggedin;
