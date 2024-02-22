import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import profile from "../../common/resources/img/profile.png";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { setLocation, setProfileImg, setLogin, setMemberId, setIsNew, setIsChangedStatus } from "../../member/redux/modules/login";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BsCameraFill } from "react-icons/bs";
import { TbDoorExit } from "react-icons/tb";
import { BASE_URL } from "../../common/components/Util";
import check from "../resources/img/check.png";

import Chatting from "../components/Chatting";
import List from "../components/Chatlist";
import ImageModal from "../components/Modal";
import Review from "../components/Review";
import Loading from "../../common/components/Loading";

// 채팅
import { Stomp } from "@stomp/stompjs";

const ChatPage = styled.div`
    width: 480px;
    height: 600px;
    border-radius: 18px;
    box-shadow: 1px 0px 20px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-left: 10px;
`;

const ChatList = styled.div`
    width: 50%;
    height: 600px;
    border-radius: 18px;
    box-shadow: 0px 1px 20px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    border: 1px solid rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
    width: 55%;
    height: 60%;
    display: flex;
    border-radius: 18px;
    flex-direction: row;
    flex: space-between;
    margin: 120px auto;
`;

const Header = styled.div`
    height: 15%;
    background-color: #fff;
    box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.3);
    position: sticky;
    border-radius: 18px;
    top: 0;
    z-index: 90;
    display: flex;
    flex-direction: row;
`;

const Footer = styled.div`
    height: 15%;
    background-color: #fff;
    box-shadow: 0 -4px 4px -4px rgba(0, 0, 0, 0.3);
    position: sticky;
    bottom: 0;
    z-index: 90;
    display: flex;
    flex-direction: row;
`;

const Profile = styled.img`
    width: 15%;
    height: 100%;
    margin: 5% 2.5% 0 5%;
    z-index: 90;
    cursor: pointer;
    border-radius : 50%;
    background-repeat: no-repeat;
    object-fit: cover;
`;

const User = styled.div`
    width: 430px;
    height: 65%;
    display: flex;
    flex-direction: row;
`;

const Nickname = styled.div`
    width: 50%;
    font-size: 22px;
    color: #000;
    font-weight: 700;
    margin-top: 6%;
`;

const ButtonList = styled.div`
    width: 13%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 4%;
    align-items: center;

    &.request {
        flex-direction: row;
        width: 70%;
        height: 50%;
        margin: 0;
    }

    &.user {
        height: 120%;
        width: 70%;
        margin-top: 1.5%;
        align-items: flex-start;
    }
`;

const SendBox = styled.textarea`
    width: 80%;
    height: 100%;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    outline: 1px solid rgb(248, 51, 47);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    font-family: 'SUITE';
    box-sizing: border-box;
    padding: 10px;
    margin: 3% 2%;
    cursor: pointer;
    font-size: 14px;
    &:focus{
        outline: none;
    }
`;

const Dialogue = styled.div`
    height: 65%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Unselected = styled.div`
    width: 480px;
    height: 600px;
    border-radius: 18px;
    box-shadow: 1px 0px 20px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-left: 10px;
    font-size: 25px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const SendButton = styled.button`
    width: 100%;
    height: 40%;
    background-color: #f8332f;
    font-family: 'SUITE';
    font-size: 15px;
    color: #fff;
    border: none;
    border-radius: 15px;
    margin: 7% 0;
    cursor: pointer;

    &:hover {
        background-color: #ff8f8f;
    }
`;

const Filter = styled.button`
    width: 50%;
    font-size: 150%;
    font-weight: 800;
    color: #000;
    padding: 6% 10%;
    box-sizing: border-box;
    border: none;
    background-color: #fff;
    font-family: 'SUITE';

    border-bottom: 2px solid ${({ selected }) => (selected ? "#f8332f" : "#fff")};
    transition: border-bottom 0.7s ease;
`;

const Null = styled.div`
    width: 160%;
    font-size: 50px;
    text-align: center;
    margin: 10% auto 2%;
    font-weight: 700;

    &.detail {
        font-size: 30px;
        font-weight: 400;
        margin-top: 2%;
    }
`;

const NullContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ExitBox = styled.div`
    width: 2%;
    height: 80%;
    margin-top: 6%;
    margin-left: 9%;
    cursor: pointer;
`;

