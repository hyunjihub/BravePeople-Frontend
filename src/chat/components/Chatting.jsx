import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";

import { shallowEqual, useSelector } from "react-redux";

const Bubble = styled.div`
  max-width: 50%;
  color: #000;
  font-size: 15px;
  background-color: #f3f0f5;
  margin: 0% 2% 0% 5%;
  border-radius: 15px;
  padding: 2%;
  position: relative; 
  white-space: pre-line;

  &.sender {
    color: #fff;
    background-color: #f8332f;
    margin: 0% 5% 0% 2%;
    z-index: 0;
  }

`;

const Tail = styled.div`
  border-top: 15px solid #f3f0f5;
  border-left: 15px solid transparent;
  content: "";
  position: absolute;
  top: 10px;
  left: -12px;

  &.sender {
    border-top: 15px solid #f8332f;
    border-right: 15px solid transparent;
    right: -12px;
    left: 0;
    z-index: -2;
  }
`;

const Time = styled.div`
  color : #808080;
  font-size: 12px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  float: left;
  clear: both;
  width: 100%;
  margin: 0.5%;
  align-items: flex-end;

  &.full {
    flex-direction: column;
  }

  &.sender {
    flex-direction: row-reverse;
    float: right;
  }
`;

const Chat = styled.div`
  width: 100%;
  height: 100%;
  margin: 2% 0;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb {
      background: #C7C8CC;
      border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb:hover {
      background: #f8322f; 
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
  margin-bottom: 3%;
`;

const System = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: #808080;
  margin-top: 1%;
  margin-bottom: 1%;
`;


function Chatting(props) {

  // redux로 변수, 함수 가져오기
  const { isLog, id } = useSelector((state)=>({
    isLog: state.login.isLogin,
    id: state.login.memberId,
  }), shallowEqual);

  const messages = props.value;

  //date 값 변경 확인
  const handleChangeDate = (index) => {
    if (index < messages.length) {
      if (index === 0) {
        return true;
      } else {
        if (messages[index].date === messages[index - 1].date) return false;
        else return true;
      }
    }
    return false;
  }

  //date 값 변경 확인
  const handleChangeTime = (index) => { 
    if (index < messages.length) {
      if(index===messages.length-1) {
      return true;
      } else {
        if(messages[index].date===messages[index+1].date) {
          if(messages[index].senderId===messages[index+1].senderId) {
            if(messages[index].time===messages[index+1].time) return false;
          }
        }
      }
      return true;
    }
    
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

    // 사진 클릭 시 확대
    const handleExpand = (img) => {
      props.setModal(true);
      props.setImg(img);
    }
  

    return (
      <Chat ref={scrollRef}>
        {msgArr.map((message, index) => {
          return (
            <Container className="full" key={index}>
              {handleChangeDate(index) && <Date>{message.date}</Date>}
              {(String(message.senderId) === id)?<Container className="sender">
                <Bubble className="sender">
                  <Tail className="sender"/>
                    {message.message !== null ? message.message : <Image onClick={() => handleExpand(message.img)} src={message.img} alt="전송이미지" />}
                  </Bubble>
                  {handleChangeTime(index) && <Time>{message.time}</Time>}
              </Container>:(message.senderId === -1)?<System>{message.message}</System>:<Container>
                <Bubble>
                    <Tail/>
                    {message.message !== null ? message.message : <Image onClick={() => handleExpand(message.img)} src={message.img} alt="전송이미지" />}
                  </Bubble>
                  {handleChangeTime(index) && <Time>{message.time}</Time>}
              </Container>}
            </Container>
          );
        })}
      </Chat>
    );   
} 

export default Chatting;