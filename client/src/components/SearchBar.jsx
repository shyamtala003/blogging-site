import React, { Fragment, useEffect, useRef, useState } from "react";
import serarchIcons from "../assets/search_dark.svg";
import SearchSuggestion from "./SearchSuggestion";
import axios from "axios";
import searchBarContext from "../context/SearchBar";

const SearchBar = () => {
  const { openSearchBar, set_openSearchBar } = searchBarContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState([]);
  const [searching, setSearching] = useState(false);

  let inputSearch = useRef(null);

  // code for open and close searchbar using shortcuts
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "k") {
        // Show the search bar
        e.preventDefault();
        set_openSearchBar(true);
        setSearchQuery("");
        inputSearch.current.focus();
      }

      if (e.key === "Escape") {
        e.preventDefault();
        set_openSearchBar(false);
        inputSearch.current.blur();
      }
    });
  }, []);

  useEffect(() => {
    let handler = setTimeout(() => {
      searchBlog();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // function for searching blogs
  function handleSearchBlog(e) {
    setSearchQuery(e.target.value);
    if (!e.target.value.length > 0) {
      setSearchQuery("");
      setResponse([]);
    }
  }

  //   function for searching blogs from DB
  async function searchBlog() {
    let query = searchQuery;
    setSearching(true);
    const url = import.meta.env.VITE_API_URL;
    let response = await axios.get(`${url}/search/${query}`);
    setResponse(response.data);
    setSearching(false);
  }

  return (
    <div
      className={`search_bar ${openSearchBar ? "searchbar_open" : ""}`}
      onClick={() => {
        set_openSearchBar(!openSearchBar);
        setSearchQuery("");
        setResponse([]);
      }}
    >
      <div
        className="search_wrapper"
        onClick={() => {
          set_openSearchBar(!openSearchBar);
          setSearchQuery("");
          setResponse([]);
        }}
      >
        <div
          className="search_box"
          onClick={() => {
            set_openSearchBar(true);
          }}
        >
          <img src={serarchIcons} alt="" />
          <input
            ref={inputSearch}
            type="search"
            value={searchQuery}
            onChange={handleSearchBlog}
            placeholder="Find something..."
            onClick={(e) => {
              e.stopPropagation();
              set_openSearchBar(true);
            }}
          />

          {/* code for searching loader */}
          {searching && (
            <>
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </>
          )}
        </div>
        <div className="suggestion_wrapper">
          {response.length > 0 &&
            response.map((data) => {
              return (
                <SearchSuggestion
                  key={data._id}
                  title={data.title}
                  id={data._id}
                  subject={data.subject}
                ></SearchSuggestion>
              );
            })}
          {response.length === 0 && (
            <>
              <p className="no_result">No Result Found</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
