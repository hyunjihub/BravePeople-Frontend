import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import testImg from "../resources/testImg.jpg";

const Bubble = styled.div`
  max-width: 50%;
  color: ${({ isUser }) => (isUser ? '#fff' : '#000')};
  font-size: 15px;
  background-color: ${({ isUser }) => (isUser ? '#f8332f' : '#f3f0f5')};
  margin: 1% 3%;
  border-radius: 15px;
  padding: 2%;
`;

const Time = styled.div`
  color : #808080;
  font-size: 12px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: ${({ isUser }) => (isUser ? 'row-reverse' : 'row')};
  float: ${({ isUser }) => (isUser ? 'right' : 'left')};
  clear: both;
  width: 100%;
  margin: 1%;
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

    const messages = [
        { chatId: 1, senderId: 1, message: '안녕하세요!', date: '2월 7일', time: '오후 3:00', img: null },
        { chatId: 2, senderId: 2, message: '안녕하세요!', date: '2월 7일', time: '오후 3:01', img: null },
        { chatId: 3, senderId: 1, message: '의뢰가능할까요?', date: '2월 7일', time: '오후 3:01', img: null },
        { chatId: 4, senderId: 2, message: '네', date: '2월 7일', time: '오후 3:02', img: null },
        { chatId: 5, senderId: 1, message: '의뢰가능할까요?', date: '2월 8일', time: '오후 3:02', img: null },
        { chatId: 6, senderId: 1, message: 'wish I could stay awhile I have all the old pictures of you I knew you would come around again you miss the young us like before, you are so naive you never believed me and what I said now you are saying I was so right then you are so lonely now', date: '2월 8일', time: '오후 3:02', img: null },
        { chatId: 7, senderId: 1, message: '의뢰가능할까요?', date: '2월 8일', time: '오후 3:02', img: null },
        { chatId: 8, senderId: 1, message: '의뢰가능할까요?', date: '2월 8일', time: '오후 3:02', img: null },
        { chatId: 9, senderId: 1, message: null, date: '2월 9일', time: '오후 3:02', img: testImg },
        { chatId: 10, senderId: 1, message: '두줄이상작성해보는테스트두줄이상작성해보는테스트두줄이상작성해보는테스트두줄이상작성해보는테스트두줄이상작성해보는테스트두줄이상작성해보는테스트', date: '2월 9일', time: '오후 3:02', img: null },
    ];

    const handleChangeDate = (chatId) => {
      if(chatId===1) {
        return true;
      } else {
        if(messages[chatId-2].date===messages[chatId-1].date) return false;
        else return true;
      }
    }

    // 페이지 스크롤 맨 아래로 이동
    const scrollRef = useRef();
    const [msgArr, setMsgArr] = useState([]);

    useEffect(()=>{
      setMsgArr(messages);
    });

    useEffect(()=>{
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    },[msgArr]);

    return (
        <Chat ref={scrollRef}>
          {msgArr.map((message) => (
            <Container className="full" key={message.chatId}>
              {handleChangeDate(message.chatId) && <Date>{message.date}</Date>}
              <Container isUser={message.senderId === 1}>
                <Bubble isUser={message.senderId === 1}>
                  {(message.message!==null)?message.message:<Image src={testImg} alt="전송이미지" />}
                </Bubble>
                <Time>{message.time}</Time>
              </Container>
            </Container>
          ))}
        </Chat>
      );   
} 

export default Chatting;