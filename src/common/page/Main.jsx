import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bug from "../resources/img/bug.png";
import call from "../resources/img/call.png";
import money_back from "../resources/img/money_back.png";
import etc from "../resources/img/etc.png";
import temp from "../resources/img/temp.png";
import ScrollReveal from 'scrollreveal';

const Wrapper = styled.div`
    width: 100vw;
    height: 700vh;
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    display: block;
    border: none;
    background-color: #f8332f;
    opacity: 0.8;
    border-radius: 18px;
    color: #fff;
    width: 20%;
    box-sizing: border-box;
    padding: 15px;
    font-size: 20px;
    font-weight: 800;
    letter-spacing:0.5em;
    font-family: 'SUITE';
    margin: 0 auto 20%;

    &:hover {
        background-color: #ff8f8f;
    }
`;

const Landing = styled.div`
    width: 100%;
    height: 15%;
    background-color: #FFF7F1;

    &.introduction{
        background-color: #fff;
        transition: opacity 0.5s ease-in-out;
    }
`;

const MainTxt = styled.div`
    width: 60%;
    height: 20%;
    font-size: 60px;
    font-weight: 900;
    text-align : center;
    margin: 15% auto 1%;
`;

const RevealTxt = styled.div`
    width: 60%;
    height: 8%;
    font-size: 60px;
    font-weight: 900;
    text-align : center;
    margin: 4% auto 1%;

    &.chapter {
        width: 90%;
        height: 20%;
        font-size: 50px;
        text-align : left;
        margin: 25% auto 1%;
    }
`;

const DetailTxt = styled.div`
    font-size: 20px;
    font-weight: 400;
    margin: 1% auto 5%;
    text-align : center;

    &.chapter {
        font-size: 18px;
        text-align : left;
        margin-left: 6%;
    }
`;

const CircleBox = styled.div`
    width: 80%;
    height: 28%;
    display: flex;
    flex-direction: row;
    margin: 12% auto 0;
`;

const Circle = styled.div`
    width: 18%;
    height: 100%;
    border-radius: 50%;
    background-color: #FFF7F1;
    margin: auto;
`;

const CustomSlider = styled(Slider)`
  .slick-prev,
  .slick-next {
    z-index: 1;
  }

  .slick-prev:before,
  .slick-next:before {
    color: #000;
}
  
  .slick-prev {
    left: 20px;
  }
  
  .slick-next {
    right: 20px;
  }
`;

const Icon = styled.img`
  width: 70%;
  margin-top: 13%;
  margin-left: 15%;
`;

const Image = styled.img`
  width: 50%;
`;

const LandingContainer = styled.div`
  width: 60%;
  height: 60%;
  display: flex;
  flex-direction: row;
  margin: 10% auto;
`;

const DetailContainer = styled.div`
  width: 50%;
  height: 100%;
  margin-left: 10%;
`;


function Main(props) {

    const navigate = useNavigate();
    const revealRef = useRef(null);
    const detailRef = useRef(null);
    const circleRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '20px',
    };

    useEffect(() => {
        ScrollReveal().reveal(revealRef.current, {
          delay: 200,
          origin: 'bottom',
          distance: '100px',
          duration: 1500,
          easing: 'ease-out', 
          reset: true,
        });

        ScrollReveal().reveal(detailRef.current, {
          delay: 400,
          origin: 'bottom',
          distance: '100px',
          duration: 1500,
          easing: 'ease-out', 
          reset: true,
        });

        ScrollReveal().reveal(circleRef.current, {
          delay: 600,
          origin: 'bottom',
          distance: '100px',
          duration: 1500,
          easing: 'ease-out', 
          reset: true,
        });
      }, []);

      return(
        <Wrapper>
            <CustomSlider {...settings}>
                <Landing>
                    <MainTxt>도움이 필요한 이웃에게 <br /> 용감한 원정대가 되어주세요!</MainTxt>
                    <Button onClick={()=>navigate("/login")}>원정대 시작하기</Button>
                </Landing>
                <Landing>
                    <MainTxt>도움이 필요하다면 <br /> 용감한 원정대를 불러주세요!</MainTxt>
                    <Button onClick={()=>navigate("/login")}>의뢰인 시작하기</Button>
                </Landing>
            </CustomSlider>
            
            <Landing className="introduction" ref={revealRef}>
                <RevealTxt>용감한원정대</RevealTxt>
                <DetailTxt ref={detailRef}>용감한 원정대에서는 일상의 사소하지만 꼭 필요한 일들을 내 근처 '원정대'에게 부탁할 수 있습니다. <br />
                의뢰인이 되어 부탁을 들어줄 원정대를 찾을 수도 있고, 원정대가 되어 도움이 필요한 의뢰인을 찾을 수도 있습니다. <br />
                무서운 벌레 잡기, 불편한 전화 걸기, 어려운 환불 등 일상 속의 어려운 일들을 속 시원하게 해결해 보세요!</DetailTxt>
                <CircleBox ref={circleRef}>
                    <Circle><Icon src={bug} alt="벌레 잡기"/></Circle>
                    <Circle><Icon src={call} alt="대신 전화"/></Circle>
                    <Circle><Icon src={money_back} alt="대신 환불"/></Circle>
                    <Circle><Icon src={etc} alt="기타"/></Circle>
                </CircleBox>
            </Landing>
            <Landing>
                <LandingContainer>
                    <Image src={temp} alt="게시판" />
                    <DetailContainer>
                        <RevealTxt className="chapter">이웃들과 손쉽게<br />도움을 주고 받기!</RevealTxt>
                        <DetailTxt className="chapter">이웃들끼리 소통하고 서로 도움을 주고 받으며,<br />따뜻한 지역 사회를 만들어나가요!</DetailTxt>
                    </DetailContainer>
                </LandingContainer>
                
            </Landing>
            <Landing className="introduction">
                <LandingContainer>
                    <Image src={temp} alt="채팅" />
                    <DetailContainer>
                         <RevealTxt className="chapter">채팅으로 빠르고<br /> 편리하게 의뢰해요!</RevealTxt>
                        <DetailTxt className="chapter">실시간 채팅과 알림으로<br />간단하게 의뢰를 진행할 수 있어요!</DetailTxt>
                    </DetailContainer>
                   
                </LandingContainer>
            </Landing>
            <Landing>
                <LandingContainer>
                    <Image src={temp} alt="마이페이지" />
                    <DetailContainer>
                        <RevealTxt className="chapter">신뢰성있는 원정대와<br /> 안전하게 의뢰해요!</RevealTxt>
                        <DetailTxt className="chapter">의뢰인은 별점과 뱃지를 통해<br />신뢰성있는 원정대를 판단할 수 있어요!</DetailTxt>
                    </DetailContainer>
                    
                </LandingContainer>
            </Landing>
        </Wrapper>
    );
}

export default Main;