import {CSVLink} from "react-csv";
import React from "react";

export const Export = ({post}) => {

    const headers = [
        { label: "Title",       key: "title" },
        { label: "Author name", key: "authorName" },
        { label: "Content",     key: "content" },
        { label: "Created at",  key: "createdAt" },
        { label: "Updated on",  key: "updatedOn" }
    ];

    const csvReport = {
        data:       [post],
        headers:    headers,
        filename:   'Post_Report.csv'
    };

  return(
      <>
          <div className={"export"}>
              <CSVLink {...csvReport}>Export</CSVLink>
          </div>
      </>
  )
}