import React, { useState, useEffect, useContext } from "react";
import ReactQuill, { Quill } from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import UserLoggedin from "../context/UserLoggedin";
import Axios from "axios";
import Toast from "../context/Toast";

// toast message context

// code for code block

function insertCodeBlock() {
  const range = this.quill.getSelection();
  this.quill.insertText(range.index, "\n``` \n\n```");
  this.quill.setSelection(range.index + 5, 0);
}

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "code-block"],
      ["clean"],
    ],
    handlers: {
      "code-block": insertCodeBlock,
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

const EditBlog = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [summery, SetSummery] = useState("");
  const [subject, SetSubject] = useState("");
  const [files, setFiles] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [description, setDescription] = useState("");
  const { isUserLoggedin, set_isUserLoggedin } = UserLoggedin();
  const url = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const { toastMessage, set_toast } = Toast();

  useEffect(() => {
    if (isUserLoggedin.value === false) {
      navigate("/");
    }
    fetchData();
  }, []);

  //functionf for fetching blog present data from db
  async function fetchData() {
    let response = await Axios.get(`${url}/blog/${id}`);

    let token = await localStorage.getItem("token");

    let user = await Axios.get(`${url}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        token: token,
      },
    });

    if (response.data.author._id !== user.data.id) {
      setToastMessage({ type: "error", message: "Access denied" });
      return navigate("/");
    }

    setTitle(response.data.title);
    SetSummery(response.data.summary);
    SetSubject(response.data.subject);
    setDescription(response.data.description);
    setCurrentImage(response.data.coverImage);
    setLoading(false);
  }

  // functionf or submiting changes in blog
  async function handleEditForm(e) {
    e.preventDefault();
    setLoading(true);

    let data = new FormData();
    data.set("_id", id);
    data.set("title", title);
    data.set("summary", summery);
    data.set("subject", subject);
    data.set("file", files[0]);
    data.set("description", description);
    data.set("currentImageUrl", currentImage);

    let token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };

    let url = import.meta.env.VITE_API_URL;

    try {
      let response = await Axios.put(`${url}/edit`, data, { headers });
      setLoading(false);
      set_toast("success", "Blog Successfully Edited.");
      navigate(`/blog/${id}`);
    } catch (error) {
      setLoading(false);
      set_toast("success", error?.response?.data?.message);
    }
  }

  return (
    <>
      {loading ? (
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
                <div className="o-media__figure"></div>
                <div className="o-media__body">
                  <div className="o-vertical-spacing">
                    <span
                      className="skeleton-box"
                      style={{ width: "100%", height: "40vh" }}
                    ></span>
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
                      <span
                        className="skeleton-box"
                        style={{ width: "100%", height: "40vh" }}
                      ></span>
                    </p>
                    <div className="blog-post__meta">
                      <span
                        className="skeleton-box"
                        style={{ width: "70px" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "100%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "90%" }}
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
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </main>
        </>
      ) : (
        <>
          <form className="create_post" onSubmit={handleEditForm}>
            <h1 className="form_heading">Update Blog</h1>
            <label htmlFor="title" className="editForm_label">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="title"
              spellCheck={true}
              required
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              readOnly={loading ? true : false}
            />

            <label htmlFor="summery" className="editForm_label">
              Summery
            </label>
            <input
              type="summery"
              name="summery"
              placeholder="summery"
              spellCheck={true}
              value={summery}
              required
              id="summery"
              onChange={(e) => {
                SetSummery(e.target.value);
              }}
              readOnly={loading ? true : false}
            />

            <label htmlFor="subject" className="editForm_label">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="subject like IT,Traveling"
              spellCheck={true}
              value={subject}
              required
              id="subject"
              onChange={(e) => {
                SetSubject(e.target.value);
              }}
              readOnly={loading ? true : false}
            />
            <div className="curret_image">
              <div className="image">
                <img src={currentImage} alt="" />
              </div>
              <span>Current Image</span>
            </div>

            <div className="file_input">
              <label htmlFor="files">
                Choose new image If you want to update current image!
              </label>
              <input
                type="file"
                name="blog_image"
                accept="image/*"
                id="files"
                placeholder="enter your blog content here"
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
                readOnly={loading ? true : false}
              />
            </div>

            <ReactQuill
              theme="snow"
              // modules={modules}
              modules={modules}
              // formats={formats}
              value={description}
              onChange={setDescription}
              required={true}
              isRequired={true}
            ></ReactQuill>

            {loading ? (
              <>
                <button
                  className="submit_post"
                  disabled={true}
                  style={{ cursor: "no-drop" }}
                >
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </button>
              </>
            ) : (
              <>
                <button className="submit_post">Submit</button>
              </>
            )}
          </form>
        </>
      )}
    </>
  );
};

export default EditBlog;
