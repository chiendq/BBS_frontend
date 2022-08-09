import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {Login} from "./pages/login/Login";
import {NewPost} from "./pages/newPost/NewPost";
import {PostDetail} from "./pages/post/PostDetail";
import {Signup} from "./pages/Signup/Signup";
import {NotFound} from "./pages/notFound/NotFound"
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = 'http://localhost:9000'
axios.defaults.withCredentials = true

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<App/>} />
              <Route path={'/login'} element={<Login/>} />
              <Route path={'/signup'} element={<Signup/>} />
              <Route path={'/logout'} element={<App/>}/>
              <Route path={'/posts/new'} element={<NewPost/>}/>
              <Route path={'/posts/:id'} element={<PostDetail/>}/>
              <Route path='*' element={<NotFound />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
