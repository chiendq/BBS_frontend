import React, {useState} from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import {Export} from "./components/Export";
import {Navbar} from "./components/navbar/Navbar";
import {ScrollButton} from "./components/scrollButton/ScrollButton";

const dateFormat = "YYYY-MM-DD";
const date = new Date("2020-06-24 22:57:36");

const dateTime = moment(date).format(dateFormat);

const pageSize = 10

function App() {

    const [paged, setPaged] = useState({
        data: [],
        total_page: 0,
        count: 0,
        page: 1,
        page_size: 0
    })

    React.useEffect(() => {
        fetch(`http://localhost:9000/posts?pageSize=${pageSize}&pageNumber=${paged.page}`,
            {method: "GET"}
            )
            .then(result => result.json())
            .then(data => {
                setPaged(data)
            })
    }, [paged.page])

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1

        setPaged({
            ...paged,
            page: selectedPage,})
    };

    return (<>
            <div className="App">
                <Navbar/>
                <ScrollButton/>
                {paged.data.map((post) => (
                    <div className="post-preview" key={post.id}>
                        <img src={`http://localhost:9000/thumbnails/${post.thumbnail}`} alt={post.title}/>
                        <div className="post-preview-container">
                            <Link to={`/posts/${post.id}`} className={"post-title "}>{post.title}</Link>
                            <div className="post-infor">
                                <p>Author: {post.authorName}</p>
                                <p>Created on: {post.createdAt} </p>
                                <p>Updated on: {post.updatedOn} </p>
                            </div>
                            <p className="post-preContent">{post.content.substring(0, 200)}...</p>
                            <div>
                                <Link to={`/posts/${post.id}`} className={"post-learnMore"}>Learn more</Link>
                                <Export post={post}/>
                            </div>
                        </div>
                    </div>
                ))}
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    pageCount={paged.total_page}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        </>
    );
}

export default App;
