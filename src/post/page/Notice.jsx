import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Wrapper = styled.div`
    width: 50%;
    height: 750px;
    margin: 15px auto;
    position: relative;
`;

const Title = styled.div`
    width: 100%;
    height: 5%;
    line-height: 1.5;
    font-size: 40px;
    font-weight: 800;
    text-align: center;
    font-family: 'SUITE';
    margin: 50px 0 50px;
`;

const Line = styled.hr`
    color: #d1d1d1;
    opacity: 0.5;
    margin: 2.5% 0;
`;

const TitleBox = styled.div`
    width: 90%;
    height: 4%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 4.5% 5% 4.5%;
`;

const ContentTitle = styled.div`
    width: 93%;
    font-size: 150%;
    font-weight: 800;
    margin-right: 2%;
`;

const Category = styled.div`
    width: 9%;
    height: 100%;
    background-color: #f8332f;
    border-radius: 15px;
    color: #fff;
    font-size: 18px;
    margin-right: 2%;
    text-align: center;
    box-sizing: border-box;
    padding: 3px 0px 0px 0px;
`;

const Content = styled.div`
    width: 90%;
    color: #000;
    margin: auto;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;
    hyphens: auto; 
    min-height: 30%;
    padding-bottom: 10%;
    white-space: pre-wrap;
`;

function Notice(props) {
    return(
        <Wrapper>
            <Title>공지사항</Title>
            <Line />
            <TitleBox>
                <Category>방법</Category>
                <ContentTitle>용감한 원정대 쉽게 활용하기!</ContentTitle>
            </TitleBox>
            <Line />
            <Content>
                용감한 원정대는
            </Content>
            <Content>
                원정대 이용 방법
            </Content>
            <Content>
                의뢰인 이용 방법
            </Content>
            <Content>
                의뢰 상태
            </Content>
        </Wrapper>
    );
}

export default Notice;