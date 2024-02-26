import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import bug from "../resources/bug.png";
import call from "../resources/call.png";
import etc from "../resources/etc.png";
import money_back from "../resources/money_back.png";

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
    color: #000;
    margin-left: 5%;
    margin-bottom: 4%;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;
    hyphens: auto; 
    white-space: pre-wrap;
    line-height: 150%;

    &.last {
        min-height: 15%;
    }

    &.small {
        color: #808080;
        font-size: 16px;
    }

    &.bold {
        font-size: 18px;
        font-weight: 700;
    }

    &.nonmargin {
        margin-left: 0;
    }

    &.nonbottom {
        margin-bottom: 0%;
    }
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: row;
`;

const Button = styled.button`
    display: block;
    border: none;
    background-color: #f8332f;
    opacity: 0.8;
    border-radius: 18px;
    color: #fff;
    width: 45%;
    height: 10%;
    box-sizing: border-box;
    padding-left: 2%;
    font-size: 23px;
    font-weight: 800;
    letter-spacing:0.2em;
    font-family: 'SUITE';
    text-algin: center;
    margin: auto;

    &:hover {
        background-color: #ff8f8f;
    }
`;

const Bold = styled.div`
    font-weight: 900;
    font-size: 28px;
    margin-left: 5%;
    margin-bottom: 1%;
    margin-top: 5%;

    &.semi {
        font-weight: 800;
        font-size: 25px;
        margin-top: 0;
    }
`;

const CircleBox = styled.div`
    width: 90%;
    height: 25%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 5%;
    margin-bottom: 5%;
`;

const Circle = styled.div`
    width: 23%;
    border-radius: 50%;
    background-color: #FFF7F1;
    padding-top: 3%;
    box-sizing: border-box;
`;

const Icon = styled.img`
    width: 70%;
    margin-left: 15%;
