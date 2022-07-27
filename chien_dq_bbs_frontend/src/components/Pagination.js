import React, {useState} from 'react'


export const Pagination = ({dataPerPage, totaldata, paginate}) => {
    const [currentPage, setCurrentPage] = useState(0)
    const pageNumbers = []

    const int = Math.ceil(totaldata / dataPerPage)
    if (int === 1) return null

    for (let i = 1; i <= int; i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.includes(currentPage - 1) && (
                    <a onClick={() => {
                            setCurrentPage(currentPage - 1)
                            paginate(currentPage - 1)
                    }}
                        href="#"
                        className="page-link">
                        Prev
                    </a>
                )}
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a
                            onClick={() => {
                                setCurrentPage(number)
                                paginate(number)
                            }}
                            href="#"
                            className="page-link"
                        >
                            {number}
                        </a>
                    </li>
                ))}

                {pageNumbers.includes(currentPage + 1) && (
                    <a onClick={() => {
                            setCurrentPage(currentPage + 1)
                        paginate(currentPage + 1)}}
                        className="page-link"
                        href="#">
                        Next
                    </a>
                )}
            </ul>
        </nav>
    )
}