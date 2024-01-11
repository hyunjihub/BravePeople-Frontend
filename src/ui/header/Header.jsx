import styled from "styled-components";
import logo from "./logo.png";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
    width : 100vw;
    height : 60px;
    background-color : #bbb;
    display: flex; 
    flex-wrap: wrap; 
`;

const Logo = styled.div`
    width : 200px;
    height : 43px;
    float : left;
    margin-top : 10px;
    margin-left : 1vw;
`;

const Location = styled.div`
    width : 150px;
    height : 40px;
    float : right;
    margin-top : 10px;
    margin-left: 60vw;
    background-color : #fff;
    border-radius : 20px;
    text-align : center;
    line-height : 40px;
    font-weight : bolder;
`;

const LoginButton = styled.button`
    width : 100px;
    height : 30px;
    float : right;
    font-size : medium;
    margin-top: 15px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    position : fixed;
    left : 1400px;
`;

const PageButton = styled.button`
    width : 100px;
    height : 30px;
    float : right;
    font-size : medium;
    margin-top: 15px;
    margin-left : 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

function Header(props) {
    const [isLoggedIn, setLoggedIn] = useState(true);
    
    const handleLogout = () => {
        setLoggedIn(false);
    };

    const navigate = useNavigate();
    
    return (
        <Wrapper>
            <Logo onClick={()=>{navigate("/main");}}>
                <img src={logo} alt="로고" style={{width:"100%"}}></img>
            </Logo>
            {isLoggedIn ? <Location>위치정보</Location>: null}
            {isLoggedIn ? <PageButton onClick={()=>{navigate("/myPage");}}>마이페이지</PageButton>: null}
            {isLoggedIn ? <LoginButton onClick={handleLogout}>로그아웃</LoginButton>: <LoginButton onClick={()=>{navigate("/logIn");}}>로그인</LoginButton>}
        </Wrapper>
    );
}

export default Header;