import React, { useState, useEffect, useContext, useRef } from "react";
import dateFormat, { masks } from "dateformat";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

import userLoggedinContext from "../context/UserLoggedin";
// toast message context
import toastMessageContext from "../context/ToastContext";
import ShareBlogLinks from "../components/ShareBlogLinks";

const BlogView = () => {
  const { id } = useParams();
  const blog = useRef(null);
  const url = import.meta.env.VITE_API_URL;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { userLoggedIn, setUserLoggedIn } = useContext(userLoggedinContext);
  let { toastMessage, setToastMessage } = useContext(toastMessageContext);
  let navigate = useNavigate();

  async function fetchData() {
    let response = await axios.get(`${url}/blog/${id}`);
    setPost(response.data); // Extract the "data" property from the response object
    setLoading(false);
  }

  // code for delete blog
  async function deletePost(id) {
    console.log(id);
    try {
      let response = await axios.delete(`${url}/delete/${id}`);
      setToastMessage({ type: "success", message: response.data.message });
      navigate(`/`);
    } catch (error) {
      setToastMessage({
        type: "error",
        message: error?.response?.data?.message,
      });
    }
  }

  // code for play audio
  const handleButtonClick = () => {
    let message = new SpeechSynthesisUtterance(blog.current.textContent);
    setIsSpeaking(true);
    window.speechSynthesis.speak(message);
  };

  // code for stop audio
  const handleStopClick = () => {
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
  };

  // function for sharing blog with anyone
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          url: window.location.href,
        })
        .then(() => {})
        .catch((error) => console.log("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [id]);

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

          {/* code for share blog buttons */}
          <ShareBlogLinks
            url={window.location.href}
            title={post.title}
            imageUrl={post.coverImage}
          ></ShareBlogLinks>

          <h1 className="blog_title">{post.title}</h1>
          <p className="blog_date">
            {dateFormat(post.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
          </p>
          <p className="blog_author">
            by @{post.author.userName}{" "}
            <img src={post.author.profilePicture.url} alt="" />
          </p>
          {post.author._id && userLoggedIn.userId && (
            <div className="button_group">
              <Link to={`/edit/${id}`} className="post_btn">
                <img src={editIcon} alt="" /> <span>Edit</span>
              </Link>
              <button
                onClick={() => {
                  deletePost(post._id);
                }}
                className="post_btn"
              >
                <img src={deleteIcon} alt="" /> <span>Delete</span>
              </button>
            </div>
          )}

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
