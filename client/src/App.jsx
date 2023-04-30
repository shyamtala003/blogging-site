import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./layout/Layout";
import IndexPage from "./pages/IndexPage";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

// toast message context
import toastMessageContext from "./context/ToastContext";
import { useEffect, useState } from "react";

function App() {
  const [toastMessage, setToastMessage] = useState({});

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
      <toastMessageContext.Provider value={{ setToastMessage }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout></Layout>}>
              <Route index element={<IndexPage></IndexPage>}></Route>
              <Route path="login" element={<Login></Login>}></Route>
              <Route path="register" element={<Register></Register>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </toastMessageContext.Provider>
    </>
  );
}

export default App;
