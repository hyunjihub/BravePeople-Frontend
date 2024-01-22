import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import logo from "./logo.png";
import { MdChat } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

import axios from 'axios';

// redux
import HeaderButton from "./HeaderButton";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setLogin, setAccessToken, setRefreshToken, setMemberId, setParamId } from "../../redux/modules/login";

const Wrapper = styled.div`
    width : 100vw;
    height : 70px;
    min-width: 1300px;
    border-bottom: 1px solid #efefef;
    position: sticky;
    top: 0;
    z-index: 9999;
    background-color: #fff;
`;

const RightContainer = styled.div`
    width: 27%;
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

    const { isLog, access, refresh, id, param } = useSelector( state => ({
        isLog: state.login.isLogin,
        access: state.login.accessToken,
        refresh: state.login.refreshToken,
        id: state.login.memberId,
        param: state.login.paramId
    }), shallowEqual);

    const setLog = (isLogin) => dispatch(setLogin(isLogin));
    const setAccess = (accessTk) => dispatch(setAccessToken(accessTk));
    const setRefresh = (refreshTk) => dispatch(setRefreshToken(refreshTk));
    const setId = (memberId) => dispatch(setMemberId(memberId));
    const setParam = (paramid) => dispatch(setParamId(paramid));

    const ReissueToken = (msg) => {
        axios.post("http://13.209.77.50:8080/auth/reissue",{
            accessToken: access,
            refreshToken: refresh,
        })
        .then(function(response){
            setAccess(response.data.accessToken);
            setRefresh(response.data.refreshToken);
            alert(msg);
            navigate("/main");
        })
        .catch(function(error){
            console.log(error);
        });
    }

    const handleLogOut = () => {
        if(isLog) {
            axios.post("http://13.209.77.50:8080/member/logout", {
                headers: {
                    'Authorization': `Bearer ${access}`
                }
            })
            .then(function(response){
                setLog(false);
                setAccess("");
                setRefresh("");
                setId("");
                navigate("/main");
            })
            .catch(function(error){
                console.log(error);
            });
        }else{
            navigate("/login")
        }
    };

    const MyPageButtonClicked = () => {
        setParam(id);
        navigate("/mypage");
    }

    // 위치 정보
    const { geolocation } = navigator;
    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 1000 * 3600 * 24,
    }

    const SetLocation = () => {
        const handleSuccess = (pos) => {
            axios.patch("http://13.209.77.50:8080/member/location", {
                lat:pos.coords.latitude,
                lng:pos.coords.longitude
            }, {
                headers:{
                    Authorization: `Bearer ${access}`
                }
            }).then(function(response){
                mapApi(response.data.lat, response.data.lng);
            }).catch(function(err){
                if(err.response.data.status === '401 UNAUTHORIZED' && err.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken("토큰기한 만료로 수정이 취소되었습니다. 메인 페이지로 이동합니다.");
                }
            });
        }
        const handleError = (err) => {
            console.log(err);
        }
        if(!geolocation){
            console.log('Geolocation is not supported');
            return;
        }
        if(window.confirm("위치 정보를 새로 저장하시겠습니까?")){
            geolocation.getCurrentPosition(handleSuccess, handleError, geolocationOptions);
        }else{
            console.log("위치 정보 저장 취소");
        }
        
    }

    // 카카오맵 api 활용
    const [sigudong, setSigudong] = useState(""); 

    const mapApi = (latitude, longitude) => {
        console.log(latitude);
        console.log(longitude);
        axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${latitude}&y=${longitude}`,{
            headers:{
                Authorization: 'KakaoAK ae9e0cedf9e82516ded7194a84881362',
            }
        })
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    return (
        <Wrapper>
            <Logo onClick={()=>{navigate("/main");}}>
                <img src={logo} alt="로고" style={{width:"100%"}}></img>
            </Logo>
            <PostListMenu onClick={()=>navigate("/postlist/helping")}>원정대</PostListMenu>
            <PostListMenu onClick={()=>navigate("/postlist/helped")}>의뢰인</PostListMenu>
            
            <RightContainer>
                {isLog ? <LocationBox onClick={SetLocation}><IoLocationSharp size="30" color="#f8332f"/> <Location>춘천시</Location></LocationBox>: <HiddenLocation />}
                {isLog ? <Chat onClick={()=>navigate("/chat")}><MdChat size="30" color="#f8332f"/></Chat>: <HiddenChat />}
                {isLog ? <HeaderButton onClick={MyPageButtonClicked}>마이페이지</HeaderButton>: <HiddenMyPage />}   
                <HeaderButton onClick={handleLogOut}>{isLog?"로그아웃":"로그인"}</HeaderButton>
            </RightContainer>
        </Wrapper>
    );
}