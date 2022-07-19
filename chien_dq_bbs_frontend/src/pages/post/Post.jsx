import './post.css'

export const Post = ({post}) => {
    return (
        <>
            <div>
                <div className={"post-container"}>
                    <div className="post-title">
                        <a href="#">{post.title}</a>
                    </div>
                    <div className="post-info">
                        <p className={"post-author"}>Author: {post.authorName}</p>
                        <p className={"post-created-on"}>Created on: {post.createdOn} </p>
                        <p className={"post-updated-on"}>Updated on: {post.updatedOn} </p>
                    </div>
                    <div className={"post-content"}>{post.content}</div>
                </div>
            </div>
        </>
    )
}