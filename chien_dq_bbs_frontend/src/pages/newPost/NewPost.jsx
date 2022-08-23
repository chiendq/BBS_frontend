import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './NewPost.css'
import {useNavigate} from "react-router-dom";
import {Navbar} from "../../components/navbar/Navbar";
import { useState} from "react";
import axios from "axios";
import {Auth} from "../../components/Auth";
import {Input} from "../../components/inputs/Input";

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

    const handleContent = (e) => {
        setContent(e.target.value);
    }

    const onSubmit =  async  (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("accountId", localStorage.getItem("accountId"));
        formData.append("title", title);
        formData.append("authorName", authorName);
        formData.append("content", content);
        formData.append("file", thumbnail);

         await axios.post(`/posts`, formData,
            {
                withCredentials: true,
                headers:{
                    "Content-Type": "multipart/form-data",
                }})
            .then(res => {
                toast("Create post successfully!");
                setTimeout(()=>{navigate("/");}, 2000)

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
    }

    return (
        <>
            <Auth/>
            <ToastContainer/>
            <Navbar/>
            <form onSubmit={onSubmit} className="newPost-container newPost">
                <h2 className={"page-title"}>Create new post</h2>
                <Input name={"Title"} prob={title} setProb={setTitle} maxLength={150} type={"text"}  />
                <Input name={"Author"} prob={authorName} setProb={setAuthorName} maxLength={50} type={"text"}  />
                <p><textarea style={{borderColor: content.length ? "" :"red"}} onChangeCapture={handleContent} defaultValue={content} placeholder={"Content *"}/></p>
                {!content && <p style={{color:"red"}}>Content is required</p>}
                <p>
                    <input className={"input-thumbnail"} id={"input-thumbnail"} onChangeCapture={handleOnchangeThumbnail}
                           accept={["image/png","image/jpeg"]} type={"file"} placeholder="Thumbnail *"/>
                </p>
                <p className={"label-thumbnail"} >
                    <label htmlFor="input-thumbnail">Choose a file</label>
                </p>
                <div>{!thumbnail && <p style={{color:"red"}}>Thumbnail is required</p>}</div>
                <p>{ img != null && <img id="preview-thumbnail" src={img} alt="your image" />}</p>
                <p><input type="submit"/></p>
            </form>
        </>
    )
}