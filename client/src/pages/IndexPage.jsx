import React from "react";
import BlogCard from "../components/BlogCard";
const IndexPage = () => {
  return (
    <section className="blog_container">
      <BlogCard></BlogCard>
      <BlogCard></BlogCard>
    </section>
  );
};

export default IndexPage;
