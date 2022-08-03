import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from "react-hook-form";
import './NewPost.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Navbar} from "../../components/navbar/Navbar";
import {useState} from "react";

export const NewPost = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
        title: "",
        authorName: localStorage.getItem("username"),
        content: "",
        thumbnail: null
    }
});

    const [test, setTest] = useState()

    let navigate = useNavigate();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("accountId", localStorage.getItem("accountId"))
        formData.append("title", data.title)
        formData.append("authorName", data.authorName)
        formData.append("content", data.content)
        formData.append("file", data.thumbnail[0]);

        axios.post(`http://localhost:9000/posts`, formData,
            {
                withCredentials: true,
                headers:{
                    "Content-Type": "multipart/form-data",
                }})
            .then(res => {
                toast("Create post successfully!")
                navigate("/", { replace: true });
            })
            .catch(e => {
                toast(`Failed to create post! Reason: ${e.response.data}`)
            })
    }

    const handleFileOnChanged = (e) => {
        setTest(e.target.files[0])
    }

    console.log(test)

    return (
        <>
            <ToastContainer/>
            <Navbar/>
            <form onSubmit={handleSubmit(onSubmit)} className="newPost-container newPost">
                <h2 className={"page-title"}>Create new post</h2>
                <p><input type="text" placeholder="Title *" {...register("title", {required: true})} /></p>
                <p><input type="text" placeholder="Author *" {...register("authorName", {required: true})} /></p>
                <p><textarea placeholder="Content *" {...register("content", {required: true})} /></p>
                <p><input accept={["image/png","image/jpeg"]} type={"file"} placeholder="Thumbnail *" {...register("thumbnail", {required: true})}/></p>
                <p><img id="blah" src="#" alt="your image" /></p>
                <p><input type="submit"/></p>
            </form>
        </>
    )
}