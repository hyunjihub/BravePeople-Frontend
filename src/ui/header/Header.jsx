import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import logo from "./logo.png";
import { useInView } from "react-intersection-observer"

import Button from "./HeaderButton";


const Wrapper = styled.div`
    width : 100vw;
    height : 70px;
    border-bottom: 1px solid #efefef;
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #fff;
`;

const RightContainer = styled.div`
    width: 250px;
    height: 65px;
    float: right;
    margin-right: 110px;
    position: relative;
`;

const Logo = styled.div`
    width : 200px;
    height : 43px;
    float : left;
    margin-top : 10px;
    margin-left : 3vw;
    margin-right : 30px;
    cursor: pointer;
`;

const Location = styled.div`
    width : 130px;
    height : 30px;
    float : right;
    background-color : #fff;
    border-radius : 15px;
    text-align : center;
    line-height : 30px;
    font-weight : bold;
    border: 1px solid #333;
    font-size : 20px;
    margin-right: 30px;
`;

const HiddenLocation = styled.div`
    width : 130px;
    height : 30px;
    background-color : #fff;
    border: 1px solid #fff;
`;

const PostListMenu = styled.div`
    width: 120px;
    height: 30px; 
    font-size: 20px;
    text-align: center;
    float: left;
    margin-left: 20px;
    margin-top: 26px;
    border-radius: 15px;
    background-color: #fff;
    color: #333;
    font-weight: bold;
    line-height: 30px;
    cursor: pointer;
    &:hover{
        color: #f8332f;
    }
    letter-spacing: 5px;
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
            /*setTimeout(()=>{navigate("/main")}, 2000);*/
        }
    };
    
    return (
        <Wrapper>
            <Logo onClick={()=>{navigate("/main");}}>
                <img src={logo} alt="로고" style={{width:"100%"}}></img>
            </Logo>
            <PostListMenu onClick={()=>navigate("/postlist/helping")}>원정대</PostListMenu>
            <PostListMenu onClick={()=>navigate("/postlist/helped")}>의뢰인</PostListMenu>
            <RightContainer>
                {isLoggedIn ? <Location>위치정보</Location>: <HiddenLocation />}
                <Button onClick={handleLogOut}>{isLoggedIn?"로그아웃":"로그인"}</Button>
                {isLoggedIn ? <Button onClick={()=>{navigate("/mypage");}}>마이페이지</Button>: null}   
            </RightContainer>
        </Wrapper>
    );
}

export default Header;