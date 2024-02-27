import styled from "styled-components";
import React from "react";
import profile from "../../common/resources/img/profile.png";
import { useNavigate } from "react-router";
import uuid from 'react-uuid';

const Chat = styled.div`
  margin: 2% 0;
`;

const Container = styled.div`
    width: 100%;
    height: 60%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 1%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
`;

const Nickname = styled.div`
    font-size: 20px;
    color: #000;
`;

const LastChat = styled.div`
    font-size: 15px;
    color: #808080;
`;

const Profile = styled.div`
    width: 55px;
    height: 50px;
    cursor: pointer;
    margin: 2%;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    background-position: center;
`;

const Time = styled.div`
  width: 15%;
  font-size: 75%;
  color: #808080;
  text-align: right;
  margin: 0 3% 0 0;
`;

const ChatContainer = styled.div`
  width: 68%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 2%;
`;

const Unread = styled.div`
  position: absolute;
  left: 9%;
  top: 13%;
  border-radius: 50%;
  background-color: #f8332f;
  width: 3%;
  height: 23%;
  color: #fff;
  padding: 0% 1.8%;
  box-sizing: border-box;
  font-size: 15px;
`;

function Chatlist(props) {

  const list = props.value;
  const navigate = useNavigate();

  //글자수 over시 ...처리
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  //클릭시 프로필 페이지 이동
  const handlePage = async (e) => {
    sessionStorage.setItem('savedUserInfo', JSON.stringify({
        profileImage: null,
        nickname: null,
        intro: null,
        score: null,
        medalCount: null,
    }));
    navigate(`/profile/${String(e.target.getAttribute('value'))}`);
    e.preventDefault();
  }

  //클릭시 채팅방id 전달
  const handleChat = async (roomId) => {
    props.setState(roomId);
  }

  return (
    <Chat>
    {list
      .filter(list => {
        if (props.filter === "대기/진행") {
          return list.status === "대기중" || list.status === "진행중";
        } else if (props.filter === "완료/취소") {
          return list.status === "완료" || list.status === "취소";
        }
      })
      .map(list => (
        <Container key={uuid()} onClick={() => handleChat(list.roomId)}>
          <Profile onClick={handlePage} value={list.otherId} style={{backgroundImage: `url(${(list.otherProfileImg === null) ? profile : list.otherProfileImg})`}}/>
          {(!list.isRead)?<Unread></Unread>:null}
          <ChatContainer>
            <Nickname>{list.otherNickname}</Nickname>
            <LastChat>{truncate(list.lastChat, 30)}</LastChat>
          </ChatContainer>
          <Time>{list.lastSendAt}</Time>
        </Container>
      ))}
    </Chat>
  );   
} 

export default Chatlist;