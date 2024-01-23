import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useSearchParams } from 'react-router-dom';

// restapi
import axios from 'axios';

//redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setAccessToken, setRefreshToken, setParamId } from "../redux/modules/login";

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
    font-family: 'SUITE-Regular';
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
    font-family: 'SUITE-Regular';
    cursor: pointer;
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

    // redux로 변수, 함수 가져오기
    const { isLog, id, access, refresh, param } = useSelector((state)=>({
        isLog: state.login.isLogin,
        id: state.login.memberId,
        access: state.login.accessToken,
        refresh: state.login.refreshToken,
        param : state.login.paramId
    }), shallowEqual);

    const dispatch = useDispatch();
    const setAccess = (access) => dispatch(setAccessToken(access));

    const handleReset = (e) =>{     
        if(e.target[0].value !== "") {
            if(e.target[0].value === e.target[1].value) {
                if(access==="") {
                    e.preventDefault();
                    axios.patch('http://13.209.77.50:8080/member/pw', {
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
                        console.log(error);
                    });
                } else {
                    e.preventDefault();
                    axios.patch('http://13.209.77.50:8080/member/pw', {
                        newPassword: e.target[0].value},
                        {headers:{
                            Authorization: `Bearer ${access}`
                        }})
                    .then(function(response){
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
                        console.log(error);
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
                title: "비밀번호 미입력",
                text: "비밀번호가 입력되지 않았습니다",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        
        e.preventDefault();
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