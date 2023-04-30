import "./App.css";
import BlogCard from "./components/BlogCard";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <main className="dark">
      <Navbar></Navbar>
      <section className="blog_container">
        <BlogCard></BlogCard>
        <BlogCard></BlogCard>
      </section>
    </main>
  );
}

export default App;
