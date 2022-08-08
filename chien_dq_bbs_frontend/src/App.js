import React, {useState} from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import {Export} from "./components/Export";
import {Navbar} from "./components/navbar/Navbar";
import {ScrollButton} from "./components/scrollButton/ScrollButton";
import ReactLoading from 'react-loading';
import axios from "axios";

const dateFormat = "YYYY-MM-DD";
const date = new Date("2020-06-24 22:57:36");

const dateTime = moment(date).format(dateFormat);

const pageSize = 10

function App() {
    const Loading = ({ type, color }) => (
        <ReactLoading type={type} color={color} height={667} width={375} />
    );

    const [loading, setLoading] = useState(true)

    const [paged, setPaged] = useState({
        data: [],
        total_page: 0,
        count: 0,
        page: 1,
        page_size: 0
    })

    React.useEffect(() => {
        axios.get(`/posts?pageSize=${pageSize}&pageNumber=${paged.page}`)
            .then(res => {
                setLoading(false)
                setPaged(res.data)
            })
    }, [paged.page])

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1
        setLoading(true)

        setPaged({
            ...paged,
            page: selectedPage,})
    };

    return (<>
            <div className="App">
                <Navbar/>
                <ScrollButton/>
                <div className={"body"}>
                    {paged.data.map((post) => (
                        <div className="post-preview" key={post.id}>
                            <img src={`http://localhost:9000/thumbnails/${post.thumbnail}.png`} alt={post.title}/>
                            <div className="posts-container">
                                <Link to={`/posts/${post.id}`} className={"post-title "}>{post.title}</Link>
                                <div className="post-info">
                                    <div>Author: {post.authorName}</div>
                                    <div>Created on: {post.createdAt} </div>
                                    <div>Updated on: {post.updatedOn} </div>
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
                    ))}
                </div>
                {loading && <div className={"loading"}><Loading type={"watch"} color={"blue"}/></div>}
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
