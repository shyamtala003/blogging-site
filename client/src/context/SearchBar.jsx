import { create } from "zustand";

const SearchBar = create((set) => ({
  openSearchBar: false,
  set_openSearchBar: (value) =>
    set((state) => ({
      openSearchBar: (state.openSearchBar = value),
    })),
}));

export default SearchBar;
