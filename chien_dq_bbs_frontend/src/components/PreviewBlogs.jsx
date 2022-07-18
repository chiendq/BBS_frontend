import { useState } from "react";
import moment from "moment";
import thumbnail1 from "../images/blog-image1.webp";
import thumbnail2 from "../images/blog-image2.webp";
import thumbnail3 from "../images/blog-image3.webp";

export const PreviewBlogs = () => {
  const dateFormat = "YYYY-MM-DD";
  const date = new Date("2020-06-24 22:57:36");

  const dateTime = moment(date).format(dateFormat);

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title:
        "This vault of SNES manuals is an amazing resource for fans of gaming history",
      previewContent:
        "Every English-language Super Nintendo game manual is accounted for",
      authorName: "Chris Welch",
      createdOn: dateTime,
      updatedOn: dateTime,
      thumbnail: thumbnail1,
    },
    {
      id: 2,
      title:
        "Amazon expands Prime Video’s Watch Party feature to Roku, smart TVs, and more",
      previewContent:
        "Every English-language Super Nintendo game manual is accounted for",
      authorName: "Chris Welch",
      createdOn: dateTime,
      updatedOn: dateTime,
      thumbnail: thumbnail2,
    },
    {
      id: 3,
      title:
        "Amazon is using electric cargo bikes that look like mini-trucks to make deliveries in the UK",
      previewContent:
        "Every English-language Super Nintendo game manual is accounted for",
      authorName: "Chris Welch",
      createdOn: dateTime,
      updatedOn: dateTime,
      thumbnail: thumbnail3,
    },
  ]);

  const listBlogs = blogs.map((blog) => (
    <div className="blog-preview" key={blog.id}>
      <img src={blog.thumbnail} alt={blog.title} />
      <div className="blog-preview-container">
        <a href="#" className="blog-title">
          {blog.title}
        </a>
        <div className="blog-infor">
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

  return <div className="preview-blogs">{listBlogs}</div>;
};
