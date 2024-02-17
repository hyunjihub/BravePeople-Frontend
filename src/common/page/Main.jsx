import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
    width: 100vw;
    height: 1000vh;
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
    margin: 0 auto 12%;
`;

const Landing = styled.div`
    width: 100%;
    height: 8%;
    background-color: #dee2e6;

    &.introduction{
        background-color: #fff;
    }
`;

const MainTxt = styled.div`
    width: 60%;
    height: 20%;
    font-size: 60px;
    font-weight: 900;
    text-align : center;
    margin: 10% auto 1%;

    &.introduction{
        height: 10%;
        margin: 5% auto 0;
    }
`;

const DetailTxt = styled.div`
    font-size: 20px;
    font-weight: 400;
    margin: 1% auto 5%;
    text-align : center;
`;

const CircleBox = styled.div`
    width: 70%;
    height: 30%;
    display: flex;
    flex-direction: row;
    margin: auto;
`;

const Circle = styled.div`
    width: 17%;
    height: 100%;
    border-radius: 50%;
    background-color: #dee2e6;
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


function Main(props) {

    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '20px',
    };

    return(
        <Wrapper>
            <CustomSlider {...settings}>
                <Landing>
                    <MainTxt>도움이 필요한 이웃에게 <br /> 용감한 원정대가 되어주세요!</MainTxt>
                    <Button>원정대 시작하기</Button>
                </Landing>
                <Landing>
                    <MainTxt>도움이 필요하다면 <br /> 용감한 원정대를 불러주세요!</MainTxt>
                    <Button>의뢰인 시작하기</Button>
                </Landing>
            </CustomSlider>
            
            <Landing className="introduction">
                <MainTxt className="introduction">용감한원정대</MainTxt>
                <DetailTxt>용감한 원정대는 일상의 사소하지만 꼭 필요한 일들을 내 근처 '원정대'에게 부탁할 수 있습니다. <br />
                용감한 원정대 설명 문구 용감한 원정대 설명 문구 용감한 원정대 설명 문구 용감한 원정대 설명 문구 <br />
                용감한 원정대 설명 문구 용감한 원정대 설명 문구 용감한 원정대 설명 문구</DetailTxt>
                <CircleBox>
                    <Circle></Circle>
                    <Circle></Circle>
                    <Circle></Circle>
                    <Circle></Circle>
                </CircleBox>
                
            </Landing>
            <Landing className="step">랜딩</Landing>
        </Wrapper>
    );
}

export default Main;