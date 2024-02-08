import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import testImg from "../resources/testImg.jpg";

const Bubble = styled.div`
  max-width: 50%;
  color: ${({ isuser }) => (isuser ? '#fff' : '#000')};
  font-size: 15px;
  background-color: ${({ isuser }) => (isuser ? '#f8332f' : '#f3f0f5')};
  margin: 0% 3%;
  border-radius: 15px;
  padding: 2%;
`;

const Time = styled.div`
  color : #808080;
  font-size: 12px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: ${({ isuser }) => (isuser ? 'row-reverse' : 'row')};
  float: ${({ isuser }) => (isuser ? 'right' : 'left')};
  clear: both;
  width: 100%;
  margin: 0.5%;
  align-items: flex-end;

  &.full {
    flex-direction: column;
  }
`;

const Chat = styled.div`
  width: 100%;
  height: 100%;
  margin: 2% 0;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    display:none;
  }
`;

const Image = styled.img`
  width: 100%;
  cursor: pointer;
`;

const Date = styled.div`
  width: 20%;
  background-color: #f3f0f5;
  border-radius: 15px;
  color: #000;
  font-size: 15px;
  font-weight: 700;
  padding: 1%;
  text-align: center;
  margin-right: 40%;
  margin-top: 1%;
  margin-bottom: 4%;
`;


function Chatting(props) {

  const messages = props.value;
  const length = messages.length;

  //date 값 변경 확인
  const handleChangeDate = (chatId) => {
    if(chatId===1) {
      return true;
    } else {
      if(messages[chatId-2].date===messages[chatId-1].date) return false;
      else return true;
    }
  }

  //date 값 변경 확인
  const handleChangeTime = (chatId) => { 
    if(chatId===length) {
      return true;
    } else {
      if(messages[chatId].date===messages[chatId-1].date) {
        if(messages[chatId].senderId===messages[chatId-1].senderId) {
          if(messages[chatId].time===messages[chatId-1].time) return false;
        }
      }
    }
    return true;
  }

    // 페이지 스크롤 맨 아래로 이동
    const scrollRef = useRef();
    const [msgArr, setMsgArr] = useState([]);

    useEffect(()=>{
      setMsgArr(messages);
    }, [messages]);
    useEffect(()=>{
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [msgArr]);

    return (
        <Chat ref={scrollRef}>
          {msgArr.map((message) => (
            <Container className="full" key={message.chatId}>
              {handleChangeDate(message.chatId) && <Date>{message.date}</Date>}
              <Container isuser={message.senderId === 1 ? true : false}>
                <Bubble isuser={message.senderId === 1 ? true : false}>
                  {(message.message!==null)?message.message:<Image src={testImg} alt="전송이미지" />}
                </Bubble>
                {handleChangeTime(message.chatId) && <Time>{message.time}</Time>}
              </Container>
          </Container>
        ))}
      </Chat>
    );    
} 

export default Chatting;