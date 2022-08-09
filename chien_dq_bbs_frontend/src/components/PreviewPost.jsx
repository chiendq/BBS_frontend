import {Link} from "react-router-dom";
import {Export} from "./Export";
import React from "react";

export const PreviewPost = ({post}) => {
  return (
      <div className="post-preview" key={post.id}>
          <img src={`http://localhost:9000/thumbnails/${post.thumbnail}.png`} alt={post.title}/>
          <div className="posts-container">
              <Link to={`/posts/${post.id}`} className={"post-title "}>{post.title}</Link>
              <div className="post-info">
                  <div className="col3">Author: {post.authorName}</div>
                  <div className="col3">Created on: {post.createdAt} </div>
                  <div className="col3">Updated on: {post.updatedOn} </div>
              </div>
              <p className="post-preContent">{post.content.substring(0, 200)}...</p>
              <div className={"learn-csv"}>
                  <div className={"csv"}>
                      <Export post={post}/>
                  </div>
                  <div className={"learn-more"}>
                      <Link to={`/posts/${post.id}`} className={"post-learnMore"}>Learn more</Link>
                  </div>
              </div>
          </div>
      </div>
  )
}