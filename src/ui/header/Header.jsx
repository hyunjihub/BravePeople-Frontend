import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import logo from "./logo.png";
import { MdChat } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

// redux
import HeaderButton from "./HeaderButton";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setLogin, setAccessToken, setRefreshToken } from "../../redux/modules/login";

const Wrapper = styled.div`
    width : 100vw;
    height : 70px;
    min-width: 1024px;
    border-bottom: 1px solid #efefef;
    position: sticky;
    top: 0;
    z-index: 9999;
    background-color: #fff;
`;

const RightContainer = styled.div`
    width: 23%;
    height: 50%;
    float: right;
    background-color: #fff;
    margin-right: 4%;
    margin-top: 1.1%;
    display: flex;
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

const LocationBox = styled.button`
    width : 130px;
    height : 40px;
    background-color: #fff;
    border-radius : 15px;
    border: 1px solid rgba(18, 23, 42, 0.1);
    margin-right: 5%;
    padding: 0px 0px 0px 10px;
    box-shadow: 0px 4px 15px -5px rgba(18, 23, 42, 0.1);
    box-sizing: border-box;
    display: flex;
    justify-items: space-between;
    align-items: center; 
    cursor: pointer;
`;

const HiddenLocation = styled.div`
    width: 130px;
    height: 30px;
    background-color: #fff;
    margin-right: 5%;
`;

const Location = styled.span`
    margin-left: 10%;
    color: #000;
    font-weight: bold;
    font-size: 20px;
    font-family: 'SUITE';
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

const Chat = styled.button`
    border: none;
    background-color: #fff;
    width: 10%;
    height: 10%;
    margin-top: 2%;
    cursor: pointer;
`;

const HiddenChat = styled.div`
    width: 10%;
    height: 10%;
    background-color: #fff;
`;

const HiddenMyPage = styled.div`
    width: 100px;
    height: 30px;
    background-color: #fff;
`;

export default function Header(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLog, access, refresh } = useSelector( state => ({
        isLog: state.login.isLogin,
        access: state.login.accessToken,
        refresh: state.login.refreshToken
    }), shallowEqual);

    const setLog = (isLogin) => dispatch(setLogin(isLogin));
    const setAccess = (accessTk) => dispatch(setAccessToken(accessTk));
    const setRefresh = (refreshTk) => dispatch(setRefreshToken(refreshTk));

    const handleLogOut = () => {
        if(isLog) {
            setLog(false);
            setAccess("");
            setRefresh("");
            navigate("/main");
        }else{
            navigate("/login")
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
                {isLog ? <LocationBox><IoLocationSharp size="30" color="#f8332f"/> <Location>춘천시</Location></LocationBox>: <HiddenLocation />}
                {isLog ? <Chat onClick={()=>navigate("/chat")}><MdChat size="30" color="#f8332f"/></Chat>: <HiddenChat />}
                {isLog ? <HeaderButton onClick={()=>{navigate("/mypage");}}>마이페이지</HeaderButton>: <HiddenMyPage />}   
                <HeaderButton onClick={handleLogOut}>{isLog?"로그아웃":"로그인"}</HeaderButton>
            </RightContainer>
        </Wrapper>
    );
}