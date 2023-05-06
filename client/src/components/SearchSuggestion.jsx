import React from "react";
import { Link } from "react-router-dom";

const SearchSuggestion = ({ id, title, subject }) => {
  return (
    <>
      <Link to={`blog/${id}`} className="links">
        <p className="title">{title}</p>
        <p className="subject">{subject}</p>
      </Link>
    </>
  );
};

export default SearchSuggestion;
