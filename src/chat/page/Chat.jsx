import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import profile from "../../common/resources/img/profile.png";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { setLocation, setProfileImg, setLogin, setMemberId } from "../../member/redux/modules/login";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BsCameraFill } from "react-icons/bs";
import testImg from "../resources/testImg.jpg";

import Chatting from "../components/Chatting"; //자꾸 오류표시 나는데 껏다키면 오류없고, 작동 문제없음 무시
import List from "../components/Chatlist";
import Modal from "../components/Modal";

import SockJS from "sockjs-client";
import { Stomp, CompatClient } from "@stomp/stompjs";

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
    z-index: 999;
    display: flex;
    flex-direction: row;
`;

const Footer = styled.div`
    height: 15%;
    background-color: #fff;
    box-shadow: 0 -4px 4px -4px rgba(0, 0, 0, 0.3);
    position: sticky;
    bottom: 0;
    z-index: 999;
    display: flex;
    flex-direction: row;
`;

const Profile = styled.img`
    width: 15%;
    height: 100%;
    margin: 5% 2.5% 0 5%;
    z-index: 999;
    cursor: pointer;
`;

const User = styled.div`
    width: 400px;
    height: 65%;
    display: flex;
    flex-direction: row;
`;

const Nickname = styled.div`
    width: 40%;
    font-size: 22px;
    color: #000;
    font-weight: 700;
    margin-top: 6%;
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
`;

const DisableButton = styled.button`
    width: 45%;
    height: 100%;
    background-color: #EB9F9C;
    opacity: 0.7;
    font-size: 15px;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-family: 'SUITE';
    margin-right: 5px;
    cursor: pointer;
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


