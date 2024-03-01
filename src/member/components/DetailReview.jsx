import styled from "styled-components";
import React from "react";
import profile from "../../common/resources/img/profile.png";

import Rating from "./Rating";

const Content = styled.div`
    width: 600px;
    height: 600px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 18px;
    border : 2px dashed #F3D7CA;
    background-color: #FFF;
    padding: 1%;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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
    margin-bottom: 1%;
`;

const RatingScore = styled.div`
    font-size: 15px;
    text-align: center;
    margin-bottom: 5%;
`;

function DetailReview(props) {

    const reviewCancel = () => {
        props.setModal(false);
    }

    return (
        <Background>
            <Content>
                <Profile style={{backgroundImage: `url(${(props.reviews.profileImg === null) ? profile : props.reviews.profileImg})`}}/>
                <Nickname>{props.reviews.nickName}</Nickname>
                <Detail>{props.reviews.nickName}님이 남겨주신 리뷰입니다!</Detail>
                <RatingContainer>
                    <Rating value={props.reviews.score} size="40"></Rating>
                </RatingContainer>
                <RatingScore>{props.reviews.score}/5 점</RatingScore>
                <Review>{(props.reviews.content===null || props.reviews.content==="")?"내용을 입력하지 않은 후기입니다.":props.reviews.content}</Review>
                <Button onClick={reviewCancel}>후기 닫기</Button>
            </Content>
        </Background>
        
    );
}

export default DetailReview;