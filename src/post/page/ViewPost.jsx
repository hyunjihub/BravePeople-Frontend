import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { PiGenderMaleBold } from "react-icons/pi";
import { PiGenderFemaleBold } from "react-icons/pi";
import profile from '../../common/resources/img/profile.png';
import StarRating from '../../member/components/Rating';

// axios
import axios from "axios";

const Wrapper = styled.div`
    width: 40%;
    height: 100vh;
    margin: 15px auto;
`;

const Title = styled.div`
    width: 100%;
    height: 5%;
    line-height: 1.5;
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    font-family: 'SUITE';
    margin: 50px 0 50px;
`;

const Line = styled.hr`
    color: #d1d1d1;
    opacity: 0.5;
    margin: 3% 0;
`;

const TitleBox = styled.div`
    width: 90%;
    height: 3%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 5%;
`;

const ContentTitle = styled.div`
    width: 95%;
    font-size: 28px;
    font-weight: 600;
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

const ProfileBox = styled.div`
    width: 90%;
    height: 5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2% 6% ;
`;

const Profile = styled.img`
    width: 7%;
    height: 100%;
    border-radius: 50%;
    border: none;
`;

const NicknameBox = styled.div`
    width: 70%;
    height: 90%;
    display: flex;
    flex-direction: column;
    margin: 2% 2% ;
`;

const Nickname = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-right: 1%;
`;

const Time = styled.div`
    font-size: 15px;
    font-weight: 200;
    color: #868e96;
`;

const Button = styled.button`
    width: 100%;
    height: 60%;
    border-radius: 18px;
    background-color: #f8332f;
    color: #fff;
    border: none;
    font-family: 'SUITE';
    font-size: 16px;
    cursor: pointer;
    margin: 5% 2% 0;
`;

const ButtonContainer = styled.div`
    width: 18%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2%;
`;

const Content = styled.div`
    width: 90%;
    height: 70%;
    color: #000;
    margin: auto;
    font-size: 20px;
`;

const StickyBox = styled.div`
    width: 70%;
    height: 7%;
    background-color: #f8332f;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    position: sticky;
    bottom: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
`;

const ChatButton = styled.button`
    border: none;
    background-color: #f8332f;
    font-family: 'SUITE';
    font-weight: 600;
    font-size: 30px;
    color: #fff;
    margin: auto;
`;

const Price = styled.div`
    border: none;
    background-color: #f8332f;
    font-family: 'SUITE';
    font-weight: 600;
    font-size: 30px;
    color: #fff;
    margin: auto;
`;

const Image = styled.div`
    width: 70%;
    background-color: #000;
    color: #fff;
    margin: 2% auto 3%;
`;

const Rating = styled.div`
    display: flex;
    flex-direction: row;
    height: 50%;
`;

function ViewPost(props) {

    const navigate = useNavigate();
    const gender = false;

    const { postid } = useParams();
    const [postData, setPostData] = useState();

    useEffect(()=>{
        axios.get(`http://13.209.77.50:8080/posts/${postid}`)
        .then(function(response){
            setPostData(response.data);
        })
        .catch(function(error){
            console.log(error);
        });
    }, []);

    //수정 버튼 클릭시 이동
    const handleModify = (e) => {
        e.preventDefault();
    }

    //삭제 버튼 클릭시 삭제 API
    const handleDelete = (e) => {

    }

    //클릭시 프로필 페이지 이동
    const handlePage = (e) => {
    }

    return(
        <Wrapper>
            <Title>{postData.type}</Title>
            <Line />
            <TitleBox>
                <Category>{postData.category}</Category>
                <ContentTitle>{postData.title}</ContentTitle>
                {(postData.gender === "남성")?<PiGenderMaleBold size="40" color="#254995"/>:<PiGenderFemaleBold size="40" color="#a93957"/>}
            </TitleBox>
            <ProfileBox>
                <Profile src={postData.img} alt="프로필"/>
                <NicknameBox>
                    <Rating>
                        <Nickname>{postData.nickname}</Nickname>
                        <StarRating value="3.8" size="20"/>
                    </Rating>
                    <Time>{postData.createdAt}</Time>
                </NicknameBox>
                <ButtonContainer>
                    <Button>수정</Button>
                    <Button>삭제</Button>
                </ButtonContainer>
            </ProfileBox>
            <Line />
            <Content>
                <Image>이미지 있을 시 입력되는 부분 height 고정값X</Image>
                {postData.contents}
            </Content>
            <StickyBox>
                <ChatButton>{(postData.type==="원정대")? "의뢰하기" : "원정가기"}</ChatButton>
                <Price>{postData.price}￦</Price>
            </StickyBox>
        </Wrapper>
    );
}

export default ViewPost;