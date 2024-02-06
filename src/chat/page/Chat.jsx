import React, { useEffect, useState } from "react";
import styled from "styled-components";
import profile from "../../common/resources/img/profile.png";

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

    const [nowRoomId, setNowRoomId] = useState(null);

    useEffect(()=>{
        const setNowRoom = async() => {
            setNowRoomId(JSON.parse(sessionStorage.getItem('nowRoomId'))); 
        }
        setNowRoom();
        return() => {
            sessionStorage.removeItem('nowRoomId');
        }
    }, []);

    return(
        <Container>
            <div><button onClick={()=>console.log(nowRoomId)}>click</button></div>
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