import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const Button = styled.button`
    background-color: white;
    color: black;
    border: 1px solid #000;
    width: 150px;
    height: 50px;
    margin-top: 100px;
    margin-left: 20px;
    cursor: pointer;
    font-family: 'SUITE';
`;

function Main(props) {

    const navigate = useNavigate();


    return(
        <Wrapper>
            <p />
            <Button onClick={()=>{navigate("/mypage");}}>마이페이지 페이지로</Button>
            <Button onClick={()=>{navigate("/viewpost");}}>게시글 보기 페이지로</Button>
            <Button onClick={()=>{navigate("/writepost");}}>게시글 작성 페이지로</Button>
            <Button onClick={()=>{navigate("/error");}}>잘못된 404 페이지로</Button>
        </Wrapper>
    );
}

export default Main;