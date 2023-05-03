import React, { useState, useEffect, useContext, useRef } from "react";
import dateFormat, { masks } from "dateformat";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import editIcon from "../assets/edit.svg";
import shareIcon from "../assets/share.svg";

import userLoggedinContext from "../context/UserLoggedin";

const BlogView = () => {
  const { id } = useParams();
  const blog = useRef(null);
  const url = import.meta.env.VITE_API_URL;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { userLoggedIn, setUserLoggedIn } = useContext(userLoggedinContext);

  async function fetchData() {
    let response = await axios.get(`${url}/blog/${id}`);
    setPost(response.data); // Extract the "data" property from the response object
    setLoading(false);
  }

  const handleButtonClick = () => {
    let message = new SpeechSynthesisUtterance(blog.current.textContent);
    setIsSpeaking(true);
    window.speechSynthesis.speak(message);
  };

  const handleStopClick = () => {
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
  };

  // function for sharing blog with anyone
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* code for displaying fetched blog data  */}
      {!loading && (
        <div className="full_blog_view" ref={blog}>
          {/* code for blog text to audio controller */}
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
          <p className="blog_author">by @{post.author.userName}</p>
          {post.author._id && userLoggedIn.userId && (
            <>
              <Link to={`/edit/${id}`} className="edit_Post">
                <img src={editIcon} alt="" /> <span>Edit</span>
              </Link>
            </>
          )}
          <button onClick={handleShare} className="share_btn">
            <img src={shareIcon} alt="" />
          </button>
          <img src={post.coverImage} alt="" className="blog_image" />
          <div
            className="blog_description"
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></div>
        </div>
      )}

      {/* code for skeleton loading effect when data fetching  */}
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
