import styled from "styled-components";
import React from "react";

const Bubble = styled.div`
  max-width: 60%;
  color: ${({ isUser }) => (isUser ? '#fff' : '#000')};
  font-size: 15px;
  background-color: ${({ isUser }) => (isUser ? '#f8332f' : '#f3f0f5')};
  margin: 2% 3%;
  border-radius: 15px;
  padding: 2.5%;
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
  min-width: 50%;
  margin: 1%;
  align-items: flex-end;
  overflow-y: auto;
`;

const Chat = styled.div`
  margin: 2% 0;
  scrollY: auto;
`;

function Chatting(props) {

    const messages = [
        { sender: 'Alice', text: '안녕하세요!', time: '오후 3:00' },
        { sender: 'Bob', text: '안녕하세요!', time: '오후 3:01' },
        { sender: 'Alice', text: '의뢰가능할까요?', time: '오후 3:01' },
        { sender: 'Bob', text: '네', time: '오후 3:02' },
        { sender: 'Alice', text: '의뢰가능할까요?', time: '오후 3:02' },
        { sender: 'Alice', text: '의뢰가능할까요?', time: '오후 3:02' },
        { sender: 'Alice', text: '의뢰가능할까요?', time: '오후 3:02' },
        { sender: 'Alice', text: '의뢰가능할까요?', time: '오후 3:02' },
        { sender: 'Alice', text: '의뢰가능할까요?', time: '오후 3:02' },
        { sender: 'Alice', text: '두줄이상작성해보는테스트두줄이상작성해보는테스트두줄이상작성해보는테스트두줄이상작성해보는테스트두줄이상작성해보는테스트두줄이상작성해보는테스트', time: '오후 3:02' },
    ];

    return (
        <Chat>
          {messages.map((message, index) => (
            <Container key={index} isUser={message.sender === 'Alice'}>
                <Bubble isUser={message.sender === 'Alice'}>
                  {message.text}
                </Bubble>
                <Time>{message.time}</Time>
            </Container>
          ))}
        </Chat>
      );   
} 

export default Chatting;