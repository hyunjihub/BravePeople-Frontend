import React from "react";
import Header from "./ui/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
//Page
import Chat from "./page/Chat";
import FindId from "./page/FindId";
import LogIn from "./page/LogIn";
import Main from "./page/Main";
import PostList from "./page/PostList";
import ResetPw from "./page/ResetPw";
import SignUp from "./page/SignUp";
import ViewPost from "./page/ViewPost";
import WritePost from "./page/WritePost";
import MyPage from "./page/MyPage";
import Error from "./page/Error";
import Authentication from "./page/Authentication";

export default function App(props) {

    //localStorage.clear();

    return(
        <div id="App">
           <BrowserRouter>
                <Header />
                <Routes>
                    <Route index element={<Main />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/chat" element={<Chat />}/>
                    <Route path="/findid" element={<FindId />}/>
                    <Route path="/login" element={<LogIn />}/>
                    <Route path="/mypage" element={<MyPage />}/>
                    <Route path="/postlist/:ishelped" element={<PostList />}/>
                    <Route path="/resetpw" element={<ResetPw />}/>
                    <Route path="/authentication" element={<Authentication />} />
                    <Route path="/signup" element={<SignUp />}/>
                    <Route path="/viewpost" element={<ViewPost />}/>
                    <Route path="/postlist/:ishelped/writepost" element={<WritePost />}/>
                    <Route path="/error" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}