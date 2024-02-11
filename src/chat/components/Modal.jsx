import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";

const Content = styled.div`
    width: 65%;
    height: 90%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

const ImageWrapper = styled.div`
    width: 80%;
    max-height: 70%;
    margin: 2% auto 2%;
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

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Button = styled.button`
    width: 13%;
    padding: 1% 0%;
    color: #fff;
    font-family: 'SUITE';
    margin: 2% auto 0;
    font-size: 130%;
    border: none;
    background-color: #f8332f;
    border-radius: 15px;
    cursor: pointer;
`;

const Background = styled.div`
    width: 100%;
    height: 120%;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 999999;
    position: fixed;
    top: 0%;
    left: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`;

function Modal(props) {

    const close = () => {
        props.setModal(false);
        props.setImg(null);
    }

    return (
        <Background>
                <Content>
                    <ImageWrapper>
                        <Image src={props.img} alt="선택한 이미지" />
                    </ImageWrapper>
                    <Button onClick={close}>닫기</Button>
                </Content>
        </Background>
        
    );
}

export default Modal;