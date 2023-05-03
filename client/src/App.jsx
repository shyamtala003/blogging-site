import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./layout/Layout";
import IndexPage from "./pages/IndexPage";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";

// toast message context
import toastMessageContext from "./context/ToastContext";
// userloggedin context
import userLoggedInContext from "./context/UserLoggedin";
// theme context
import ThemeContest from "./context/ThemeContest";

import { useEffect, useState } from "react";
import BlogView from "./pages/BlogView";
import EditBlog from "./pages/EditBlog";

function App() {
  const [toastMessage, setToastMessage] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState({ value: false });
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (toastMessage.type === "error") {
      toast.error(toastMessage.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (toastMessage.type === "success") {
      toast.success(toastMessage.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [toastMessage]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <userLoggedInContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
        <toastMessageContext.Provider value={{ setToastMessage }}>
          <ThemeContest.Provider value={{ theme, setTheme }}>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Layout></Layout>}>
                  <Route index element={<IndexPage></IndexPage>}></Route>
                  <Route path="login" element={<Login></Login>}></Route>
                  <Route
                    path="register"
                    element={<Register></Register>}
                  ></Route>
                  <Route
                    path="create"
                    element={<CreatePost></CreatePost>}
                  ></Route>
                  <Route
                    path="blog/:id"
                    element={<BlogView></BlogView>}
                  ></Route>
                  <Route
                    path="edit/:id"
                    element={<EditBlog></EditBlog>}
                  ></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeContest.Provider>
        </toastMessageContext.Provider>
      </userLoggedInContext.Provider>
    </>
  );
}

export default App;
