import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import logo from "./logo.png";

import Button from "./HeaderButton";


const Wrapper = styled.div`
    width : 100vw;
    height : 60px;
    border-bottom: 1px solid #333;
`;

const Logo = styled.div`
    width : 200px;
    height : 43px;
    float : left;
    margin-top : 10px;
    margin-left : 1vw;
    cursor: pointer;
`;

const Location = styled.div`
    width : 150px;
    height : 40px;
    float : right;
    margin-top : 10px;
    margin-right: 2vw;
    background-color : #fff;
    border-radius : 15px;
    text-align : center;
    line-height : 40px;
    font-weight : bold;
    border: 1px solid #333;
`;

const PostListMenu = styled.div`
    width: 120px;
    height: 30px; 
    font-size: 18px;
    text-align: center;
    float: left;
    margin-left: 20px;
    margin-top: 23px;
    border-radius: 15px;
    background-color: #fff;
    border: 1px solid #333;
    color: #333;
    line-height: 30px;
    cursor: pointer;
    &:hover{
        background-color: #333;
        color: #fff;
    }
`;

function Header(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        if(isLoggedIn) {
            setLoggedIn(false);
            navigate("/main");
        }
        else {
            setLoggedIn(true);
            navigate("/logIn");
            setTimeout(()=>{navigate("/main")}, 2000);
        }
    };

    return (
        <Wrapper>
            <Logo onClick={()=>{navigate("/main");}}>
                <img src={logo} alt="로고" style={{width:"100%"}}></img>
            </Logo>
            <PostListMenu onClick={()=>navigate("/helpingPostList")}>원정대게시판</PostListMenu>
            <PostListMenu onClick={()=>navigate("/helpedPostList")}>의뢰인게시판</PostListMenu>
            <Button onClick={handleLogOut}>{isLoggedIn?"로그아웃":"로그인"}</Button>
            {isLoggedIn ? <Button onClick={()=>{navigate("/myPage");}}>마이페이지</Button>: null}   
            {isLoggedIn ? <Location>위치정보</Location>: null}
        </Wrapper>
    );
}

export default Header;