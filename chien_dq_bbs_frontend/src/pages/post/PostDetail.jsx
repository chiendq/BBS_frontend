import './PostDetail.css'
import {useParams} from "react-router-dom";
import React, { useState} from "react";
import {Export} from "../../components/Export";
import {Navbar} from "../../components/navbar/Navbar";

export const PostDetail = () => {

    const [post, setPost] = useState({})
    const postId = useParams().id

    React.useEffect(() => {
        fetch(`http://localhost:9000/posts/${postId}`, {method: "GET"})
            .then(result => result.json())
            .then(data => {
                setPost(data)
                console.log(data);
            })
    }, [])

    const headers = [
        { label: "Title", key: "title" },
        { label: "Author name", key: "authorName" },
        { label: "Content", key: "content" },
        { label: "Created at", key: "createdAt" },
        { label: "Updated on", key: "updatedOn" }
    ];

    const csvReport = {
        data: [post],
        headers: headers,
        filename: 'Post_Report.csv'
    };


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
                    </div>
                    <div className={"btn-Export"}>
                        {/*<CSVLink {...csvReport}>Export to CSV</CSVLink>*/}
                        <Export post={post}/>
                    </div>
                    <div className={"post-content"}>{post.content}</div>
                </div>
            </div>
        </>
    )
}