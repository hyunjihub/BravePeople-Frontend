import React, { useEffect, useState } from "react";
import styled from "styled-components";
import profile from "../../common/resources/img/profile.png";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { setLocation, setProfileImg, setLogin, setMemberId } from "../../member/redux/modules/login";
import { useDispatch } from "react-redux";

const Chatting = styled.div`
    width: 400px;
    height: 600px;
    border-radius: 18px;
    box-shadow: 1px 0px 20px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-left: 10px;
`;

const ChatList = styled.div`
    width: 650px;
    height: 600px;
    border-radius: 18px;
    box-shadow: 0px 1px 20px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
    width: 1000px;
    height: 650px;
    display: flex;
    flex-direction: row;
    flex: space-between;
    margin: 120px auto;
`;

const Header = styled.div`
    height: 100px;
    background-color: #ECECEC;
    box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.3);
    position: sticky;
    top: 0;
    z-index: 999;
`;

const Footer = styled.div`
    height: 130px;
    background-color: #ECECEC;
    box-shadow: 0 -4px 4px -4px rgba(0, 0, 0, 0.3);
    position: sticky;
    bottom: 0;
    z-index: 999;
`;

const Profile = styled.img`
    width: 50px;
    height: 50px;
    margin: 30px 15px;
    z-index: 999;
`;

const User = styled.div`
    width: 400px;
    height: 50px;
    position: relative;
`;

const Nickname = styled.div`
    font-size: 22px;
    color: #000;
    font-weight: bold;
    position: absolute;
    left: 75px;
    top: 25px;
`;

const Button = styled.button`
    width: 80px;
    height: 22px;
    background-color: #f8332f;
    font-size: 15px;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-family: 'SUITE';
    margin-right: 5px;
`;

const DisableButton = styled.button`
    width: 80px;
    height: 22px;
    background-color: #EB9F9C;
    opacity: 0.7;
    font-size: 15px;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-family: 'SUITE';
    margin-right: 5px;
`;

const ButtonList = styled.div`
    position : absolute;
    top: 55px;
    left: 75px;
    display: flex;
    flex-direction: row;
`;

const SendBox = styled.textarea`
    width: 300px;
    height: 100px;
    border-radius: 15px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    outline-color: rgba(248, 51, 47, 0.3);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    margin: 15px 10px 0 10px;
    font-family: 'SUITE';
    box-sizing: border-box;
    padding: 10px;
`;

const Dialogue = styled.div`
    height: 420px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

function Chat(props) {

    const navigate = useNavigate();

    // redux 함수 dispatch
    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setId = (id) => dispatch(setMemberId(id));
    const setProfile = (pro) => dispatch(setProfileImg(pro));
    const setLog = (bool) => dispatch(setLogin(bool));


    const [nowRoomId, setNowRoomId] = useState(null);
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
       
        return() => {
            sessionStorage.removeItem('nowRoomId');
        }
    }, []);

    
    useEffect(()=>{
        console.log(nowRoomId);
    }, [nowRoomId]);

    // 채팅내역 불러오기
    const getPrevChat = () => {
        const getChat = async () => {
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
                setPrevChat(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }

    return(
        <Container>
            <ChatList>

            </ChatList>
            <Chatting>
                <Header>
                    <User>
                        <Profile src={profile} alt="프로필" />
                        <Nickname>원정대원</Nickname>
                        <ButtonList>                    
                            <DisableButton disabled="disabled">의뢰취소</DisableButton>
                            <Button>의뢰완료</Button>
                        </ButtonList>
                    </User>
                </Header>
                <Dialogue></Dialogue>
                <Footer>
                    <SendBox></SendBox>
                </Footer>
            </Chatting>
        </Container>
        
    );
}

export default Chat;