import React from "react";
import dateFormat, { masks } from "dateformat";
import { Link } from "react-router-dom";

const BlogCard = ({
  id,
  title,
  summary,
  subject,
  coverImage,
  author,
  createdAt,
}) => {
  return (
    <Link to={`/blog/${id}`} className="blog_link">
      <div className="blog">
        <div className="blog_image">
          <img src={coverImage} alt="" />
        </div>
        <div className="blog_content">
          <span className="blog_type">{subject}</span>
          <h1 className="blog_heading">
            {String(title).length > 120
              ? String(title).slice(0, 120).concat("...")
              : title}
          </h1>
          <h2 className="blog_description">
            {String(summary).length > 300
              ? String(summary).slice(0, 300).concat("...")
              : summary}
          </h2>
          <div className="author_and_publish">
            <p className="author">{author.userName}</p>
            <span className="time">
              {dateFormat(createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
