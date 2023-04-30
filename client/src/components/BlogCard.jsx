import React from "react";

const BlogCard = () => {
  return (
    <div className="blog">
      <div className="blog_image">
        <img
          src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
          alt=""
        />
      </div>
      <div className="blog_content">
        <span className="blog_type">Travel</span>
        <h1 className="blog_heading">
          Top destinations you should travel Lorem ipsum dolor sit amet. Lorem
          ipsum dolor sit, amet consectetur
        </h1>
        <h3 className="blog_description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          hic corporis adipisci ea mollitia! Neque ducimus sapiente ad quos
          accusamus blanditiis veniam optio cumque quaerat! Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Nisi earum
        </h3>
        <div className="author_and_publish">
          <p className="author">Shyam Tala</p>
          <span className="time">20 June,2023</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
