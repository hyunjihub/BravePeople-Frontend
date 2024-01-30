import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";


const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
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

const MainLanding = styled.div`
    width: 100%;
    height: 80%;
    background-color: #fbc6c2;
`;

const MainTxt = styled.div`
    width: 60%;
    height: 40%;
    font-size: 60px;
    font-weight: 900;
    text-align : center;
    margin: 10% auto;
`;

function Main(props) {

    const navigate = useNavigate();


    return(
        <Wrapper>
            <MainLanding>
                <MainTxt>메인으로 들어갈 문구 <br /> 흥미로운 문구로 보이는 문구</MainTxt>
            </MainLanding>
        </Wrapper>
    );
}

export default Main;