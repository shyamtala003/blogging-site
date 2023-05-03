import React, { useState, useEffect, useRef } from "react";
import dateFormat, { masks } from "dateformat";

import axios from "axios";
import { useParams } from "react-router-dom";

const BlogView = () => {
  let { id } = useParams();
  const blog = useRef(null);
  let url = import.meta.env.VITE_API_URL;
  let [post, setPost] = useState(false);
  let [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [resume, setResume] = useState(false);

  async function fetchData() {
    let response = await axios.get(`${url}/blog/${id}`);
    setPost(response.data); // Extract the "data" property from the response object
    setLoading(false);
  }

  let message;
  const handleButtonClick = () => {
    message = new SpeechSynthesisUtterance(blog.current.textContent);
    setIsSpeaking(true);
    setResume(true);
    window.speechSynthesis.speak(message);
    console.log("play");
  };

  const handleStopClick = () => {
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
    console.log("stop");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!loading && (
        <div className="full_blog_view" ref={blog}>
          {/* Render the title property of the post object */}
          {isSpeaking ? (
            <button className="audio_btn" onClick={handleStopClick}>
              <img src="https://img.icons8.com/nolan/64/pause.png" />
            </button>
          ) : (
            <button className="audio_btn" onClick={handleButtonClick}>
              <img src="https://img.icons8.com/nolan/64/play.png" />
            </button>
          )}

          <h1 className="blog_title">{post.title}</h1>
          <p className="blog_date">
            {dateFormat(post.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
          </p>
          <p className="blog_author">@{post.author.userName}</p>
          <img src={post.coverImage} alt="" className="blog_image" />
          <div
            className="blog_description"
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></div>
          {/* Render the description property of the post object */}
          {/* Render other properties as needed */}
        </div>
      )}
      {loading && (
        <>
          <main className="loading_container">
            <ul className="o-vertical-spacing o-vertical-spacing--l">
              <li
                className="blog-post o-media"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <div className="o-media__figure">
                  <span
                    className="skeleton-box"
                    style={{ width: "100%", height: "60vh" }}
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
    </>
  );
};

export default BlogView;
