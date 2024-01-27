import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import logo from "../resources/img/logo.png";
import { MdChat } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import Nullprofile from "../../common/resources/img/profile.png"

import axios from 'axios';

// redux
import HeaderButton from "../components/HeaderButton";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setLogin, setMemberId, setLocation, setParamId, setProfileImg } from "../../member/redux/modules/login"


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
    width: 25%;
    height: 50%;
    float: right;
    background-color: #fff;
    margin-right: 3%;
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
    width : 150px;
    height : 40px;
    background-color: #fff;
    border-radius : 15px;
    border: 1px solid rgba(18, 23, 42, 0.1);
    margin-right: 3%;
    padding: 0px 0px 0px 10px;
    box-shadow: 0px 4px 15px -5px rgba(18, 23, 42, 0.1);
    box-sizing: border-box;
    display: flex;
    justify-items: space-between;
    align-items: center; 
    cursor: pointer;
`;

const HiddenLocation = styled.div`
    width: 150px;
    height: 30px;
    background-color: #fff;
    margin-right: 3%;
`;

const Location = styled.span`
    color: #000;
    font-weight: bold;
    font-size: 20px;
    font-family: 'SUITE';
    text-align: center;
    width: 100px;
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

const Profile = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: -3%;
    background-color: #000;
    border: none;
`;

const HiddenProfile = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: -3%;
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

    const { isLog, id, loc, profile } = useSelector( state => ({
        isLog: state.login.isLogin,
        id: state.login.memberId,
        loc: state.login.location,
        profile: state.login.profileImg
    }), shallowEqual);

    const setLog = (isLogin) => dispatch(setLogin(isLogin));
    const setId = (memberId) => dispatch(setMemberId(memberId));
    const setParam = (paramid) => dispatch(setParamId(paramid)); 
    const setLoc = (loc) => dispatch(setLocation(loc)); 
    const setProfile = (profile) => dispatch(setProfileImg(profile));

    // 웹 스토리지에 데이터 생성 및 초기값 설정
    // sessionStorage - JWT
    if(sessionStorage.getItem('jwt') === null){
        sessionStorage.setItem('jwt', JSON.stringify({
            access: null,
            refresh: null
        }))
    }
    // webStorage - 새로고침 데이터 삭제 방지용(redux data)
    if(sessionStorage.getItem('savedData') === null){
        sessionStorage.setItem('savedData', JSON.stringify({
            isLogin: false,
            id: null,
            loc : {
                latitude: null,
                longitude: null
            },
            profileImg: null
        }));
    }


    // 새로고침 시 데이터 유지
    useEffect(()=>{
        if(sessionStorage.getItem('savedData')!==null && JSON.parse(sessionStorage.getItem('savedData')).id !== null){  
            if(JSON.parse(sessionStorage.getItem('savedData')).isLogin && !isLog){
                setLog(JSON.parse(sessionStorage.getItem('savedData')).isLogin);
                setId(JSON.parse(sessionStorage.getItem('savedData')).id);
                setLoc({
                    latitude: JSON.parse(sessionStorage.getItem('savedData')).loc.latitude, 
                    longitude: JSON.parse(sessionStorage.getItem('savedData')).loc.longitude
                });
                setProfile(JSON.parse(sessionStorage.getItem('savedData')).profileImg);
            }
        }
    },[isLog]);

    // 토큰 재발행 함수
    const ReissueToken = (msg) => {
        axios.post("http://13.209.77.50:8080/auth/reissue",{
            accessToken: JSON.parse(sessionStorage.getItem('jwt')).access,
            refreshToken: JSON.parse(sessionStorage.getItem('jwt')).refresh
        })
        .then(function(response){
            sessionStorage.setItem('jwt',JSON.stringify({
                access: response.data.accessToken,
                refresh: response.data.refreshToken
            }))
            alert(msg);
            navigate("/main");
        })
        .catch(function(error){
            console.log(error);
        });
    }    

    // 로그아웃
    const handleLogOut = () => {
        if(isLog) {
            axios.post("http://13.209.77.50:8080/member/logout", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }
            })
            .then(function(response){
                setLog(false);
                setId(null);
                setParam(null);
                setLocation({
                    latitude: null,
                    longitude: null
                });
                setProfile(null);
                sessionStorage.removeItem('jwt');
                sessionStorage.removeItem('savedData');
                sessionStorage.removeItem('savedUserInfo');
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
        sessionStorage.setItem('savedUserInfo', JSON.stringify({
            profileImage: null,
            nickname: null,
            intro: null,
            score: null,
            medalCount: null,
        }));
        navigate("/mypage");
    }

    // 위치 정보
    // 위도 : latitude, 경도 : longitude
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
                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }
            }).then(function(response){
                setLoc({
                    latitude: response.data.lat,
                    longitude: response.data.lng
                });
                const presessionStorageId = JSON.parse(sessionStorage.getItem('savedData')).id;

                sessionStorage.setItem('savedData', JSON.stringify({
                    isLogin: true,
                    id: presessionStorageId,
                    loc : {
                        latitude: response.data.lat,
                        longitude: response.data.lng
                    }
                }));
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

        Swal.fire({
            title: "위치 정보 재설정",
            text: "위치 정보를 재설정 하시겠습니까?",
            icon: "warning",
            confirmButtonColor: "#d33",
            confirmButtonText: "확인",
            showCancelButton: true, 
            cancelButtonColor: '#3085d6', 
            cancelButtonText: '취소',
    
        }).then(result => {
            if (result.isConfirmed) {
                geolocation.getCurrentPosition(handleSuccess, handleError, geolocationOptions);
         }});
        
    }

    
    // 카카오맵 api 활용

    const [sigudong, setSigudong] = useState(""); 

    const mapApi = (latitude, longitude) => {
        axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
        {headers:{
            Authorization: `KakaoAK ae9e0cedf9e82516ded7194a84881362`
            }    
        })
        .then(function(response){
            if(response.data.documents.length !== 0){
                setSigudong(response.data.documents[0].address.region_2depth_name);
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }

    useEffect(()=>{
        if(loc.latitude !== null && loc.longitude !== null) mapApi(loc.latitude, loc.longitude);
    }, [loc]);

    return (
        <Wrapper>
            <Logo onClick={()=>{navigate("/main");}}>
                <img src={logo} alt="로고" style={{width:"100%"}}></img>
            </Logo>
            <PostListMenu onClick={()=>navigate("/postlist/helping")}>원정대</PostListMenu>
            <PostListMenu onClick={()=>navigate("/postlist/helped")}>의뢰인</PostListMenu>
            
            <RightContainer>
                {isLog ? <LocationBox onClick={SetLocation}><IoLocationSharp size="30" color="#f8332f"/> <Location>{sigudong}</Location></LocationBox>: <HiddenLocation />}
                {isLog ? <Chat onClick={()=>navigate("/chat")}><MdChat size="30" color="#f8332f"/></Chat>: <HiddenChat />}
                {isLog ? <HeaderButton onClick={MyPageButtonClicked}>마이페이지</HeaderButton>: <HiddenMyPage />}   
                <HeaderButton onClick={handleLogOut}>{isLog?"로그아웃":"로그인"}</HeaderButton>
                {isLog ? <Profile src={((profile === null || profile === undefined)? Nullprofile : profile)}></Profile>: <HiddenProfile />}
            </RightContainer>
        </Wrapper>
    );
}