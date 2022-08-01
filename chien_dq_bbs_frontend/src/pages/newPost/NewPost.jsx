import {Header} from "../../components/header/Header";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from "react-hook-form";
import './NewPost.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const NewPost = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
        title: "",
        authorName: localStorage.getItem("username"),
        content: "",
        thumbnail: null
    }
});

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
                toast(e.response.data)
            })
    }

    return (
        <>
            <ToastContainer/>
            <Header/>
            <h2>Create new post</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="newPost-container newPost">
                <p><input type="text" placeholder="Title *" {...register("title", {required: true})} /></p>
                <p><input type="text" placeholder="Author *" {...register("authorName", {required: true})} /></p>
                <p><input type="text" placeholder="Content *" {...register("content", {required: true})} /></p>
                <p><input type={"file"} placeholder="Thumbnail *" {...register("thumbnail", {required: true})}/></p>
                <p><input type="submit"/></p>
            </form>
        </>
    )
}