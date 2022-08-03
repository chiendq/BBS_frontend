import './Navbar.css'
import {toast, ToastContainer} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export const Navbar = () => {

    const isLoggedIn = () => {
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
          <nav className="navbar">
              <Link to="/" className={"nav-logo"}>Home</Link>
              <ul className="nav-links">
                  <Link hidden={!isLoggedIn()} to="/newPost" className={"header-newPost"}>New Post</Link>
                  <Link hidden={isLoggedIn()}  to="/login"   className={"header-login"}>Login</Link>
                  <Link hidden={isLoggedIn()}  to="/signup"  className={"header-signup"}>Signup</Link>
                  <Link hidden={!isLoggedIn()} to={"#"}      className={"header-username"}>
                      <div style={{textAlign:"center", margin: "5px 0px", fontSize:"20px", fontWeight:"bold"}}>Welcome</div>
                      <div>{localStorage.getItem("username")}</div>
                  </Link>
                  <Link onClick={handleLogout} hidden={!isLoggedIn()} to="/logout" className={"header-logout"}>Logout</Link>              </ul>
          </nav>
      </>
  )
}