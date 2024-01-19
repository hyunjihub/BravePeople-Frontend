import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import logo from "./logo.png";
import { useInView } from "react-intersection-observer"

// redux
import { changeLoginState, setTokken1, setTokken2, setLong, setLati } from "../../reducer/modules/login"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from "./HeaderButton";


const Wrapper = styled.div`
    width : 100vw;
    height : 70px;
    border-bottom: 1px solid #efefef;
    position: sticky;
    top: 0;
    z-index: 9999;
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

function Header( { isLogin, tokken1, tokken2, longitude, latitude, changeLoginState, setTokken1, setTokken2, setLong, setLati } ) {
    const navigate = useNavigate();

    const handleLogOut = () => {
        if(isLogin) {
            changeLoginState(false);
            setTokken1("");
            setTokken2("");
            navigate("/main");
        }else{
            navigate("/login")
        }
    };

    useEffect(()=>{
        console.log(isLogin);
        console.log(tokken1);
        console.log(tokken2);
    }, [isLogin]);
    
    return (
        <Wrapper>
            <Logo onClick={()=>{navigate("/main");}}>
                <img src={logo} alt="로고" style={{width:"100%"}}></img>
            </Logo>
            <PostListMenu onClick={()=>navigate("/postlist/helping")}>원정대</PostListMenu>
            <PostListMenu onClick={()=>navigate("/postlist/helped")}>의뢰인</PostListMenu>
            <RightContainer>
                {isLogin ? <Location>위치정보</Location>: <HiddenLocation />}
                <Button onClick={handleLogOut}>{isLogin?"로그아웃":"로그인"}</Button>
                {isLogin ? <Button onClick={()=>{navigate("/mypage");}}>마이페이지</Button>: null}   
            </RightContainer>
        </Wrapper>
    );
}

// state 변수
const mapStateToProps = (state) => ({
    isLogin: state.login.isLogin,
    tokken1: state.login.tokken1,
    tokken2: state.login.tokken2,
    longitude: state.login.longitude,
    latitude: state.login.latitude
});

// action
const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        changeLoginState,
        setTokken1,
        setTokken2,
        setLong,
        setLati
    },
    dispatch
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);