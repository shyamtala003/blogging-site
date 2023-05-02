import React from "react";

const BlogCard = ({
  title,
  summary,
  description,
  subject,
  coverImage,
  author,
}) => {
  return (
    <div className="blog">
      <div className="blog_image">
        <img src={coverImage} alt="" />
      </div>
      <div className="blog_content">
        <span className="blog_type">{subject}</span>
        <h1 className="blog_heading">{title}</h1>
        <h3 className="blog_description">{summary}</h3>
        <div className="author_and_publish">
          <p className="author">{author.userName}</p>
          <span className="time">20 June,2023</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
