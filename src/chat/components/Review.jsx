import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import profile from "../../common/resources/img/profile.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

import Rating from "../../member/components/Rating";

//redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLocation, setProfileImg, setLogin, setMemberId } from "../../member/redux/modules/login";
import { BASE_URL } from "../../common/components/Util";


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
    position: relative;
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

const Input = styled.textarea`
    height: 25%;
    border: 1px solid #d1d1d1;
    width: 100%;
    box-sizing: border-box;
    padding: 16px 24px;
    font-family: 'SUITE';
    resize: none;
    font-size: 15px;
    border-radius: 15px;
    outline: 1px solid rgb(248, 51, 47);
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Button = styled.button`
    width: 40%;
    height: 80%;
    background-color: #f8332f;
    font-family: 'SUITE';
    font-size: 18px;
    color: #fff;
    border: none;
    border-radius: 15px;
    margin: 3% 5%;
    cursor: pointer;

    &:hover {
        background-color: #ff8f8f;
    }
`;

const ButtonContainer = styled.div`
    width: 100%;
    height: 8%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 0 5%;
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

const Range = styled.input`
    width: 37%;
    position: absolute;
    top: 52%;
    opacity: 0;
`;

function Review(props) {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setId = (id) => dispatch(setMemberId(id));
    const setProfile = (pro) => dispatch(setProfileImg(pro));
    const setLog = (bool) => dispatch(setLogin(bool));

    const reviewCancel = () => {
        props.setReviewOpen(false);
    }

    // 토큰 재발급 요청 api
    const ReissueToken = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/reissue`,{
                accessToken: JSON.parse(sessionStorage.getItem('jwt')).access,
                refreshToken: JSON.parse(sessionStorage.getItem('jwt')).refresh
            })
            sessionStorage.setItem('jwt',JSON.stringify({
                access: response.data.accessToken,
                expirationTime: response.data.accessTokenExpiresIn,
                refresh: response.data.refreshToken
            }));
            return true;
        } catch(error){
            if(error.response.status === 401 && error.response.data.errorMessage === "Refresh Token 만료"){
                sessionStorage.removeItem('jwt');
                sessionStorage.removeItem('savedData');
                sessionStorage.removeItem('savedUserInfo');
                setLog(false);
                setId(null);
                setProfile(null);
                setLoc({
                    latitude: null,
                    longitude: null
                });
                Swal.fire({
                    title: "로그인 기간 만료",
                    text: "로그인 유지 기간이 만료되었습니다. 재로그인 해주세요.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
                navigate("/main");
            }else{
                console.log(error);
            }
            return false;
        };
    }

    const [content, setContent] = useState("")
    const handleContent = (e) => {
        if(e.target.value.length>200) {
            Swal.fire({
                title: "후기 최대 글자수",
                text: "내용의 최대 글자수는 200자 입니다. 내용 글자수를 확인해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        else setContent(e.target.value);
    };

    // 후기 작성
    // 후기 담는 변수
    const review = useState({
        score: null,
        contents: null
    });

    // 후기 전송 api
    const sendReview = async() => {
        if(review.score === null){
            alert("별점을 정해주세요!");
        }
        else{
            
            if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
                if(!await ReissueToken()) return;
            }
            axios.post(`${BASE_URL}/contact/${props.nowRoomId}/review`,
            {
                score: review.score,
                contents: review.contents
            }, 
            {
                headers: {
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }})
            .then(function(response){
                reviewCancel();
            })
            .catch(function(error){
                console.log(error);
            })                   
        }
    };

    const [rating, setRating] = useState(null);

    const handleRating = (e) => {
        e.stopPropagation();
        setRating(parseFloat(e.target.value));
    }; 
    

    return (
        <Background>
            <Content>
                <Detail className="important">주의 : 이 창을 닫으시면 후기를 남기실 수 없습니다!</Detail>
                <Profile style={{backgroundImage: `url(${profile})`}}/>
                <Nickname>닉네임</Nickname>
                <Detail>의뢰는 만족스러우셨나요? 닉네임분과의 의뢰에 대해 리뷰 남겨주세요! </Detail>
                <RatingContainer>
                    <Rating value={rating} size="40"/>
                </RatingContainer>
                <Range
                    type="range"
                    onChange={handleRating}
                    value={rating}
                    min="0"
                    max="5"
                    step="0.5"
                />
                
                <Input cols="30" rows="5" value={content || ""} onChange={handleContent} placeholder="후기를 입력해주세요. 후기는 최대 200글자까지 입력 가능합니다."/>
                <ButtonContainer>
                    <Button onClick={sendReview}>입력 완료</Button>
                    <Button onClick={reviewCancel}>작성 취소</Button>
                </ButtonContainer>
                
            </Content>
        </Background>
        
    );
}

export default Review;