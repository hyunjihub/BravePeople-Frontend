import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

// restapi
import axios from 'axios';

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

    const handleReset = (e) =>{

        console.log(e.target[0].value);
        
        if(e.target[0].value !== "") {
            if(e.target[0].value == e.target[1].value) {
                axios.patch('http://13.209.77.50:8080/member/pw', {
                memberid: "",
                authCode: "",
                newPassword: e.target[0].value
                })
                .then(function(response){
                    navigate("/resetpw");
                })
                .catch(function(error){
                    alert("에러 문구");
                });
            } else {
                alert("입력하신 비밀번호가 일치하지 않습니다.");
            }
        } else {
            alert("비밀번호를 입력해주세요.");
        }
        
        e.preventDefault();
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
            <Button onClick={()=>setIsReset(false)}>취소</Button>
        </Form>
    );
}

export default ResetPw;