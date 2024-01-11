import React from "react";
import Header from "./ui/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App(props) {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<Main />} />
                <Route path="/main" element={<Main />} />
                <Route path="/chat" element={<Chat />}/>
                <Route path="/findId" element={<FindId />}/>
                <Route path="/logIn" element={<LogIn />}/>
                <Route path="/myPage" element={<MyPage />}/>
                <Route path="/postList" element={<PostList />}/>
                <Route path="/resetPw" element={<ResetPw />}/>
                <Route path="/signUp" element={<SignUp />}/>
                <Route path="/viewPost" element={<ViewPost />}/>
                <Route path="/writePost" element={<WritePost />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;