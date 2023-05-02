import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Axios from "axios";

const IndexPage = () => {
  let [blogs, setBlogs] = useState([]);
  useEffect(() => {
    try {
      (async () => {
        let url = import.meta.env.VITE_API_URL;
        let { data } = await Axios.get(`${url}/post`);
        let { message } = data;
        const response = Object.values(message).map((value) => {
          return {
            blogId: value._id,
            author: value.author,
            title: value.title,
            description: value.description,
            subject: value.subject,
            summary: value.summary,
            coverImage: value.coverImage,
          };
        });
        setBlogs(response);
        console.log(response);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className="blog_container">
      {blogs.length >= 0 &&
        blogs.map((blog) => {
          return (
            <BlogCard
              key={blog.blogId}
              title={blog.title}
              summary={blog.summary}
              description={blog.description}
              subject={blog.subject}
              coverImage={blog.coverImage}
              author={blog.author}
            ></BlogCard>
          );
        })}
    </section>
  );
};

export default IndexPage;
