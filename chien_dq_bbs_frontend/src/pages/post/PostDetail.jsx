import './PostDetail.css'
import {useParams} from "react-router-dom";
import React, { useState} from "react";
import {Export} from "../../components/Export";
import {Navbar} from "../../components/navbar/Navbar";
import axios from "axios";

export const PostDetail = () => {

    const [post, setPost] = useState({})
    const postId = useParams().id

    const handlePostDetail = async () => {
    await axios.get(`http://localhost:9000/posts/${postId}`)
        .then(res => {
            setPost(res.data)
        })
    }

    React.useEffect(() => {
       handlePostDetail()
    }, [])

    return (
        <>
            <div>
                <Navbar/>
                <div className={"post-container"}>
                    <div className="post-title">
                        <a href="#">{post.title}</a>
                    </div>
                    <div className="post-info">
                        <p className={"post-author"}>Author: {post.authorName}</p>
                        <p className={"post-created-at"}>Created at: {post.createdAt} </p>
                        <p className={"post-updated-on"}>Updated on: {post.updatedOn} </p>
                        <div className={"btn-export"}>
                            <Export post={post}/>
                        </div>
                    </div>
                    <div className={"post-content"}>{post.content}</div>
                </div>
            </div>
        </>
    )
}