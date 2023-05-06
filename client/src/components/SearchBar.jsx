import React, { useContext, useLayoutEffect, useState } from "react";
import serarchIcons from "../assets/search_dark.svg";
import SearchSuggestion from "./SearchSuggestion";
import axios from "axios";

// searchbarContext
import searchBarContext from "../context/SearchBarContext";

const SearchBar = () => {
  const { openSearchBar, setOpenSearchBar } = useContext(searchBarContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState([]);

  // function for searching blogs
  async function handleSearchBlog(e) {
    await setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      searchBlog(e.target.value);
    } else {
      setSearchQuery("");
      setResponse([]);
    }
  }

  //   function for searching blogs from DB
  async function searchBlog(query) {
    const url = import.meta.env.VITE_API_URL;
    let response = await axios.get(`${url}/search/${query}`);
    setResponse(response.data);
  }

  return (
    <div
      className={`search_bar ${openSearchBar ? "searchbar_open" : ""}`}
      onClick={() => {
        setOpenSearchBar(!openSearchBar);
        setSearchQuery("");
        setResponse([]);
      }}
    >
      <div
        className="search_wrapper"
        onClick={() => {
          setOpenSearchBar(!openSearchBar);
          setSearchQuery("");
          setResponse([]);
        }}
      >
        <div
          className="search_box"
          onClick={() => {
            setOpenSearchBar(true);
          }}
        >
          <img src={serarchIcons} alt="" />
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchBlog}
            placeholder="Find something..."
            onClick={(e) => {
              e.stopPropagation();
              setOpenSearchBar(true);
            }}
          />
        </div>
        <div className="suggestion_wrapper">
          {response.map((data) => {
            return (
              <>
                <SearchSuggestion
                  key={data._id}
                  title={data.title}
                  id={data._id}
                  subject={data.subject}
                ></SearchSuggestion>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;