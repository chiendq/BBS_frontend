import React, {useEffect, useState} from "react";
import {Header} from "./components/header/Header";
import thumbnail1 from "./images/blog-image1.webp";
import thumbnail2 from "./images/blog-image2.webp";
import thumbnail3 from "./images/blog-image3.webp";
import moment from "moment";


const dateFormat = "YYYY-MM-DD";
const date = new Date("2020-06-24 22:57:36");

const dateTime = moment(date).format(dateFormat);
const initPosts = [
    {
        id: 1,
        title: "This vault of SNES manuals is an amazing resource for fans of gaming history",
        previewContent: "Every English-language Super Nintendo game manual is accounted for",
        content: "This is a supper long contentttttttttttttttttttttttttttt",
        authorName: "Chris Welch",
        createdOn: dateTime,
        updatedOn: dateTime,
        thumbnail: thumbnail1,
    },
    {
        id: 2,
        title: "Amazon expands Prime Video’s Watch Party feature to Roku, smart TVs, and more",
        previewContent: "Every English-language Super Nintendo game manual is accounted for",
        content: "This is a supper long contentttttttttttttttttttttttttttt",
        authorName: "Chris Welch",
        createdOn: dateTime,
        updatedOn: dateTime,
        thumbnail: thumbnail2,
    },
    {
        id: 3,
        title: "Amazon is using electric cargo bikes that look like mini-trucks to make deliveries in the UK",
        previewContent: "Every English-language Super Nintendo game manual is accounted for",
        content: "This is a supper long contentttttttttttttttttttttttttttt",
        authorName: "Chris Welch",
        createdOn: dateTime,
        updatedOn: dateTime,
        thumbnail: thumbnail3,
    },
]

function App() {

    return (
        <div className="App">
            <Header/>
            {/*<Post post={initPosts[0]}/>*/}
        </div>
    );
}

export default App;
