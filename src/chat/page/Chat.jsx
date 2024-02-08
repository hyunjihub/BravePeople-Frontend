import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import profile from "../../common/resources/img/profile.png";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { setLocation, setProfileImg, setLogin, setMemberId } from "../../member/redux/modules/login";
import { useDispatch } from "react-redux";
import { BsCameraFill } from "react-icons/bs";

import Chatting from "../components/Chatting";
import List from "../components/Chatlist";

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
    font-size: 25px;
    font-weight: 800;
    color: #000;
    padding: 6% 15%;
    box-sizing: border-box;
    border: none;
    background-color: #fff;
    font-family: 'SUITE';

    border-bottom: 2px solid ${({ selected }) => (selected ? "#f8332f" : "#fff")};
    transition: border-bottom 0.7s ease;
`;


function Chat(props) {

    const navigate = useNavigate();

    // redux 함수 dispatch
    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setId = (id) => dispatch(setMemberId(id));
    const setProfile = (pro) => dispatch(setProfileImg(pro));
    const setLog = (bool) => dispatch(setLogin(bool));

    // client
    const client = useRef<CompatClient>(null);


    // 현재 active된 채팅방 id
    const [nowRoomId, setNowRoomId] = useState(null);

    // 채팅방 리스트
    const [chatList, setChatList] = useState([]);

    // 이전 채팅 내역
    const [prevChat, setPrevChat] = useState([]);


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
        if(sessionStorage.getItem('nowRoomId'))  { setNowRoomId(JSON.parse(sessionStorage.getItem('nowRoomId'))); }

        // getChatList();
       
        return() => {
            sessionStorage.removeItem('nowRoomId');
        }
    }, []);

    
    useEffect(()=>{
        console.log(`nowRoomId : ${nowRoomId}`);
        // getPrevChat();
    }, [nowRoomId]);

    // 채팅방 리스트
    const getChatList = () => {
        const getList = async () => {
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
                console.log(response);
                setChatList(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }

    // 채팅내역 불러오기
    const getPrevChat = () => {
        const getChat = async () => {
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
                console.log(response);
                setPrevChat(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }

    // 소켓 연결
    const connectHandler = () => {
        const socket = new SockJS(`ws:// 13.209.77.50:8080/ws-stomp`);
        
        client.current = Stomp.over(socket);
        client.current.connect({
            Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
            'Content-Type' : 'application/json'
        },
            ()=>{
                client.current.subscribe(`/sub/${nowRoomId}`,
                    (message)=>{
                        setPrevChat(prevChat=>
                            [...prevChat, message]
                        );
                    },
                    {
                        Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
                        'Content-Type' : 'application/json'
                    }
                );
            }     
        );
    }

    // useEffect(()=>{
    //     connectHandler();
    // }, [nowRoomId]);

    // 메시지 전송
    const [msg, setMsg] = useState("");

    const sendHandler = () => {
        if(client.current && client.current.connected){
            client.current.send(`/pub/${nowRoomId}`,{
                Authorization :  `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`,
                'Content-Type' : 'application/json'
            },
            JSON.stringify({
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

    //클릭시 프로필 페이지 이동 오류방지 위해 주석처리 함
    const handlePage = (e) => {
        sessionStorage.setItem('savedUserInfo', JSON.stringify({
            profileImage: null,
            nickname: null,
            intro: null,
            score: null,
            medalCount: null,
        }));
        //추후 변수명(otherId) 변경
        //navigate(`/profile/${String(otherId)}`);
        e.preventDefault();
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

    return(
        <Container>
            <ChatList>
                <Header>
                    <Filter onClick={() => handleFilterSelect("대기/진행")} selected={selectedFilter === "대기/진행"}>대기/진행</Filter>
                    <Filter onClick={() => handleFilterSelect("완료/취소")} selected={selectedFilter === "완료/취소"}>완료/취소</Filter>
                </Header>
                <List value={selectedFilter}/>
            </ChatList>
            <ChatPage>
                <Header>
                    <User>
                        <Profile onClick={handlePage} src={profile} alt="프로필" />
                        <ButtonList className="user">
                            <Nickname>원정대원</Nickname>
                            <ButtonList className="request">                    
                                <DisableButton disabled="disabled">의뢰취소</DisableButton>
                                <Button>의뢰완료</Button>
                            </ButtonList>
                        </ButtonList>
                    </User>
                </Header>
                <Dialogue>
                    <Chatting />
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
        </Container>
        
    );
}

export default Chat;