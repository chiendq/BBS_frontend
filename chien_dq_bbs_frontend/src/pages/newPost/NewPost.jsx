import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './NewPost.css'
import {useNavigate} from "react-router-dom";
import {Navbar} from "../../components/navbar/Navbar";
import {useEffect, useState} from "react";
import axios from "axios";
import {Auth} from "../../components/Auth";


export const NewPost = () => {
    const [title, setTitle]             = useState("New title")
    const [authorName, setAuthorName]   = useState(localStorage.getItem("username"))
    const [content, setContent]         = useState("Your content here...")
    const [thumbnail, setThumbnail]     = useState(null)
    const [img, setImg]                 = useState(null)

    let navigate = useNavigate();

    const handleOnchangeThumbnail = (e) =>{
        let file = (e?.target?.files?.[0])
        if (file != null) {
            let src = URL.createObjectURL(file);
            setThumbnail(file);
            setImg(src);
        } else {
            setThumbnail(null);
            setImg(null);
        }
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleAuthorName = (e) => {
        setAuthorName(e.target.value);
    }

    const handleContent = (e) => {
        setContent(e.target.value);
    }

    const validateSubmit = () => {
      if(title.length === 0) {
          toast("Title is required!");
          return false;
      }
      if(authorName.length === 0) {
            toast("Author is required!");
            return false;
      }
        if(content.length === 0) {
            toast("Content is required!");
            return false;
        }
        if(thumbnail === null) {
            toast("Thumbnail is required!");
            return false;
        }
      return true;
    }

    const onSubmit = (e) => {
        if(! validateSubmit()) {
            e.preventDefault();
            return;
        }

        const formData = new FormData();
        formData.append("accountId", localStorage.getItem("accountId"));
        formData.append("title", title);
        formData.append("authorName", authorName);
        formData.append("content", content);
        formData.append("file", thumbnail);

        axios.post(`/posts`, formData,
            {
                withCredentials: true,
                headers:{
                    "Content-Type": "multipart/form-data",
                }})
            .then(res => {
                toast("Create post successfully!");
                navigate("/");
            })
            .catch( e => {
                if(e.response.status === 400){
                    setTimeout(() => {
                        toast(`Failed to create post! Reason: ${e.response.data}`)
                    }, 1000)
                    e.preventDefault()
                }else {
                    localStorage.clear()
                    toast(`Please login again!`)
                    navigate("/login", { replace: true });
                }
            })
        e.preventDefault()
    }

    return (
        <>
            <Auth/>
            <ToastContainer/>
            <Navbar/>
            <form onSubmit={onSubmit} className="newPost-container newPost">
                <h2 className={"page-title"}>Create new post</h2>
                <p><input style={{borderColor: title.length ? "" :"red"}} onChangeCapture={handleTitle} defaultValue={title} type="text" placeholder="Title *" maxLength="150"/></p>
                <p><input style={{borderColor: authorName?.length ? "" :"red"}} onChangeCapture={handleAuthorName} defaultValue={authorName} type="text" placeholder="Author *" maxLength="50"/></p>
                <p><textarea style={{borderColor: content.length ? "" :"red"}} onChangeCapture={handleContent} defaultValue={content} placeholder={"Content *"}/></p>
                <p><input className={"input-thumbnail"} name={"input-thumbnail"} id={"input-thumbnail"} onChangeCapture={handleOnchangeThumbnail} accept={["image/png","image/jpeg"]} type={"file"} placeholder="Thumbnail *"/></p>
                <p className={"label-thumbnail"}><label htmlFor="input-thumbnail">Choose a file</label></p>
                <p>{ img != null && <img id="preview-thumbnail" src={img} alt="your image" />}</p>
                <p><input type="submit"/></p>
            </form>
        </>
    )
}