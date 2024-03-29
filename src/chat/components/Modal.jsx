import styled from "styled-components";
import React from "react";

const Content = styled.div`
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

const ImageWrapper = styled.div`
    width: 60%;
    max-height: 70%;
    margin: 5% auto 2%;
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
    height: 100%;
    z-index: 1000;
    position: fixed;
    top: -15%;
    left: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6%;
    background-color: rgba(255, 255, 255, 0.7);
    overflow-y : auto;
`;

function Modal(props) {

    const close = () => {
        props.setModalOpen(false);
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