`;

function Notice(props) {
    const navigate = useNavigate();

    return(
        <Wrapper>
            <Title>이용안내</Title>
            <Line />
            <TitleBox>
                <Category>방법</Category>
                <ContentTitle>용감한 원정대를 이용하는 방법!</ContentTitle>
            </TitleBox>
            <Line />
            <Bold>용감한 원정대는</Bold>
            <Content className="bold">
            무서운 벌레를 대신 잡아줄 사람이 없을 때! 전화공포증이 심해 전화를 하기 겁날 때! 무서워서 환불하지 못하고 있을 때!
            </Content>
            <CircleBox>
                <Circle><Icon src={bug} alt="벌레"/></Circle>
                <Circle><Icon src={call} alt="전화"/></Circle>
                <Circle><Icon src={money_back} alt="환불"/></Circle>
                <Circle><Icon src={etc} alt="기타"/></Circle>
            </CircleBox>
            <Content>
            일상에는 누군가에게는 사소할 수 있지만, 누군가에게는 어려운 문제들이 많습니다. <br />용감한 원정대는 그런 분들을 위해 내 근처 이웃에게 
            부탁할 수 있는 방법을 제시합니다.<br />간편하게 게시글을 올림으로써 누군가에게 원정대가 되어줄 수도 있고, 누군가에게 원정을 요청할 수도 있습니다. <br />
            이웃들과 서로 도움을 주고받으며 더 좋은 사회를 만들어가요!
            </Content>
           
            <Bold>원정대가 되는 방법</Bold>
            <ContentBox>
                <Content>
                원정대는 용감한 원정대의&nbsp;
                </Content>
                <Content className="bold nonmargin">
                “핵심”
                </Content>
                <Content className="nonmargin">
                &nbsp;입니다. 내 근처 이웃들의 어려운 일들을 도와주는 영웅이 되어보시는 건 어떨까요?
                </Content>
            </ContentBox>
            
            <Bold className="semi">1. 의뢰인 찾아가기</Bold>
            <Content>
            1.	의뢰인 게시판에서 여러분이 도와주고 싶은 게시글을 선택합니다.<br />
            2.	게시글 내의 원정가기 버튼을 클릭하여 의뢰인과 채팅을 진행할 수 있습니다.<br />
            3.	의뢰인의 원정 수락 메시지를 받은 후, 원정을 진행합니다.<br />
            4.	원정이 완료되면 채팅방의 “의뢰 완료”를 눌러 의뢰인의 후기를 작성합니다.<br />
            5.	의뢰인도 의뢰 완료를 눌렀다면, 프로필 페이지에 작성한 후기가 등록되고, 원정이 마무리됩니다.
            </Content>
            <Bold className="semi">2. 게시글 작성하기</Bold>
            <Content>
            1.	원정대 게시판에 여러분이 도와주고 싶은 게시글을 작성합니다.<br />
            2.	원정을 원하는 의뢰인이 여러분에게 채팅을 전송합니다.<br />
            3.	의뢰인의 원정을 수락할 경우, “의뢰 수락”을 눌러 원정을 진행합니다.<br />
            4.	원정이 완료되면 “의뢰 완료”를 눌러 의뢰인의 후기를 작성합니다.<br />
            5.	의뢰인도 의뢰 완료를 눌렀다면, 프로필 페이지의 작성한 후기가 등록되고, 원정 횟수가 1회 증가하게 됩니다.<br />
            </Content>
            <Bold>의뢰인이 되는 방법</Bold>
            <Bold className="semi">1. 원정대 찾아가기</Bold>
            <Content>
            1.	원정대 게시판에서 여러분이 도움받고 싶은 게시글을 선택합니다.<br />
            2.	게시글 내의 달려가기 버튼을 클릭하여 원정대와 채팅을 진행할 수 있습니다.<br />
            3.	원정대의 의뢰 수락 메시지를 받은 후, 의뢰를 진행합니다.<br />
            4.	의뢰가 완료되면 채팅방의 “의뢰 완료”를 눌러 원정대의 후기를 작성합니다.<br />
            5.	원정대도 의뢰 완료를 눌렀다면, 프로필 페이지에 작성한 후기가 등록되고, 의뢰가 마무리됩니다.
            </Content>
            <Bold className="semi">2. 게시글 작성하기</Bold>
            <Content className="nonbottom">
            1.	의뢰인 게시판에 여러분이 도움받고 싶은 게시글을 선택합니다.<br />
            2.	원정을 원하는 원정대가 여러분에게 채팅을 전송합니다.<br />
            3.	원정대의 원정을 수락할 경우, 채팅방의 “의뢰 수락”을 눌러 원정을 진행합니다.<br />
            4.	원정이 완료되면 채팅방의 “의뢰 완료”를 눌러 원정대의 후기를 작성합니다.<br />
            5.	원정대도 의뢰 완료를 눌렀다면, 프로필 페이지의 작성한 후기가 등록되고, 게시글이 비활성화됩니다. 원정이 마무리됩니다.
            </Content>
            <Content className="small">
            (※ 비활성화된 게시글 : 게시판에 나타나지 않으며, 프로필 페이지의 작성한 게시글에서만 열람이 가능한 게시글입니다. <br />
            비활성화된 게시글은 게시글 내 달려가기 버튼이 비활성화되며, 게시글의 수정이 불가능합니다.)
            </Content>
            <Bold>의뢰 진행 방법</Bold>
            <ContentBox>
                <Content>의뢰는 </Content>
                <Content className="bold nonmargin"> “의뢰 수락-의뢰 진행-의뢰 완료”</Content>
                <Content className="nonmargin"> 로 진행됩니다.</Content>
            </ContentBox>
            <ContentBox>
                 <Content className="bold nonbottom">의뢰 수락</Content>
                <Content className="nonmargin nonbottom">은 의뢰/원정을 요청받은 게시글 작성자만 할 수 있으며, 수락 시 진행 단계로 넘어갑니다.</Content>
            </ContentBox>
            <ContentBox>
                 <Content className="bold nonbottom">의뢰 진행</Content>
                <Content className="nonmargin nonbottom">은 의뢰 중인 두 사람 모두 가능하며, 의뢰 취소와 의뢰 완료를 할 수 있습니다.</Content>
            </ContentBox>
            <ContentBox>
                 <Content className="bold nonbottom">의뢰 취소</Content>
                <Content className="nonmargin nonbottom">는 두 사람 중 한 사람이라도 취소할 경우, 해당 의뢰는 취소처리가 되며 해당 의뢰는 다시 진행할 수 없습니다.</Content>
            </ContentBox>
            <Content className="small nonbottom">(※ 다른 게시글로의 재의뢰는 가능합니다.)</Content>
            <ContentBox>
                 <Content className="bold nonbottom">의뢰 완료</Content>
                <Content className="nonmargin nonbottom">는 작성하신 후기와 별점이 상대방 프로필 페이지에 나타나게 되고, 원정대의 원정 횟수가 1회 추가됩니다.</Content>
            </ContentBox>
            <Content className="bold">
            (의뢰 완료를 두 사람이 진행하지 않을 시, 의뢰는 완료처리 되지 않습니다.)
            </Content>
            <Content>
            의뢰를 완료되지 않았을 때 채팅방을 나가게 된다면, 해당 의뢰는 취소처리 됩니다.<br />
            단, 채팅을 나간 사용자가 의뢰 완료를 누르고 나갔을 경우 기존 의뢰 상태 그대로 유지됩니다. 
            </Content>
            <Bold className="semi">의뢰 불가능 상황</Bold>
            <Content>
            의뢰는 기본적으로 여러 사람과 동시에 의뢰가 가능하지만, 의뢰가 불가능한 상황이 있습니다.
            </Content>
            <Content className="bold nonbottom">
            1.	같은 게시글에서는 동시 의뢰가 불가능합니다.
            </Content>
            <Content className="nonbottom">
            해당 게시글의 의뢰가 완료/취소된 이후 다른사람의 의뢰를 수락할 수 있습니다.<br /><br />
            </Content>
            <Content className="bold nonbottom">
            2.	같은 사용자끼리는 동시 의뢰가 불가능합니다.
            </Content>
            <Content className="nonbottom">
            다른 게시글의 의뢰가 완료/취소된 이후 같은 사용자와 의뢰를 진행할 수 있습니다.<br /><br />
            </Content>
            <Content className="bold nonbottom">
            3.	같은 사용자와 게시글의 의뢰가 완료/취소된 기록이 있다면, 해당 게시글에서 의뢰가 불가능합니다.
            </Content>
            <Content>
            다른 게시글을 통해 같은 사용자와 의뢰를 진행할 수 있습니다.<br />
            </Content>
            <Bold>신뢰도 있는 원정대를 찾는 방법</Bold>
            <ContentBox>
                <Content className="nonbottom">용감한 원정대에서는 신뢰도 있는 원정대와의 의뢰를 위해  </Content>
                <Content className="bold nonmargin nonbottom">뱃지, 별점, 후기</Content>
                <Content className="nonmargin nonbottom"> 시스템을 제공합니다.</Content>
            </ContentBox>
            <Content>뱃지, 별점, 후기는 모두 사용자의 프로필 페이지에서 확인 가능합니다.</Content>
            <Bold className="semi">뱃지</Bold>
            <Content>
            원정대의 원정 횟수를 나타냅니다. 10회 이하 : 동, 20회 이하 : 은, 20회 이후 : 금 메달
            </Content>
            <Bold className="semi">별점</Bold>
            <Content>
            사용자의 평균 의뢰 점수입니다. 만점은 5점이며, 0.5점 단위로 표시됩니다.
            </Content>
            <Bold className="semi">후기</Bold>
            <Content className="last">
            이전 원정/의뢰인의 평가입니다. 최근 5개의 후기가 프로필 페이지의 표시됩니다.
            </Content>
            <Button onClick={()=>navigate("../signup")}>용감한 원정대&nbsp;&nbsp;&nbsp;회원가입</Button>
            <Content className="last" />
        </Wrapper>
    );
}

export default Notice;