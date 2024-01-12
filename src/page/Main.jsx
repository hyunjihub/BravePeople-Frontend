import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;


const Button = styled.button`
    background-color: white;
    color: black;
    border: 1px solid #000;
    width: 150px;
    height: 50px;
    margin-bottom: 10px;
    cursor: pointer;
`;

function Main(props) {

    const navigate = useNavigate();


    return(
        <Wrapper>
            <Button onClick={()=>{navigate("/chat");}}>채팅 페이지로</Button>
            <Button onClick={()=>{navigate("/findId");}}>아이디 찾기 페이지로</Button>
            <Button onClick={()=>{navigate("/logIn");}}>로그인 페이지로</Button>
            <Button onClick={()=>{navigate("/myPage");}}>마이페이지 페이지로</Button>
            <Button onClick={()=>{navigate("/resetPw");}}>비밀번호 재설정 페이지로</Button>
            <Button onClick={()=>{navigate("/signUp");}}>회원가입 페이지로</Button>
            <Button onClick={()=>{navigate("/viewPost");}}>게시글 보기 페이지로</Button>
            <Button onClick={()=>{navigate("/writePost");}}>게시글 작성 페이지로</Button>
        </Wrapper>
    );
}

export default Main;