import React, {useState} from "react";
import {Header} from "./components/header/Header";
import moment from "moment";


const dateFormat = "YYYY-MM-DD";
const date = new Date("2020-06-24 22:57:36");

const dateTime = moment(date).format(dateFormat);

function App() {

    const [data, setData] = useState({
        data: [],
        total_page: 0,
        count: 0,
        page: 0,
        page_size: 0
    })

    React.useEffect(() => {
        fetch('http://localhost:9000/posts', {method: "GET"})
            .then(result => result.json())
            .then(data => {
                setData({...data, data: data.data})
            })
    }, [])

    return (
        <div className="App">
            <Header/>
            {data.data.map((post) => (
                <div className="post-preview" key={post.id}>
                    <img src={`http://localhost:9000/thumbnails/${post.thumbnail}`} alt={post.title}/>
                    <div className="post-preview-container">
                        <a href="#" className="post-title">
                            {post.title}
                        </a>
                        <div className="post-infor">
                            <p>Author: {post.authorName}</p>
                            <p>Created on: {post.createdAt} </p>
                            <p>Updated on: {post.updatedOn} </p>
                        </div>
                        <p className="post-preContent">{post.content.substring(0,150)}...</p>
                        <div>
                            <a href="#" className="post-learnMore">
                                LEARN MORE
                            </a>
                        </div>
                    </div>
                </div>
            ))};
        </div>
    );
}

export default App;
