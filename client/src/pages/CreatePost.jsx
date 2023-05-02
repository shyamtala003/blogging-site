import React, { useState, useEffect, useContext } from "react";
import ReactQuill, { Quill } from "react-quill";
const CodeBlock = Quill.import("formats/code-block");
import "react-quill/dist/quill.snow.css";

import userLoggedinContext from "../context/UserLoggedin";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// toast message context
import toastMessageContext from "../context/ToastContext";

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

Quill.register(CodeBlock, true);
// code for code block

const CreatePost = () => {
  let navigate = useNavigate();

  // toastmessage context provider
  let { setToastMessage } = useContext(toastMessageContext);

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [summery, SetSummery] = useState("");
  const [subject, SetSubject] = useState("");
  const [files, setFiles] = useState("");
  const [description, setDescription] = useState("");

  let { userLoggedIn } = useContext(userLoggedinContext);
  useEffect(() => {
    if (userLoggedIn.value === false) {
      navigate("/");
    }
  }, []);

  async function handlePostForm(e) {
    e.preventDefault();
    setLoading(true);

    let data = new FormData();
    data.set("title", title);
    data.set("summary", summery);
    data.set("subject", subject);
    data.set("file", files[0]);
    data.set("description", description);

    let token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };

    let url = import.meta.env.VITE_API_URL;

    try {
      let response = await Axios.post(`${url}/post`, data, { headers });
      document.querySelector(".create_post").reset();
      setLoading(false);
      setDescription("");
      setToastMessage({
        type: "success",
        message: "New Blog Post  Added",
      });
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setToastMessage({
        type: "error",
        message: error?.response?.data?.message,
      });
    }
  }

  return (
    <>
      <form className="create_post" onSubmit={handlePostForm}>
        <input
          type="text"
          name="title"
          placeholder="title"
          spellCheck={true}
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          readOnly={loading ? true : false}
        />
        <input
          type="summery"
          name="summery"
          placeholder="summery"
          spellCheck={true}
          value={summery}
          required
          onChange={(e) => {
            SetSummery(e.target.value);
          }}
          readOnly={loading ? true : false}
        />
        <input
          type="text"
          name="subject"
          placeholder="subject like IT,Traveling"
          spellCheck={true}
          value={subject}
          required
          onChange={(e) => {
            SetSubject(e.target.value);
          }}
          readOnly={loading ? true : false}
        />
        <input
          type="file"
          name="blog_image"
          required
          accept="image/*"
          placeholder="enter your blog content here"
          onChange={(e) => {
            setFiles(e.target.files);
          }}
          readOnly={loading ? true : false}
        />
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
            <button className="submit_post">Post</button>
          </>
        )}
      </form>
    </>
  );
};

export default CreatePost;
