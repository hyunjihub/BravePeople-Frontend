import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";

//redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLocation, setProfileImg, setLogin, setMemberId } from "../../member/redux/modules/login";

const Button = styled.button`
    width: 45%;
    height: 100%;
    background-color: #f8332f;
    font-size: 15px;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-family: 'SUITE';
    margin-right: 5px;
    cursor: pointer;

    &:hover {
        background-color: #ff8f8f;
    }
`;

const DisableButton = styled.button`
    width: 45%;
    height: 100%;
    background-color: #ff8f8f;
    font-size: 15px;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-family: 'SUITE';
    margin-right: 5px;
    cursor: pointer;
`;

const ButtonList = styled.div`
    width: 13%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 4%;
    align-items: center;

    &.request {
        flex-direction: row;
        width: 70%;
        height: 50%;
        margin: 0;
    }

    &.user {
        height: 120%;
        width: 70%;
        margin-top: 1.5%;
        align-items: flex-start;
    }
`;

function RequestButton(props) {

    const [isActive, setIsActive] = useState(props.isActive);
    const [status, setStatus] = useState(props.status);
    const nowRoomId = props.roomId;
    //대기중 && true -> 수락 대기중 && false -> 수락 진행중 && true -> 진행 외 전부 null

    useEffect(() => {
        setIsActive(props.isActive);
        setStatus(props.status);
    }, [props.isActive, props.status]);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setId = (id) => dispatch(setMemberId(id));
    const setProfile = (pro) => dispatch(setProfileImg(pro));
    const setLog = (bool) => dispatch(setLogin(bool));
    
    // 토큰 재발급 요청 api
    const ReissueToken = async () => {
        try {
            const response = await axios.post("https://bravepeople.site:8080/auth/reissue",{
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

    const [buttonText, setButtonText] = useState("");
    const [buttonNull, setButtonNull] = useState(false);
    
    // 상태에 맞는 버튼 출력 결정
    const buttonChoice = () => {
        console.log("호출");
        if (status==="대기중") {
            setButtonText("의뢰 수락");
            setButtonNull(false);
            return;
        }
        else if (status==="진행중") {
            if (isActive) {
                setButtonText("의뢰 취소");
                setButtonNull(false);
                return;
            }
        }
        setButtonNull(true);
    }

    const buttonCall = () => {
        if (status==="대기중") {
            acceptContact();
            return;
        }
        else if (status==="진행중") {
            cancelContact();
            return;
        }
    }

    // 의뢰 수락
    const acceptContact = async() => {
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if(!await ReissueToken()) return;
        }
        axios.get(`https://bravepeople.site:8080/contact/${nowRoomId}`,
        {
            headers :{
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }
        })
        .then(function(response){
            console.log(response);
            buttonChoice();
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // 의뢰 취소
    const cancelContact = async() => {
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if(!await ReissueToken()) return;
        }
        axios.get(`https://bravepeople.site:8080/contact/${nowRoomId}/cancel`,
        {
            headers :{
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }
        })
        .then(function(response){
            console.log(response);
            buttonChoice();
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // 의뢰 완료
    const finishContact = async() => {
        Swal.fire({
            title: "의뢰가 완료되셨나요?",
            text: "완료된 의뢰는 취소할 수 없습니다. 의뢰 완료 하시겠습니까?",
            icon: "warning",
            confirmButtonColor: "#d33",
            confirmButtonText: "확인",
            showCancelButton: true, 
            cancelButtonColor: '#3085d6', 
            cancelButtonText: '취소',
        }).then(async result => {
            if (result.isConfirmed) {
                if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
                    if(!await ReissueToken()) return;
                }
                axios.get(`https://bravepeople.site:8080/contact/${nowRoomId}/finish`,
                {
                    headers :{
                        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                    }
                })
                .then(function(response){
                    props.setReviewOpen(true);
                    console.log(response);
                    buttonChoice();
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        })
    }

    return (
        <ButtonList className="request">
            {(!isActive && !buttonNull)?<DisableButton disabled="disabled">{buttonText}</DisableButton>:(!buttonNull)?<Button onClick={buttonCall()}>{buttonText}</Button>:null}
            {(status==="진행중" && isActive)?<Button onClick={finishContact}>의뢰 완료</Button>:null}
        </ButtonList>
    );

}

export default RequestButton;