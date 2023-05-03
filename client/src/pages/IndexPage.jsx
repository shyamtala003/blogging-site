import React, { useEffect, useState, useContext } from "react";
import BlogCard from "../components/BlogCard";

import Axios from "axios";

const IndexPage = () => {
  let [blogs, setBlogs] = useState([]);
  let [loading, setLoading] = useState("true");

  useEffect(() => {
    try {
      (async () => {
        let url = import.meta.env.VITE_API_URL;
        let { data } = await Axios.get(`${url}/post`, {
          withCredentials: true,
        });
        let { message } = data;
        const response = Object.values(message).map((value) => {
          return {
            blogId: value._id,
            author: value.author,
            title: value.title,
            subject: value.subject,
            summary: value.summary,
            coverImage: value.coverImage,
            createdAt: value.createdAt,
          };
        });
        setBlogs(response);
        setLoading(false);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className="blog_container">
      {loading === false &&
        blogs.length >= 0 &&
        blogs.map((blog) => {
          return (
            <BlogCard
              key={blog.blogId}
              id={blog.blogId}
              title={blog.title}
              summary={blog.summary}
              subject={blog.subject}
              coverImage={blog.coverImage}
              author={blog.author}
              createdAt={blog.createdAt}
            ></BlogCard>
          );
        })}

      {/* set skeleton effect when page is loading */}
      {loading && (
        <>
          <main className="loading_container">
            <ul className="o-vertical-spacing o-vertical-spacing--l">
              <li className="blog-post o-media">
                <div className="o-media__figure">
                  <span
                    className="skeleton-box"
                    style={{ width: "90%", height: "40vh" }}
                  ></span>
                </div>
                <div className="o-media__body">
                  <div className="o-vertical-spacing">
                    <h3 className="blog-post__headline">
                      <span
                        className="skeleton-box"
                        style={{ width: "55%" }}
                      ></span>
                    </h3>
                    <p>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "90%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "83%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                    </p>
                    <div className="blog-post__meta">
                      <span
                        className="skeleton-box"
                        style={{ width: "70px" }}
                      ></span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="blog-post o-media">
                <div className="o-media__figure">
                  <span
                    className="skeleton-box"
                    style={{ width: "100%", height: "40vh" }}
                  ></span>
                </div>
                <div className="o-media__body">
                  <div className="o-vertical-spacing">
                    <h3 className="blog-post__headline">
                      <span
                        className="skeleton-box"
                        style={{ width: "55%" }}
                      ></span>
                    </h3>
                    <p>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "90%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "83%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                    </p>
                    <div className="blog-post__meta">
                      <span
                        className="skeleton-box"
                        style={{ width: "70px" }}
                      ></span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="blog-post o-media">
                <div className="o-media__figure">
                  <span
                    className="skeleton-box"
                    style={{ width: "100%", height: "40vh" }}
                  ></span>
                </div>
                <div className="o-media__body">
                  <div className="o-vertical-spacing">
                    <h3 className="blog-post__headline">
                      <span
                        className="skeleton-box"
                        style={{ width: "55%" }}
                      ></span>
                    </h3>
                    <p>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "90%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "83%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                    </p>
                    <div className="blog-post__meta">
                      <span
                        className="skeleton-box"
                        style={{ width: "70px" }}
                      ></span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </main>
        </>
      )}
    </section>
  );
};

export default IndexPage;
