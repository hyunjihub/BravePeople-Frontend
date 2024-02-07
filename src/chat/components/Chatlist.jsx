import styled from "styled-components";
import React, { useEffect, useState } from "react";
import profile from "../../common/resources/img/profile.png";
import { useNavigate } from "react-router";

const Chat = styled.div`
  margin: 2% 0;
`;

const Container = styled.div`
    width: 100%;
    height: 30%;
    overflow-y: auto;
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

const Profile = styled.img`
    width: 10%;
    height: 15%;
    cursor: pointer;
    margin: 2%;
`;

const Time = styled.div`
  width: 10%;
  font-size: 12px;
  color: #808080;
  text-align: right;
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
  top: 15%;
  border-radius: 50%;
  background-color: #f8332f;
  width: 3.5%;
  height: 25%;
  color: #fff;
  padding: 0% 1.3%;
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
  const handlePage = (e) => {
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
  const handleChat = (roomId) => {
    props.setState(roomId);
  }

  return (
      <Chat>
        {list.map((list) => (
          props.filter === list.status && 
          (<Container key={list.roomId} onClick={() => handleChat(list.roomId)}>
          <Profile onClick={handlePage} value={list.memberId} src={profile} alt="프로필 이미지" />
          {(list.isRead===true)&&<Unread>!</Unread>}
          <ChatContainer>
            <Nickname>{list.nickname}</Nickname>
            <LastChat>{truncate(list.lastChat, 30)}</LastChat>
          </ChatContainer>
          <Time>{list.lastSendAt}</Time>
        </Container>)
        ))}
      </Chat>
    );   
} 

export default Chatlist;