import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";

const Container = styled.div`
    position: fixed;
    top: 20%;
    left: 30%;
    width: 40%;
    height: 65%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    border-radius: 15px;
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 0, .2);
    overflow-y : auto;
    &::-webkit-scrollbar {
        width: 7px;
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

const Content = styled.div`
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 5%;
    box-sizing: border-box;
`;

const Image = styled.img`
    width: 80%;
    margin: 10% auto 2%;
`;

const Button = styled.button`
    width: 10%;
    color: #fff;
    font-family: 'SUITE';
    margin: 2% auto 0;
    font-size: 18px;
    border: none;
    background-color: #f8332f;
    border-radius: 15px;
    cursor: pointer;
`;

function Modal(props) {

    const close = () => {
        props.setModal(false);
        props.setImg(null);
    }

    return (
        <Container>
            <Content>
                <Image src={props.img} alt="선택한 이미지" />
                <Button onClick={close}>닫기</Button>
            </Content>
        </Container>
    );
}

export default Modal;