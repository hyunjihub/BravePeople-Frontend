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
    border-radius: 15px;
    border : 2px dashed #F3D7CA;
    background-color: #ffffff;
    padding: 1%;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    position: relative;
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
    width: 25%;
    height: 22%;
    border-radius : 50%;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    background-position: center;
    margin-bottom: 4%;
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
        font-size: 18px;
        color: #f8332f;
        font-weight: 700;
        margin-bottom: 7%;
    }
`;

const RatingContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1%;
`;

const Range = styled.input`
    width: 37%;
    position: absolute;
    top: 52%;
    opacity: 0;
`;

const RatingScore = styled.div`
    font-size: 15px;
    text-align: center;
    margin-bottom: 5%;
`;

function Review(props) {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setId = (id) => dispatch(setMemberId(id));
    const setProfile = (pro) => dispatch(setProfileImg(pro));
    const setLog = (bool) => dispatch(setLogin(bool));

    const reviewCancel = () => {
        Swal.fire({
            title: "입력을 취소하시겠습니까?",
            text: "입력 취소 시 해당 의뢰에 대한 후기를 작성하실 수 없습니다.",
            icon: "warning",
            confirmButtonColor: "#d33",
            confirmButtonText: "확인",
            showCancelButton: true, 
            cancelButtonColor: '#3085d6', 
            cancelButtonText: '취소',
        }).then(result => {
            if (result.isConfirmed) {
                props.setReviewOpen(false);
            }
        })
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
            const logoutProcess = (title, text) => {
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
                    title: title,
                    text: text,
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
                navigate("/main");
            }
            if(error.response.status === 401 && error.response.data.errorMessage === "Refresh Token 만료"){
                logoutProcess("로그인 기간 만료", "로그인 유지 기간이 만료되었습니다. 재로그인 해주세요.");
            }else{
                logoutProcess("비정상 접근 감지", "비정상적인 접근이 감지되어 로그아웃합니다.");
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

    // 후기 전송 api
    const sendReview = async() => {
        if(rating === null){
            Swal.fire({
                title: "별점 미입력",
                html: "별점은 필수로 입력되어야 합니다.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        else{
            axios.post(`${BASE_URL}/contact/${props.nowRoomId}/review`,
            {
                score: rating,
                contents: content
            }, 
            {
                headers: {
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }})
            .then(function(response){
                props.setReviewOpen(false);
            })
            .catch(function(error){
                if(error.response.status === 401){
                    if(!ReissueToken()) { return; }
                    else { sendReview(); }
                }
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
                <Profile style={{backgroundImage: `url(${(props.userInfo.profileImage === null) ? profile : props.userInfo.profileImage})`}}/>
                <Nickname>{props.userInfo.nickname}</Nickname>
                <Detail>의뢰는 만족스러우셨나요? {props.userInfo.nickname}님과의 의뢰에 대해 리뷰 남겨주세요! </Detail>
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
                <RatingScore>{(rating===null)?"0":rating}/5 점</RatingScore>
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