import React, {useState} from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import {Export} from "./components/Export";
import {Navbar} from "./components/navbar/Navbar";
import {ScrollButton} from "./components/scrollButton/ScrollButton";
import ReactLoading from 'react-loading';

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
        fetch(`http://localhost:9000/posts?pageSize=${pageSize}&pageNumber=${paged.page}`,
            {method: "GET"}
            )
            .then(result => result.json())
            .then(data => {
                setLoading(false)
                setPaged(data)
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
                <div className={"posts-container"}>
                    {paged.data.map((post) => (
                        <div className="post-preview" key={post.id}>
                            <img src={`http://localhost:9000/thumbnails/${post.thumbnail}.png`} alt={post.title}/>
                            <div className="post-preview-container">
                                <Link to={`/posts/${post.id}`} className={"post-title "}>{post.title}</Link>
                                <div className="post-infor">
                                    <p>Author: {post.authorName}</p>
                                    <p>Created on: {post.createdAt} </p>
                                    <p>Updated on: {post.updatedOn} </p>
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
                {loading &&
                <div style={{position: "fixed", display: "flex", alignItems: "center",justifyContent:"center", width: "100%", zIndex: 9999999, top: 0}}>
                    <Loading type={"balls"} color={"blue"}/>
                </div>
                }
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
