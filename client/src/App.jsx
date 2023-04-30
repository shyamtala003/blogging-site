import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import IndexPage from "./pages/IndexPage";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<IndexPage></IndexPage>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="register" element={<Register></Register>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
