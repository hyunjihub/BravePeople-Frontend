import styled from "styled-components";
import React from "react";
import profile from "../../common/resources/img/profile.png";

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
  font-size: 12px;
  color: #808080;
`;

const ChatContainer = styled.div`
  width: 68%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 2%;
`;

function Chatlist(props) {
    const list = [
        {
          id: 1,
          nickname: 'User 1',
          lastChat: '마지막으로 친 채팅이오',
          lastChatTime: '오후 12:30',
          status: "대기/진행",
        },
        {
          id: 2,
          nickname: 'User 2',
          lastChat: '안녕안녕안녕',
          lastChatTime: '오후 1:45',
          status: "완료/취소",
        },
    ];

    return (
        <Chat>
          {list.map((list) => (
            props.value === list.status && 
            (<Container key={list.id}>
            <Profile src={profile}></Profile>
            <ChatContainer>
              <Nickname>{list.nickname}</Nickname>
              <LastChat>{list.lastChat}</LastChat>
            </ChatContainer>
            <Time>{list.lastChatTime}</Time>
          </Container>)
          ))}
        </Chat>
      );   
} 

export default Chatlist;