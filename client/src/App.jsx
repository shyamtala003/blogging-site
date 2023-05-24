import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Layout from "./layout/Layout";
import IndexPage from "./pages/IndexPage";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import BlogView from "./pages/BlogView";
import EditBlog from "./pages/EditBlog";
import Toast from "./context/Toast";
import Theme from "./context/Theme";

function App() {
  const { toastMessage, set_toast } = Toast();
  const { theme } = Theme();
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
        theme: theme,
      });
    }
    if (toastMessage?.type === "success") {
      toast.success(toastMessage.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
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

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route index element={<IndexPage></IndexPage>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="create" element={<CreatePost></CreatePost>}></Route>
            <Route path="blog/:id" element={<BlogView></BlogView>}></Route>
            <Route path="edit/:id" element={<EditBlog></EditBlog>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
