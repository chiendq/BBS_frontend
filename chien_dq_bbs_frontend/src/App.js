import React, {useState} from "react";
import {Header} from "./components/header/Header";
import moment from "moment";
import ReactPaginate from "react-paginate";

const dateFormat = "YYYY-MM-DD";
const date = new Date("2020-06-24 22:57:36");

const dateTime = moment(date).format(dateFormat);

const pageSize = 2

function App() {

    const [paged, setPaged] = useState({
        data: [],
        total_page: 0,
        count: 0,
        page: 1,
        page_size: 0
    })

    React.useEffect(() => {
        fetch(`http://localhost:9000/posts?pageSize=${pageSize}&pageNumber=${paged.page}`, {method: "GET"})
            .then(result => result.json())
            .then(data => {
                setPaged(data)
            })
    }, [paged.page])

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1

        setPaged({
            ...paged,
            page: selectedPage,
        })

        console.log(paged.page)

    };

    return (
        <div className="App">
            <Header/>
            {paged.data.map((post) => (
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
            ))}
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={paged.total_page}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}/>
        </div>
    );
}

export default App;
