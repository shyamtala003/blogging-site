import { create } from "zustand";

const toastMessage = create((set) => ({
  toastMessage: {},
  set_toast: (type, message) =>
    set((state) => ({
      toastMessage: (state.toastMessage = { type: type, message: message }),
    })),
}));

export default toastMessage;
