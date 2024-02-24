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
import logo from "../../header/resources/img/logo.png";
import hero_w from "../resources/img/hero_woman.png";
import hero_b from "../resources/img/hero_man.png";
import ScrollReveal from 'scrollreveal';

import { FaMedal } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const Wrapper = styled.div`
  width: 100%;
  min-width: 1600px;
  height: 4500px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
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
    margin: 0 20% 20%;

    &:hover {
        background-color: #ff8f8f;
    }

    &.chapter {
        width: 38%;
        float: left;
        margin-bottom: 2%;
        letter-spacing: 0.2em;
        margin-left: 1%;
        margin-right: 1%;
        padding-left: 4%
    }
`;

const Landing = styled.div`
    width: 100%;
    height: 55%;
    background-color: #FFF7F1;
    position: relative;

    &.introduction{
        background-color: #fff;
        transition: opacity 0.5s ease-in-out;
    }
`;

const MainTxt = styled.div`
    width: 60%;
    height: 20%;
    font-size: 65px;
    font-weight: 900;
    text-align : left;
    margin: 15% auto 1%;
`;

const RevealTxt = styled.div`
    width: 70%;
    height: 18%;
    font-size: 60px;
    font-weight: 900;
    text-align : center;
    margin: 4% auto 1%;

    &.chapter {
        width: 100%;
        height: 17%;
        font-size: 55px;
        text-align : left;
        margin: 25% auto 4%;
    }

    &.chat {
        width: 100%;
        height: 30%;
        font-size: 50px;
        margin-right: 10%;
        margin-bottom: 2%;
        margin-top: 0%;
    }
`;

const DetailTxt = styled.div`
    font-size: 20px;
    font-weight: 400;
    margin: 1% auto 5%;
    text-align : center;

    &.chapter {
        text-align : left;
        margin-left: 1%;
    }

    &.chat {
        text-align : center;
        margin-bottom: 2%;
    }
`;

const CircleBox = styled.div`
    width: 75%;
    height: 30%;
    display: flex;
    flex-direction: row;
    margin: 7% auto 10%;
    box-sizing: border-box;
`;

const Circle = styled.div`
    width: 18%;
    height: 90%;
    border-radius: 50%;
    background-color: #FFF7F1;
    margin: auto;
    padding-bottom: 2%;
`;

const Square = styled.div`
    width: 30%;
    height: 100%;
    border-radius: 18px;
    width: 22%;
    height: 35%;
    background-color: #f8332f;
    margin: 0 auto 0 0;
`;

const SquareBox = styled.div`
    width: 70%;
    height: 35%;
    display: flex;
    flex-direction: row;
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
  width: 45%;

  &.chat {
    width: 30%;
  }
`;

const LandingContainer = styled.div`
  width: 70%;
  height: 75%;
  display: flex;
  flex-direction: row;
  margin: 10% auto;

  &.column {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 8% auto;
  }
`;

const DetailContainer = styled.div`
  width: 60%;
  margin-left: 8%;
  display: flex;
  flex-direction: column;

  &.row {
    display: flex;
    flex-direction: row;
  }

  &.chat {
    margin-left: 0%;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 2.5%;
  background-color: #fff;
`;

const Footer = styled.div`
  width: 45%;
  height: 85%;
  margin: 2% auto 2%;
  box-sizing: border-box;
`;

const ChatIcon = styled.div`
  width: 100%;
  margin-left: 14%;
  margin-top: 14%;
`;

const FooterContainer = styled.div`
  width: 90%
  height: 95%;
  display: flex;
  flex-direction: row;
`;

const Made = styled.div`
  font-size: 15px;
  color: #000;

  &.bold {
    font-weight: 700;
  }
`;

const MadeBox = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 4%;

  &.row {
    width: 100%;
    flex-direction: row;
    margin-left: 0%;

  }
`;

const Logo = styled.img`
  width: 18%;
  height: 10%;
`;

const Git = styled.div`
  width: 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Source = styled.a`
  text-decoration-line: none;
  color: #000;
  font-size: 15px;

  &.git {
    font-weight: 700;
    font-size: 17px;
  }
`;

const MainImg = styled.img`
  width: 30%;
  position: absolute;
  top: 170px;
  left: 1000px;
  opacity: 0.8;

  &.boy {
    top: 250px;
    left: 1150px;
  }
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  &.left {
    margin-left: 5%;
  }
`;

