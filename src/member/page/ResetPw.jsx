import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useSearchParams } from 'react-router-dom';
import { BASE_URL } from "../../common/components/Util";

// restapi
import axios from 'axios';

// redux
import { setLogin, setMemberId, setLocation, setProfileImg } from "../redux/modules/login";
import { useDispatch } from "react-redux";

const Title = styled.div`
    font-size: 40px;
    font-weight: 800;
    margin: 120px 0 50px;
    text-align: center;
`;

const Label = styled.label`
    margin: 16px 0 6px;
    text-align: left;
    font-size: 17px;
    font-weight: bold;
`;

const Input = styled.input`
    display: block;
    border: 1px solid #d1d1d1;
    width: 100%;
    box-sizing: border-box;
    padding: 16px 24px;
    margin: 15px 0;
    &::placeholder {
        color: #ababab;
    }
    font-family: 'SUITE';
`;

const Button = styled.button`
    display: block;
    border: none;
    background-color: #f8332f;
    opacity: 0.8;
    border-radius: 18px;
    color: #fff;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 15px;
    font-size: 15px;
    margin: 24px 0;
    padding: 0px;
    font-family: 'SUITE';
    cursor: pointer;

    &:hover {
        background-color: #ff8f8f;
    }
`;

const Form = styled.form`
    width: 400px;
    margin: auto;
`;

const Detail = styled.label`
    font-size: 13px;
    margin-left: 10px;
`;

function ResetPw(props) {
    const navigate = useNavigate();
    const [isReset, setIsReset] = useState(true);
    let [query, setQuery] = useSearchParams();

    // redux 함수 dispatch
    const dispatch = useDispatch();
    const setLog = (isLogin) => dispatch(setLogin(isLogin));
    const setId = (memberId) => dispatch(setMemberId(memberId));
    const setLoc = (loc) => dispatch(setLocation(loc)); 
    const setProfile = (profileImg) => dispatch(setProfileImg(profileImg));

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

    //패스워드 검증
    const isPassword = (str) => {
        const correctWord = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
        const Length = str.length>=8;

        return correctWord.test(str) && Length;
    }

    const handleReset = async (e) =>{
        e.preventDefault();
        if(e.target[0].value!=="" && e.target[1].value!=="") {
            if(isPassword(e.target[0].value)) {
                if(e.target[0].value === e.target[1].value) {
                    // 비회원일 때 비밀번호 재설정
                    if(JSON.parse(sessionStorage.getItem('jwt')).access === null) {
                        axios.patch(`${BASE_URL}/member/pw`, {
                            newPassword: e.target[0].value,
                            emailId: parseInt(query.get('emailid'), 10),
                            authCode: parseInt(query.get('code'), 10),
                        })
                        .then(function(response){
                            Swal.fire({
                                title: "비밀번호 재설정 완료",
                                text: "입력하신 비밀번호로 재설정되었습니다.",
                                icon: "success",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                            navigate("/main");
                        })
                        .catch(function(error){
                            if(error.response.data.errorMessage ==="Invalid request content." && error.response.status === 400) {
                                Swal.fire({
                                    title: "비밀번호 형식 오류",
                                    text: "비밀번호는 영문과 숫자를 섞어 8글자 이상이어야 합니다.",
                                    icon: "error",
                                    confirmButtonColor: "#d33",
                                    confirmButtonText: "확인",
                                });
                            } else if((error.response.status === 400 && error.response.data.errorMessage === "기존 비밀번호와 새 비밀번호가 일치")) {
                                Swal.fire({
                                    title: "기존 비밀번호와 일치",
                                    text: "새 비밀번호는 기존 비밀번호와 같을 수 없습니다.",
                                    icon: "error",
                                    confirmButtonColor: "#d33",
                                    confirmButtonText: "확인",
                                }); 
                            }
                        });
                    }
                    // 회원일 때 비밀번호 재설정 
                    else {
                        axios.patch(`${BASE_URL}/member/pw`, {
                            newPassword: e.target[0].value},
                            {headers:{
                                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                            }})
                        .then(function(response){
                            sessionStorage.clear();
                            setLog(false);
                            setId(null);
                            setLoc({
                                latitude: null,
                                longitude: null
                            });
                            setProfile(null);
                            Swal.fire({
                                title: "비밀번호 재설정 완료",
                                text: "입력하신 비밀번호로 재설정되었습니다. 다시 로그인 해주세요.",
                                icon: "success",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                            navigate("/main");
                        })
                        .catch(function(error){
                            if(error.response.status === 401){
                                if(!ReissueToken()) {return;}
                                else {handleReset(e);}   
                            } else if(error.response.status === 400 && error.response.data.errorMessage === "Invalid request content."){
                                Swal.fire({
                                    title: "비밀번호 형식 오류",
                                    text: "비밀번호는 영문과 숫자를 섞어 8글자 이상이어야 합니다.",
                                    icon: "error",
                                    confirmButtonColor: "#d33",
                                    confirmButtonText: "확인",
                                });  
                            } else if((error.response.status === 400 && error.response.data.errorMessage === "기존 비밀번호와 새 비밀번호가 일치")) {
                                Swal.fire({
                                    title: "기존 비밀번호와 일치",
                                    text: "새 비밀번호는 기존 비밀번호와 같을 수 없습니다.",
                                    icon: "error",
                                    confirmButtonColor: "#d33",
                                    confirmButtonText: "확인",
                                }); 
                            } else if((error.response.status === 400 && error.response.data.errorMessage === "존재하지 않는 이메일ID")) {
                                Swal.fire({
                                    title: "재설정 완료된 링크",
                                    text: "재설정이 완료된 링크입니다. 추가 재설정을 원하실 경우, 새로 재설정 링크를 받아주세요.",
                                    icon: "error",
                                    confirmButtonColor: "#d33",
                                    confirmButtonText: "확인",
                                }); 
                            }
                        });
                    }
                } else {
                    Swal.fire({
                        title: "비밀번호 불일치",
                        text: "비밀번호와 비밀번호 확인에 입력하신 두 비밀번호가 다릅니다.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",

                    });
                }
            } else {
                Swal.fire({
                    title: "비밀번호 형식 오류",
                    text: "비밀번호는 영문과 숫자를 섞어 8글자 이상이어야 합니다.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });  
            }
        } else {
            Swal.fire({
                title: "비밀번호 미입력",
                text: "비밀번호가 입력되지 않았습니다",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
    }

    const handleCancel = () => {
        setIsReset(false);
        navigate("/main");
    }

    return(
        <Form onSubmit={handleReset}>
            <Title>비밀번호 재설정</Title>
            <Label>비밀번호</Label>
            <Detail>영문과 숫자를 조합한 8글자 이상</Detail>
            <Input
                name="password"
                type="password"
                placeholder="비밀번호" 
            />
            <Label>비밀번호 확인</Label>
            <Input
                name="password"
                type="password"
                placeholder="비밀번호"
            /> 
            <Button onClick={()=>setIsReset(true)} type="submit" >재설정</Button>
            <Button onClick={handleCancel} type="button">취소</Button>
        </Form>
    );
}

export default ResetPw;