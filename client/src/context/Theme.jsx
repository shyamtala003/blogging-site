import { create } from "zustand";

const Theme = create((set) => ({
  theme: localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : (localStorage.setItem("theme", "dark"), localStorage.getItem("theme")),
  toggle_theme: () =>
    set((state) => ({
      theme:
        state.theme === "dark"
          ? (localStorage.setItem("theme", "light"), "light")
          : (localStorage.setItem("theme", "dark"), "dark"),
    })),
}));

export default Theme;
