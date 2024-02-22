import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import logo from "../resources/img/logo.png";
import { MdChat } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import Nullprofile from "../../common/resources/img/profile.png"
import { BASE_URL } from "../../common/components/Util";
// axios
import axios from 'axios';
// redux
import HeaderButton from "../components/HeaderButton";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setLogin, setMemberId, setLocation, setProfileImg, setIsNew, setIsChangedStatus } from "../../member/redux/modules/login"
// sse
import { EventSourcePolyfill } from "event-source-polyfill";
// toastify
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Wrapper = styled.div`
    width : 100vw;
    height : 70px;
    min-width: 1300px;
    border-bottom: 1px solid #efefef;
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: #fff;
`;

const RightContainer = styled.div`
    width: 25%;
    height: 50%;
    float: right;
    background-color: #fff;
    margin-right: 0.7%;
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
    font-weight: 900;
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
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-top: -4%;
    background-color: #fff;
    border: none;
    background-repeat: no-repeat;
    object-fit: cover;
    cursor: pointer;
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

const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    min-width: 280px;
    font-family: 'SUITE';
    font-size: 16px;
    font-weight: 600;
    border-radius: 15px;
    padding: 15px 25px;
    color: #000;
    background: #fff;;
  }

  .Toastify__progress-bar-theme--light {
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(248,51,47,1) 35%, rgba(255,0,82,1) 100%);
  }
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
    const setLoc = (loc) => dispatch(setLocation(loc)); 
    const setProfile = (profile) => dispatch(setProfileImg(profile));
    const setIsNewChat = (bool) => dispatch(setIsNew(bool));
    const setIsNewChanged = (bool) => dispatch(setIsChangedStatus(bool));

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
            else if(JSON.parse(sessionStorage.getItem('savedData')).isLogin && isLog){
                fetchSSE();
            }
        }
    },[isLog]);

    // 토큰 재발급 요청 api
    const ReissueToken = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/reissue`,{
                accessToken: JSON.parse(sessionStorage.getItem('jwt')).access,
                refreshToken: JSON.parse(sessionStorage.getItem('jwt')).refresh
            })
            sessionStorage.setItem('jwt',JSON.stringify({
                access: response.data.accessToken,
                expirationTime: response.data.accessTokenExpiresIn,
                refresh: response.data.refreshToken
            }));
            return true;
        } catch(error){
            console.log(error);
            if(error.response.status === 401 && error.response.data.errorMessage === "Refresh Token 만료"){
                sessionStorage.removeItem('jwt');
                sessionStorage.removeItem('savedData');
                sessionStorage.removeItem('savedUserInfo');
                setLog(false);
                setId(null);
                setProfile(null);
                setLoc({
                    latitude: null,
                    longitude: null
                });
                if(!isLogOut) {
                    Swal.fire({
                    title: "로그인 기간 만료",
                    text: "로그인 유지 기간이 만료되었습니다. 재로그인 해주세요.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                    });
                }
                setIsLogOut(false);
                navigate("/main");
            }else{
                console.log(error);
            }
            return false;
        };
    }

    // SSE 연결 함수
    const eventSource = useRef();

    const fetchSSE = async() => {
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if (!await ReissueToken()) return;
        }
        eventSource.current = new EventSourcePolyfill(`${BASE_URL}/stream/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }
            });
        setupSSE();
    }
    
    const setupSSE = async() => {
        eventSource.current.onopen = () => {
            // 연결 시 할 일
        };
      
        eventSource.current.onmessage = async (e) => {
            const res = await e.data;
            const parsedData = JSON.parse(res);
        
            // 받아오는 data로 할 일
            if(parsedData.type === 'NEW_CHAT' || parsedData.type === 'NEW_CONTACT'){
                setIsNewChat(true); 
                toast(parsedData.message);
            }else if(parsedData.type === 'NEW_STATUS'){
                setIsNewChanged(true);
                sessionStorage.setItem('changedStatus', JSON.stringify(Number(parsedData.message)));
            }
        };
    
        eventSource.current.onerror = (e) => {
            // 종료 또는 에러 발생 시 할 일
    
        if (e.error) {
            // 에러 발생 시 할 일
        }
    
        if (e.target.readyState === EventSource.CLOSED) {
            // 종료 시 할 일
            console.log("연결 종료");
        }
        }
    }

    //로그아웃 -> 리프레쉬 만료 때 alert없이 로그아웃 하기 위한 변수
    //isLogOut이 true일 때는, refresh 만료 시 alert가 출력 안 되게 함
    const [isLogOut, setIsLogOut] = useState(false);

    const handleIsLogOut = () => {
        setIsLogOut(true);
    }

    // 로그아웃
    const handleLogOut = async (e) => {
        handleIsLogOut();
        if(isLog) {
            // SSE 연결 종료
            if(eventSource.current){
                eventSource.current.close();
                eventSource.current = null;
            }
            if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
                if (!await ReissueToken()) return;
            }
            axios.post(`${BASE_URL}/member/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }
            })
            .then(function(response){
                sessionStorage.removeItem('jwt');
                sessionStorage.removeItem('savedData');
                sessionStorage.removeItem('savedUserInfo');
                setLog(false);
                setId(null);
                setProfile(null);
                setLoc({
                    latitude: null,
                    longitude: null
                });
                navigate("/main");
            })
            .catch(function(err){
                if(err.response.status === 401 && err.response.data.errorMessage === "Access Token 만료"){
                    sessionStorage.removeItem('jwt');
                    sessionStorage.removeItem('savedData');
                    sessionStorage.removeItem('savedUserInfo');
                    setLog(false);
                    setId(null);
                    setProfile(null);
                    setLoc({
                        latitude: null,
                        longitude: null
                    });
                    navigate("/main");
                }
                else if(err.response.status === 401 && err.response.data.errorMessage === "비회원 접근 불가") {
                    Swal.fire({
                        title: "비정상적인 접속",
                        text: "이미 로그아웃 처리 되셨거나, 로그인이 되지 않은 회원입니다.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                } else console.log(err);
            });
        }else{
            navigate("/login")
        }
    };

    const MyPageButtonClicked = () => {
        sessionStorage.setItem('savedUserInfo', JSON.stringify({
            profileImage: null,
            nickname: null,
            intro: null,
            score: null,
            medalCount: null,
        }));
        navigate(`/profile/${id}`);
    }

    // 위치 정보
    // 위도 : latitude, 경도 : longitude
    const { geolocation } = navigator;
    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 1000 * 3600 * 24,
    }

    const SetLocation = async () => {
        const handleSuccess = async (pos) => {
            if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
                if (!await ReissueToken()) return;
            }
            axios.patch(`${BASE_URL}/member/location`, {
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
                if (err.response.status === 401 && err.response.data.errorMessage === "존재하지 않는 멤버ID") {
                    Swal.fire({
                        title: "존재하지 않는 회원",
                        html: "존재하지 않은 회원입니다. 다시 확인해주세요.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
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
            <CustomToastContainer 
            style={{marginTop:"70px", marginRight:"20px"}}
            limit={3}/>
            <Logo onClick={()=>{navigate("/main");}}>
                <img src={logo} alt="로고" style={{width:"100%"}}></img>
            </Logo>
            <PostListMenu onClick={()=>navigate("/postlist/helping")}>원정대</PostListMenu>
            <PostListMenu onClick={()=>navigate("/postlist/helped")}>의뢰인</PostListMenu>
            <RightContainer>
                {isLog ? <LocationBox onClick={SetLocation}><IoLocationSharp size="30" color="#f8332f"/> <Location>{sigudong}</Location></LocationBox>: <HiddenLocation />}
                {isLog ? <Chat onClick={()=>navigate("/chat")}><MdChat size="30" color="#f8332f"/></Chat>: <HiddenChat />}
                <HeaderButton onClick={handleLogOut}>{isLog?"로그아웃":"로그인"}</HeaderButton>
                {isLog ? <Profile onClick={MyPageButtonClicked} src={((profile === null || profile === undefined)? Nullprofile : profile)} alt="프로필"></Profile>: <HiddenProfile />}
            </RightContainer>
        </Wrapper>
    );
}