import { useState } from "react";


export const PreviewPosts = (initPosts) => {


  const [posts, setPosts] = useState(initPosts);

  const listPosts = posts.map((blog) => (
    <div className="blog-preview" key={blog.id}>
      <img src={blog.thumbnail} alt={blog.title} />
      <div className="blog-preview-container">
        <a href="#" className="blog-title">
          {blog.title}
        </a>
        <div className="blog-info">
          <p>Author: {blog.authorName}</p>
          <p>Created on: {blog.createdOn} </p>
          <p>Updated on: {blog.updatedOn} </p>
        </div>
        <p className="blog-preContent">{blog.previewContent}</p>
        <div>
          <a href="#" className="blog-learnMore">
            LEARN MORE
          </a>
        </div>
      </div>
    </div>
  ));

  return <div className="preview-posts">{listPosts}</div>;
};
