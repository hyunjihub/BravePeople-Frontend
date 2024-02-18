import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import profile from "../../common/resources/img/profile.png";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Content = styled.div`
    width: 30%;
    height: 65%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 18px;
    border : 2px dashed #F3D7CA;
    background-color: #FCF5ED;
    padding: 1%;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
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
    background-color: rgba(255, 255, 255, 0.5);
`;

const Review = styled.div`
    height: 25%;
    border: 2px solid #f8332f;
    width: 100%;
    box-sizing: border-box;
    padding: 16px 24px;
    font-family: 'SUITE';
    font-size: 15px;
    border-radius: 15px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    hyphens: auto;
    margin-bottom: 5%;
`;

const Button = styled.button`
    width: 40%;
    height: 7%;
    background-color: #f8332f;
    font-family: 'SUITE';
    font-size: 15px;
    color: #fff;
    border: none;
    border-radius: 15px;
    margin: 3% 5%;
    cursor: pointer;

    &:hover {
        background-color: #ff8f8f;
    }
`;

const Profile = styled.div`
    width: 22%;
    height: 20%;
    border-radius : 50%;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    background-position: center;
    margin-bottom: 2%;
`;

const Nickname = styled.div`
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1%;
`;

const Detail = styled.div`
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    color: #808080;
    margin-bottom: 3%;

    &.important {
        font-size: 20px;
        color: #f8332f;
        font-weight: 700;
        margin-bottom: 10%;
    }
`;

const RatingContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5%;
`;

function DetailReview(props) {

    const reviewCancel = () => {
        props.setModal(false);
    }

    return (
        <Background>
            <Content>
                <Profile style={{backgroundImage: `url(${profile})`}}/>
                <Nickname>닉네임</Nickname>
                <Detail>닉네임님이 남겨주신 리뷰입니다!</Detail>
                <RatingContainer>
                    <FaStar color="#ffbe04" size="40" />
                    <FaStar color="#ffbe04" size="40" />
                    <FaStar color="#ffbe04" size="40" />
                    <FaStar color="#ffbe04" size="40" />
                    <FaStar color="#ffbe04" size="40" />
                </RatingContainer>
                
                <Review>후기 들어가는 부분</Review>
                <Button onClick={reviewCancel}>후기 닫기</Button>
                
            </Content>
        </Background>
        
    );
}

export default DetailReview;