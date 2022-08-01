import './Header.css'
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

export const Header = () => {

    function isLoggedIn() {
        let accountId = localStorage.getItem("accountId")
        let username = localStorage.getItem("username")
        return !!(accountId && username)
    }

    let navigate = useNavigate();

    const handleLogout = () =>{
        axios.delete(`http://localhost:9000/logout`,
            {
                withCredentials: true,
            })
            .then(rs => {
                    localStorage.clear()
                    toast("You have been logged out!")
                    navigate("/", { replace: true });
                }
            )
            .catch(e => {
                toast("Error")
            })
    }

    return (
        <>
            <ToastContainer/>
            <div className={"header"}>
                <Link to="/" className={"header-home "}>Home</Link>
                <Link hidden={!isLoggedIn()} to="/newPost" className={"header-newPost"}>New Post</Link>
                <Link hidden={isLoggedIn()} to="/login" className={"header-login"}>Login</Link>
                <Link hidden={isLoggedIn()} to="/signup" className={"header-signup"}>Signup</Link>
                <div hidden={!isLoggedIn()}>{localStorage.getItem("username")}</div>
                <Link onClick={handleLogout} hidden={!isLoggedIn()} to="/logout" className={"header-logout"}>Logout</Link>
            </div>
        </>
    )
}