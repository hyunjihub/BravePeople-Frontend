import React from "react";
import Header from "./header/page/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
//Page
import Chat from "./chat/page/Chat";
import FindId from "./member/page/FindId";
import LogIn from "./member/page/LogIn";
import Main from "./common/page/Main";
import PostList from "./post/page/PostList";
import ResetPw from "./member/page/ResetPw";
import SignUp from "./member/page/SignUp";
import ViewPost from "./post/page/ViewPost";
import WritePost from "./post/page/WritePost";
import MyPage from "./member/page/MyPage";
import Error from "./common/page/Error";
import Authentication from "./member/page/Authentication";

export default function App(props) {

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
                    <Route path="/profile/:memberid" element={<MyPage />}/>
                    <Route path="/postlist/:ishelped" element={<PostList />}/>
                    <Route path="/resetpw" element={<ResetPw />}/>
                    <Route path="/authentication" element={<Authentication />} />
                    <Route path="/signup" element={<SignUp />}/>
                    <Route path="/viewpost/:postid" element={<ViewPost />}/>
                    <Route path="/postlist/:ishelped/writepost/:postid" element={<WritePost />}/>
                    <Route path="/error" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}