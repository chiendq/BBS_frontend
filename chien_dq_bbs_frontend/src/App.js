import React, {useState} from "react";
import ReactPaginate from "react-paginate";
import {Navbar} from "./components/navbar/Navbar";
import {ScrollButton} from "./components/scrollButton/ScrollButton";
import axios from "axios";
import {PreviewPost} from "./components/PreviewPost";


function App() {
    const pageSize = 10

    const [loading, setLoading] = useState(true)

    const [paged, setPaged] = useState({
        data: [],
        total_page: 0,
        count: 0,
        page: 1,
        page_size: 0
    })

    React.useEffect(() => {
        axios.get(`/posts`,
            { params: {
                    "pageSize" : pageSize,
                    "pageNumber" : paged.page}
                    })
            .then(res => {
                setLoading(false);
                setPaged(res.data);
            })
    }, [paged.page]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1
        setLoading(true)

        setPaged({
            ...paged,
            page: selectedPage,})
    };

    return (
            <div className="App">
                <Navbar/>
                <ScrollButton/>
                <div className={"body"}>
                    {paged.data.map((post) => (<PreviewPost post={post}/>))}
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
            </div>
    );
}

export default App;
