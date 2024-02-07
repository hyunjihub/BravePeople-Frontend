import styled from "styled-components";
import React, { useEffect, useRef } from "react";
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

  const navigate = useNavigate();

  // 더미 데이터
  const list = [
    {
      roomId: 1,
      memberId: 1,
      nickname: 'User 1',
      lastChat: '마지막으로 친 채팅이오',
      lastSendAt: '오후 3:30',
      isRead: true,
      status: "대기/진행",
    },
    {
      roomId: 2,
      memberId: 2,
      nickname: 'User 2',
      lastChat: '안녕안녕안녕',
      lastSendAt: '오후 12:45',
      isRead: false,
      status: "완료/취소",
    },
    {
      roomId: 3,
      memberId: 3,
      nickname: 'User 3',
      lastChat: 'wish I could stay awhile I have all the old pictures of you I knew you would come around again you miss the young us like before, you are so naive you never believed me and what I said now you are saying I was so right then you are so lonely now',
      lastSendAt: '2월 6일',
      isRead: true,
      status: "대기/진행",
    },
    {
      roomId: 4,
      memberId: 4,
      nickname: 'User 4',
      lastChat: '처음부터 달랐어 불길하게 달콤한 느낌 이미 난 흔들렸어 내 맘대로 되는 게 없어서 싫은데 좋아',
      lastSendAt: '1월 30일',
      isRead: false,
      status: "완료/취소",
    },
    {
      roomId: 5,
      memberId: 5,
      nickname: 'User 5',
      lastChat: '마치 된 것 같아 손오공',
      lastSendAt: '12월 30일',
      isRead: false,
      status: "완료/취소",
    },
    {
      roomId: 6,
      memberId: 6,
      nickname: 'User 6',
      lastChat: '힘을 다하고 쓰러져도 포기를 모르고 날뛰는 중',
      lastSendAt: '12월 30일',
      isRead: true,
      status: "완료/취소",
    },
    {
      roomId: 7,
      memberId: 7,
      nickname: 'User 7',
      lastChat: 'So I guess Now Ive got to go',
      lastSendAt: '12월 30일',
      isRead: false,
      status: "완료/취소",
    },
    {
      roomId: 8,
      memberId: 8,
      nickname: 'User 8',
      lastChat: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16',
      lastSendAt: '12월 30일',
      isRead: false,
      status: "대기/진행",
    },
    {
      roomId: 9,
      memberId: 9,
      nickname: 'User 9',
      lastChat: '마치 된 것 같아 손오공',
      lastSendAt: '12월 30일',
      isRead: false,
      status: "완료/취소",
    },
    {
      roomId: 10,
      memberId: 10,
      nickname: 'User 10',
      lastChat: '마치 된 것 같아 손오공',
      lastSendAt: '12월 30일',
      isRead: true,
      status: "완료/취소",
    },
  ];

  //글자수 over시 ...처리
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  //클릭시 프로필 페이지 이동 오류방지 위해 주석처리 함
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

  

  return (
      <Chat>
        {list.map((list) => (
          props.value === list.status && 
          (<Container key={list.roomId}>
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