function Main(props) {

    const navigate = useNavigate();

    const revealRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const detailRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const circleRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '20px',
    };

    useEffect(() => {
      revealRefs.forEach((ref, index) => {
          ScrollReveal().reveal(ref.current, {
              delay: 200 * index,
              origin: 'bottom',
              distance: '100px',
              duration: 900,
              easing: 'ease-out', 
              reset: true,
          });
      });

      detailRefs.forEach((ref, index) => {
          ScrollReveal().reveal(ref.current, {
              delay: 250 * index,
              origin: 'bottom',
              distance: '100px',
              duration: 900,
              easing: 'ease-out', 
              reset: true,
          });
      });

      circleRefs.forEach((ref, index) => {
          ScrollReveal().reveal(ref.current, {
              delay: 250 * index,
              origin: 'bottom',
              distance: '100px',
              duration: 900,
              easing: 'ease-out', 
              reset: true,
          });
      });
  }, []);

      return(
        <Wrapper>
            <CustomSlider {...settings}>
                <Landing>
                  <MainImg src={hero_w} alt="원정대"/>
                  <MainContainer className="left">
                    <MainTxt>도움이 필요한 <br />이웃들에게 <br /> 용감한 원정대가 <br />되어주세요!</MainTxt>
                    <Button onClick={()=>navigate("/notice")}>원정대 시작하기</Button>
                  </MainContainer>
                </Landing>
                <Landing>
                  <MainImg className="boy" src={hero_b} alt="원정대"/>
                  <MainContainer>
                    <MainTxt>도움이 필요하다면 <br /> 용감한 원정대를 불러주세요!</MainTxt>
                    <Button onClick={()=>navigate("/login")}>의뢰인 시작하기</Button>
                  </MainContainer>
                </Landing>
            </CustomSlider>
            
            <Landing className="introduction" ref={revealRefs[0]}>
                <RevealTxt>용감한원정대</RevealTxt>
                <DetailTxt ref={detailRefs[0]}>용감한 원정대에서는 일상의 사소하지만 꼭 필요한 일들을 내 근처 '원정대'에게 부탁할 수 있습니다. <br />
                의뢰인이 되어 부탁을 들어줄 원정대를 찾을 수도 있고, 원정대가 되어 도움이 필요한 의뢰인을 찾을 수도 있습니다. <br />
                무서운 벌레 잡기, 불편한 전화 걸기, 어려운 환불 등 일상 속의 어려운 일들을 속 시원하게 해결해 보세요!</DetailTxt>
                <CircleBox ref={circleRefs[0]}>
                    <Circle><Icon src={bug} alt="벌레 잡기"/></Circle>
                    <Circle><Icon src={call} alt="대신 전화"/></Circle>
                    <Circle><Icon src={money_back} alt="대신 환불"/></Circle>
                    <Circle><Icon src={etc} alt="기타"/></Circle>
                </CircleBox>
            </Landing>
            <Landing ref={revealRefs[1]}>
                <LandingContainer>
                    <Image src={temp} alt="게시판" ref={detailRefs[1]}/>
                    <DetailContainer ref={circleRefs[1]}>
                        <RevealTxt className="chapter">이웃들과 손쉽게<br />도움을 주고 받기!</RevealTxt>
                        <DetailTxt className="chapter">도움이 필요할 땐, 의뢰인!<br />도움을 주고싶을 땐, 원정대!<br />내 근처의 게시글만 볼 수 있어 더욱 편리해요.</DetailTxt>
                        <ButtonContainer>
                             <Button className="chapter" onClick={()=>navigate("/postlist/helping")}>원정대 게시글</Button>
                            <Button className="chapter" onClick={()=>navigate("/postlist/helped")}>의뢰인 게시글</Button>
                        </ButtonContainer>   
                    </DetailContainer>
                </LandingContainer>
                
            </Landing>
            <Landing className="introduction" ref={revealRefs[2]}>
                <LandingContainer className="column" ref={detailRefs[2]}>
                    <DetailContainer className="chat">
                        <RevealTxt className="chat">채팅으로 빠르고 편리하게 의뢰해요!</RevealTxt>
                        <DetailTxt className="chat">실시간 채팅과 알림으로 간단하게 의뢰를 진행할 수 있어요!</DetailTxt>
                    </DetailContainer>
                    <Image className="chat" src={temp} alt="채팅" />
                </LandingContainer>
            </Landing>
            <Landing ref={revealRefs[3]}>
                <LandingContainer>
                    <Image src={temp} alt="마이페이지" ref={detailRefs[3]} />
                    <DetailContainer ref={circleRefs[3]}>
                        <RevealTxt className="chapter">믿음직한 원정대를 찾아<br /> 안전하게 의뢰해요!</RevealTxt>
                        <DetailTxt className="chapter">의뢰인은 별점, 뱃지와 후기를 통해<br />신뢰성있는 원정대를 판단할 수 있어요!</DetailTxt>
                        <SquareBox>
                            <Square><ChatIcon><FaMedal size="70" color="#fff" opacity={0.4}/></ChatIcon></Square>
                            <Square><ChatIcon><FaStar size="70" color="#fff" opacity={0.4}/></ChatIcon></Square>
                            <Square><ChatIcon><MdRateReview size="70" color="#fff" opacity={0.4} /></ChatIcon></Square>
                        </SquareBox>
                    </DetailContainer>
                </LandingContainer>
            </Landing>
            <FooterWrapper>
              <Footer>
                <FooterContainer>
                  <Logo src={logo} alt="로고"/>
                  <MadeBox>
                    <MadeBox className="row">
                        <Made className="bold">Created by&nbsp;&nbsp;</Made>
                        <Made>이름</Made>
                      </MadeBox>
                      <MadeBox className="row">
                        <Made className="bold">Contact Us&nbsp;&nbsp;</Made>
                        <Made>brave.knu@gmail.com</Made>
                      </MadeBox>
                      <MadeBox className="row">
                        <Made className="bold">Source&nbsp;&nbsp;</Made>
                        <Source href="https://www.flaticon.com/kr/free-icons/-" title="아이콘">alkhalifi design & Freepik - Flaticon</Source>
                        <Made>&nbsp;외 react-icons</Made>
                      </MadeBox>
                  </MadeBox>
                  <Git>
                     <FaGithub size="35" onClick={() => window.location.href = "https://github.com/kimjiyooniiiii/BravePeople-Backend"}/>
                     <Source className="git" href="https://github.com/kimjiyooniiiii/BravePeople-Backend" title="backend">Backend</Source>
                  </Git>
                  <Git>
                     <FaGithub size="35" onClick={() => window.location.href = "https://github.com/hyunjihub/react_test"}/>
                     <Source className="git" href="https://github.com/hyunjihub/react_test" title="backend">Frontend</Source>
                  </Git>
                </FooterContainer>
              </Footer>
            </FooterWrapper>
        </Wrapper>
    );
}

export default Main;