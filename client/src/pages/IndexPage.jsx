import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogCard from "../components/BlogCard";

import Axios from "axios";

const IndexPage = () => {
  let [blogs, setBlogs] = useState([]);
  let [totalBlogs, setTotalBlogs] = useState(2);
  let [loading, setLoading] = useState(true);
  let [hashmore, setHashmore] = useState(true);
  let [skip, setSkip] = useState(0);

  let limit = 4;

  async function fetchData() {
    setLoading(true);
    if (skip > totalBlogs) {
      setLoading(false);
      setHashmore(false);
      return;
    }
    let url = import.meta.env.VITE_API_URL;
    let { data } = await Axios.get(`${url}/blogs?skip=${skip}&limit=${limit}`, {
      withCredentials: true,
    });
    let { message, count } = data;
    setTotalBlogs(count);
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
    setBlogs((previousBlogs) => [...previousBlogs, ...response]);
    setLoading(false);
    setSkip(skip + limit);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="blog_container">
      <InfiniteScroll
        dataLength={totalBlogs}
        next={fetchData}
        hasMore={hashmore}
      >
        {blogs.map((blog, index) => {
          return (
            <BlogCard
              key={blog.blogId + index}
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
      </InfiniteScroll>

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
            </ul>
          </main>
        </>
      )}
    </section>
  );
};

export default IndexPage;