const Button = styled.button`
    width: 45%;
    height: 100%;
    background-color: #f8332f;
    font-size: 15px;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-family: 'SUITE';
    margin-right: 5px;
    cursor: pointer;

    &:disabled {
        background-color: #ff8f8f;
    }

    &:hover {
        background-color: #ff8f8f;
    }
`;

const Icon = styled.img`
    width: 10%;
`;

function Chat(props) {

    const navigate = useNavigate();
    const today = new Date();

    //시간 앞에 0 붙이기 위함
    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    //로딩 중 표시
    const [loading, setLoading] = useState(false);

    //시간 변환
    function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? '오후' : '오전';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0시는 12시로 표시로 해놓음
        minutes = addZero(minutes);
        return `${ampm} ${hours}:${minutes}`;
    }

    // redux 변수, 함수 연결하기
    const { id, isLog, isNewChat, isNewChanged } = useSelector((state)=>({
        isLog: state.login.isLogin,
        id: state.login.memberId,
        isNewChat: state.login.isNew,
        isNewChanged: state.login.changed
    }), shallowEqual);

    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setId = (id) => dispatch(setMemberId(id));
    const setProfile = (pro) => dispatch(setProfileImg(pro));
    const setLog = (bool) => dispatch(setLogin(bool));
    const setIsNewChat = (bool) => dispatch(setIsNew(bool));
    const setIsNewChanged = (bool) => dispatch(setIsChangedStatus(bool));

    // client
    const client = useRef();

    // 현재 active된 채팅방 id
    const [nowRoomId, setNowRoomId] = useState(null);

    // 채팅방 리스트
    const [chatList, setChatList] = useState([]);

    // 이전 채팅 내역
    const [chatMessage, setChatMessage] = useState([]);

    const [userInfo, setUserInfo] = useState({
        profileImage: null,
        nickname: null,
        memberId: null,
    });

    const [contact, setContact] = useState({
        status: null,
        isActive: false
    });


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
                Swal.fire({
                    title: "로그인 기간 만료",
                    text: "로그인 유지 기간이 만료되었습니다. 재로그인 해주세요.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
                navigate("/main");
            }else{
                console.log(error);
            }
            return false;
        };
    }

    // 페이지 처음 접속할 때
    useEffect(()=>{
        if(!JSON.parse(sessionStorage.getItem('savedData')).isLogin && !isLog){
            Swal.fire({
                title: "비정상적인 접속",
                text: "비회원은 채팅페이지에 접속하실 수 없습니다.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
            navigate("/main");
        }else if((JSON.parse(sessionStorage.getItem('savedData')).isLogin && isLog)
        || (JSON.parse(sessionStorage.getItem('savedData')).isLogin && !isLog)){
            if(sessionStorage.getItem('nowRoomId'))  { 
                setNowRoomId(JSON.parse(sessionStorage.getItem('nowRoomId')));
            }else{
                getChatList();
            }
        }
        
        return async() => {
            sessionStorage.removeItem('nowRoomId');
            if(client.current && client.current.connected)
            {
                client.current.disconnect();
                client.current = null;
            }
        }
    }, []);

    // 우측 채팅방 설정하기
    useEffect(()=>{
        const setNowRoom = async() => {
            if(nowRoomId)
            {
                if(client.current && client.current.connected) { await client.current.disconnect(); }
                await getChatList();
                await getPrevChat();
                await getContactInfo();
                subHandler();
            }  
        }
        setNowRoom();
    }, [nowRoomId]);
    
    // SSE 통신으로 새로운 채팅이 있을 때 채팅방 리스트 불러오기 api 호출
    useEffect(()=>{
        if(isNewChat){
            getChatList();
            setIsNewChat(false);
        }
    }, [isNewChat]);

    // SSE 통신으로 새로운 의뢰 상태 변화가 있을 때 의뢰 상태 불러오기 api 호출
    useEffect(()=>{
        if(isNewChanged && nowRoomId){
            getContactInfo();
            setIsNewChanged(false);
            getChatList();
        }
    }, [isNewChanged]);

    // 채팅방 리스트
    const getChatList = async () => {
        setLoading(true);
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if(!await ReissueToken()) return;
        }
        axios.get(`${BASE_URL}/chats`,
        {
            headers :{
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }
        })
        .then(async function(response){
            if(nowRoomId){
                await response.data.map((item)=>{
                    if(item.roomId === nowRoomId){
                        item.isRead = true;
                    }
                })
            }
            setChatList(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
        setLoading(false);
    }

    // 의뢰 status 불러오기
    const getContactInfo = async() => {
        setLoading(true);
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if(!await ReissueToken()) return;
        }
        axios.get(`${BASE_URL}/contact/${nowRoomId}/status`,
        {
            headers :{
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }
        })
        .then(function(response){
            console.log(response);
            setContact({
                status: response.data.status,
                isActive: response.data.isActive
            })
        })
        .catch(function(error){
            console.log(error);
        })
        setLoading(false);
    }

    // 채팅내역 불러오기
    const getPrevChat = async () => {
        setLoading(true);
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if(!await ReissueToken()) return;
        }
        axios.get(`${BASE_URL}/chats/${nowRoomId}`,
        {
            headers :{
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }
        })
        .then(function(response){
            setUserInfo({
                profileImage: response.data.otherProfileImg,
                nickname: response.data.otherNickname,
                memberId: response.data.otherId,
            });
            setChatMessage(response.data.messages);
        })
        .catch(function(error){
            console.log(error);
        })
        setLoading(false);
    }

    // 소켓 연결 & 구독
    const subHandler = async() => {
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if (!await ReissueToken()) return;
        }
        const socket = new WebSocket('wss://bravepeople.site:8080/ws-stomp');
        client.current = Stomp.over(()=>{ return socket });
        client.current.debug = () => {};
        client.current.onWebSocketClose = (e) => { 
            if(!e.wasClean && e.code === 1006){
                subHandler();
            }
        };
        client.current.connect({
            Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
            'Content-Type' : 'application/json'
        },
        ()=>{
            // 입장 메세지 보내기
            client.current.send(`/pub/${nowRoomId}`,{
                Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
                'Content-Type' : 'application/json'
            },
            JSON.stringify({
                type: "ENTER",
                senderId: id,
                message: null,
                img: null
            }));
            // 구독받은 메세지 받기
            client.current.subscribe(`/sub/${nowRoomId}`,
                (message)=>{
                    const newMessage = {
                            chatId: JSON.parse(message.body).chatId,
                            senderId: JSON.parse(message.body).senderId,
                            message: JSON.parse(message.body).message,
                            date: JSON.parse(message.body).date,
                            time: JSON.parse(message.body).time,
                            img: JSON.parse(message.body).img
                        };
                    setChatMessage(prevChatMessage => [...prevChatMessage, newMessage]);
                    getChatList();
                },
                {
                    Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
                    'Content-Type' : 'application/json'
                }
            );
        });
    }
    // enter키 : 전송 / shift+enter키 : 줄바꿈
    const onCheckEnter = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            return;
        } else if(e.key === 'Enter') {
            e.preventDefault();
            sendHandler();
        } 
    }

    // 메시지 전송
    const [msg, setMsg] = useState("");

    const sendHandler = async () => {

        // 빈 메시지 무시
        if (msg.trim() === "") {
            return;
        }

        if(client.current && client.current.connected){
            await client.current.send(`/pub/${nowRoomId}`,{
                Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
                'Content-Type' : 'application/json'
            },
            JSON.stringify({
                type: "TALK",
                senderId: id,
                message: msg,
                img: null
            }));
        }
        setMsg("");
    }

    // 메시지 입력 박스
    const handleTextbox = (e) => {
        setMsg(e.target.value);
    }

    //클릭시 프로필 페이지 이동
    const handlePage = (id) => {
        sessionStorage.setItem('savedUserInfo', JSON.stringify({
            profileImage: null,
            nickname: null,
            intro: null,
            score: null,
            medalCount: null,
        }));
        navigate(`/profile/${String(id)}`);
    }

    // 채팅방 리스트 진행 중 or 진행 중 아님으로 분류
    const [selectedFilter, setSelectedFilter] = useState("대기/진행");
    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
    };

    const fileInput = React.createRef();
    const handleProfile = async (e) => {
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if (!await ReissueToken()) return;
        }
        fileInput.current.click();
    }
    const frm = new FormData();

    //이미지 전송
    const handleImage = async (e) => {
        setLoading(true);
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if (!await ReissueToken()) return;
        }

        const files = e.target.files;
        var reg = /(.*?)\.(jpg|jpeg|png)$/;

        if (!files[0].name.match(reg)) {
            Swal.fire({
                title: "불가능한 파일 확장자",
                text: "프로필 이미지는 jpg, jpeg, png만 사용 가능합니다.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        else if (files[0].size>1024 ** 2 * 10){
            Swal.fire({
                title: "불가능한 파일 크기",
                text: "프로필 이미지는 10MB이하만 사용 가능합니다.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        } else if (files && files.length === 1) {
            frm.append('file', files[0]);
            axios.post(`${BASE_URL}/image`, frm, {
                headers: {'Content-Type' : 'Multipart/form-data',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }}).then(function(response){
                if(client.current && client.current.connected){
                    client.current.send(`/pub/${nowRoomId}`,{
                        Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
                        'Content-Type' : 'application/json'
                    },
                    JSON.stringify({
                        type: "TALK",
                        senderId: id,
                        message: null,
                        img: response.data.imgUrl
                    }));
                }
                getChatList();
            }).catch(function(err){
                if(err.response.status === 401 && err.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken();
                } else if((err.response.status === 400 && err.response.data.errorMessage === '파일 업로드 실패')) {
                    Swal.fire({
                        title: "파일 업로드 오류",
                        text: "파일 업로드 오류가 발생했습니다. 다시 시도해주세요.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                } else {
                    console.log(err);
                }
            })
        }
        fileInput.current.value = "";
        setLoading(false);
    }

    // 이미지 클릭 시, 모달 창
    const [modalOpen, setModalOpen] = useState(false);
    const [clickImg, setClickImg] = useState(null);

    // 채팅방 나가기
    const handleExit = async() => {
        setLoading(true);
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if (!await ReissueToken()) return;
        }
        // await axios.patch(`${BASE_URL}/chats/${nowRoomId}`,
        //     {headers:{
        //         Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
        //     }})
        // .then(function(response){
        //     console.log(response);
        // })
        // .catch(function(response){
        //     console.log(response);
        // })
        setNowRoomId(null);
        getChatList();
        setLoading(false);
    }

    // 의뢰 수락하기
    const acceptContact = async() => {
        setLoading(true);
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if (!await ReissueToken()) return;
        }

        Swal.fire({
            title: "의뢰 수락",
            text: `${userInfo.nickname}의 의뢰 요청을 수락하시겠습니까?`,
            icon: "info",
            confirmButtonColor: "#d33",
            confirmButtonText: "확인",
            showCancelButton: true, 
            cancelButtonColor: '#3085d6', 
            cancelButtonText: '취소',
        }).then(result => {
            if (result.isConfirmed) {
                axios.get(`${BASE_URL}/contact/${nowRoomId}`,
                {headers:{
                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }})
                .then(function(response){
                    setContact({
                        status: response.data.status,
                        isActive: response.data.isActive
                    });
                    getChatList();
                })
                .catch(function(error){
                    console.log(error);
                });
            }
        })
        setLoading(false);
    }

    // 의뢰 취소하기
    const cancelContact = async() => {
        setLoading(true);
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if (!await ReissueToken()) return;
        }

        Swal.fire({
            title: "의뢰 취소",
            text: `${userInfo.nickname}과의 의뢰를 취소하시겠습니까?`,
            icon: "info",
            confirmButtonColor: "#d33",
            confirmButtonText: "확인",
            showCancelButton: true, 
            cancelButtonColor: '#3085d6', 
            cancelButtonText: '취소',
        }).then(result => {
            if (result.isConfirmed) {
                axios.get(`${BASE_URL}/contact/${nowRoomId}/cancel`,
                    {headers:{
                        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                    }})
                .then(function(response){
                    setContact({
                        status: response.data.status,
                        isActive: response.data.isActive
                    });
                    getChatList();
                })
                .catch(function(error){
                    console.log(error);
                });
            }
        })
        setLoading(false);
    }

    // 의뢰 완료하기
    const finishContact = async() => {
        setLoading(true);
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if (!await ReissueToken()) return;
        }

        Swal.fire({
            title: "의뢰 완료",
            text: `${userInfo.nickname}과의 의뢰를 완료하시겠습니까? 완료된 의뢰는 취소할 수 없습니다.`,
            icon: "info",
            confirmButtonColor: "#d33",
            confirmButtonText: "확인",
            showCancelButton: true, 
            cancelButtonColor: '#3085d6', 
            cancelButtonText: '취소',
        }).then(result => {
            if (result.isConfirmed) {
                axios.get(`${BASE_URL}/contact/${nowRoomId}/finish`,
                    {headers:{
                        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                    }})
                .then(function(response){
                    setContact({
                        status: response.data.status,
                        isActive: response.data.isActive
                    });
                    getChatList();
                    setReviewOpen(true);
                })
                .catch(function(error){
                    console.log(error);
                });
            }}) 
        setLoading(false);
    }

    // 의뢰 수락 / 완료 버튼 onClick 함수 정하기
    const progressContact = async() => {
        if(contact.status === "대기중"){
            acceptContact();
        }
        else if(contact.status === "진행중"){
            finishContact();
        }
    }

    const [reviewOpen, setReviewOpen] = useState(false);

    return(
        <Container>
            {(chatList===null)?<NullContainer>
                <Null>대화중인 채팅방이 없습니다.</Null>
                <Null className="detail">의뢰/원정을 통해 새로운 채팅을 시작하세요.</Null>
            </NullContainer>:
            <>
            <ChatList>
                <Header>
                    <Filter onClick={() => handleFilterSelect("대기/진행")} selected={selectedFilter === "대기/진행"}>대기/진행</Filter>
                    <Filter onClick={() => handleFilterSelect("완료/취소")} selected={selectedFilter === "완료/취소"}>완료/취소</Filter>
                </Header>
                <List value={chatList} filter={selectedFilter} setState={setNowRoomId}/>
            </ChatList>
            {(nowRoomId===null)?<Unselected>선택된 채팅방이 없습니다.</Unselected>:
                <ChatPage>
                    <Header>
                        <User>
                            <Profile onClick={()=>handlePage(userInfo.memberId)} src={(userInfo.profileImage===null)?profile:userInfo.profileImage} alt="프로필" />
                            <ButtonList className="user">
                                <Nickname>{userInfo.nickname}</Nickname>
                                {(contact.status === "진행중" || contact.status === "대기중")
                                ?
                                    (contact.isActive)
                                    ?
                                        <ButtonList className="request">
                                            {(contact.status === "진행중")&&<Button onClick={cancelContact} disabled={!contact.isActive}>의뢰 취소</Button>}
                                            <Button disabled={!contact.isActive} onClick={progressContact}>{(contact.status === "진행중")?"의뢰 완료":"의뢰 수락"}</Button>
                                        </ButtonList>
                                        :
                                        (contact.status === "대기중")
                                        ?
                                            <ButtonList className="request"><Icon src={check} alt="현재 상태"/>&nbsp;의뢰 수락 대기중</ButtonList>
                                            :
                                            <ButtonList className="request"><Icon src={check} alt="현재 상태"/>&nbsp;의뢰 완료 대기중</ButtonList>
                                    :
                                    <ButtonList className="request"><Icon src={check} alt="현재 상태"/>&nbsp;진행중인 의뢰가 없음</ButtonList>
                                }
                            </ButtonList>
                            <ExitBox onClick={handleExit}>
                                <TbDoorExit size="40" color="f8332f"/>
                            </ExitBox>
                        </User>
                    </Header>
                    <Dialogue>
                        <Chatting value={chatMessage} setModal={setModalOpen} setImg={setClickImg}/>
                    </Dialogue>
                    <Footer>
                        <SendBox placeholder="메시지를 입력해주세요" onChange={handleTextbox} value={msg} onKeyDown={onCheckEnter}></SendBox>
                        <ButtonList>
                            <BsCameraFill onClick={handleProfile} size="30" color="f8332f" cursor="pointer"/>
                            <input type="file" ref={fileInput} onChange={handleImage} style={{ display: "none" }}/>
                            <SendButton onClick={sendHandler}>전송</SendButton>
                        </ButtonList>       
                    </Footer>
                </ChatPage>
            }
            {(modalOpen)&&<ImageModal img={clickImg} setModalOpen={setModalOpen} setImg={setClickImg}/>}
            {(reviewOpen)&&<Review setReviewOpen={setReviewOpen} nowRoomId={nowRoomId} userInfo={userInfo}/>}
            {(loading)&&<Loading />}
            </>
        }
        </Container>
        
    );
}

export default Chat;