function Chat(props) {

    const navigate = useNavigate();

    // redux 변수, 함수 연결하기
    const { id, isLog } = useSelector((state)=>({
        isLog: state.login.isLogin,
        id: state.login.memberId
    }), shallowEqual);

    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setId = (id) => dispatch(setMemberId(id));
    const setProfile = (pro) => dispatch(setProfileImg(pro));
    const setLog = (bool) => dispatch(setLogin(bool));

    // client
    const client = useRef(null);

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


    // 토큰 재발급 요청 api
    const ReissueToken = async () => {
        try {
            const response = await axios.post("http://13.209.77.50:8080/auth/reissue",{
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
            alert("로그인 후 이용해주세요.");
            navigate("/main");
        }else if((JSON.parse(sessionStorage.getItem('savedData')).isLogin && isLog)
        || (JSON.parse(sessionStorage.getItem('savedData')).isLogin && !isLog)){
            if(sessionStorage.getItem('nowRoomId'))  { setNowRoomId(JSON.parse(sessionStorage.getItem('nowRoomId'))); }
            getChatList();
        }
        
        return() => {
            sessionStorage.removeItem('nowRoomId');
        }
    }, []);

    
    useEffect(()=>{
        console.log(`nowRoomId : ${nowRoomId}`);
        if(nowRoomId!==null) getPrevChat();
    }, [nowRoomId]);

    // 채팅방 리스트
    const getChatList = async () => {
        if((sessionStorage.getItem('jwt').expirationTime)-60000 <= Date.now()){
            if(!await ReissueToken()) return;
        }
        axios.get(`http://13.209.77.50:8080/chats`,
        {
            headers :{
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }
        })
        .then(function(response){
            setChatList(response.data);
        })
        .catch(function(error){
            console.log(error);
        })

    }

    // 채팅내역 불러오기
    const getPrevChat = async () => {
        if((sessionStorage.getItem('jwt').expirationTime)-60000 <= Date.now()){
            if(!await ReissueToken()) return;
        }
        axios.get(`http://13.209.77.50:8080/chats/${nowRoomId}`,
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
    }

    // 소켓 연결
    const connectHandler = () => {
        const socket = new WebSocket(`ws://13.209.77.50:8080/ws-stomp`);
        
        client.current = Stomp.over(socket);
        client.current.debug = () => {};
        client.current.connect({
            Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
            'Content-Type' : 'application/json'
        },
            ()=>{
                client.current.subscribe(`/sub/${nowRoomId}`,
                    (message)=>{
                        setChatMessage(prevChat=>
                            [...prevChat, message]
                        );
                        getChatList();
                    },
                    {
                        Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
                        'Content-Type' : 'application/json'
                    }
                );
            }     
        );
    }

    useEffect(()=>{
        if(nowRoomId !== null){
            connectHandler();
        }
    }, [nowRoomId]);

    // 메시지 전송
    const [msg, setMsg] = useState("");

    const sendHandler = async () => {

        // 빈 메시지 무시
        if (msg.trim() === "") {
            return;
        }

        const newMessage = {
            chatId: chatMessage.length + 1, // 실제로는 백엔드에서 할당해야 함
            senderId: 1, // 실제로는 사용자 ID에 따라 할당해야 함
            message: msg,
            date: '2월 10일', 
            time: '오후 3:35', //현재 시간 고정
            img: null 
        };

        setChatMessage([...chatMessage, newMessage]);

        if(client.current !== null && client.current.connected){
            await client.current.send(`/pub/${nowRoomId}`,{
                Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
                'Content-Type' : 'application/json'
            },
            JSON.stringify({
                senderId: id,
                message: msg,
                img: null
            }));
        }
        setMsg("");
        getChatList();
    }

    // 메시지 입력 박스
    const handleTextbox = (e) => {
        setMsg(e.target.value);
    }

    //클릭시 프로필 페이지 이동 오류방지 위해 주석처리 함
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
        if((sessionStorage.getItem('jwt').expirationTime)-60000 <= Date.now()) {
            if (!await ReissueToken()) return;
        }
        fileInput.current.click();
    }
    const frm = new FormData();

    //이미지 전송
    const handleImage = async (e) => {
        if((sessionStorage.getItem('jwt').expirationTime)-60000 <= Date.now()) {
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
            axios.post("http://13.209.77.50:8080/image", frm, {
                headers: {'Content-Type' : 'Multipart/form-data',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }}).then(function(response){
                console.log(response);
                const newMessage = {
                    chatId: messages.length + 1, // 실제로는 백엔드에서 할당해야 함
                    senderId: 1, // 실제로는 사용자 ID에 따라 할당해야 함
                    message: null,
                    date: '2월 10일', 
                    time: '오후 4:35', //현재 시간 고정
                    img: response.data.imgUrl
                };
        
                setChatMessage([...chatMessage, newMessage]);

                if(client.current && client.current.connected){
                    client.current.send(`/pub/${nowRoomId}`,{
                        Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
                        'Content-Type' : 'application/json'
                    },
                    JSON.stringify({
                        message: null,
                        img: response.data.imgUrl
                    }));
                }
                getChatList();
                fileInput.current.value = "";
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
    }

    // 이미지 클릭 시, 모달 창
    const [modalOpen, setModalOpen] = useState(false);
    const [clickImg, setClickImg] = useState(null);

    return(
        <Container>
            {(false)?<NullContainer>
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
                                <ButtonList className="request">                    
                                    <DisableButton disabled="disabled">의뢰취소</DisableButton>
                                    <Button>의뢰완료</Button>
                                </ButtonList>
                            </ButtonList>
                        </User>
                    </Header>
                    <Dialogue>
                        <Chatting value={chatMessage} setModal={setModalOpen} setImg={setClickImg}/>
                    </Dialogue>
                    <Footer>
                        <SendBox placeholder="메시지를 입력해주세요" onChange={handleTextbox} value={msg}></SendBox>
                        <ButtonList>
                            <BsCameraFill onClick={handleProfile} size="30" color="f8332f"/>
                            <input type="file" ref={fileInput} onChange={handleImage} style={{ display: "none" }}/>
                            <SendButton onClick={sendHandler}>전송</SendButton>
                        </ButtonList>       
                    </Footer>
                </ChatPage>
            }
            {(modalOpen===true)&&<Modal img={clickImg} setModal={setModalOpen} setImg={setClickImg}/>}
            </>
        }
        </Container>
        
    );
}

export default Chat;