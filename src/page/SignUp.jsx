import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";

const Title = styled.div`
    font-size: 40px;
    font-weight: 800;
    margin: 120px 0 50px;
    text-align: center;
`;

const Form = styled.form`
    width: 400px;
    margin: auto auto 200px auto;
`;

const Label = styled.label`
    margin: 16px 0 6px;
    text-align: left;
    font-size: 17px;
    font-weight: bold;
`;

const Detail = styled.label`
    font-size: 13px;
    margin-left: 10px;
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

const UniqueButton = styled.button`
    width: 80px;
    height: 30px;
    background-color: #f8332f;
    color: #fff;
    border: none;
    border-radius: 18px;
    position: absolute;
    right: 20px;
    top: 10px;
    font-family: 'SUITE-Regular';
`;

const ForInset = styled.div`
    position: relative;
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
`;

function SignUp(props) {
    const navigate = useNavigate();
    return(
        <Form>
            <Title>회원가입</Title>
            <Label>성함 *</Label>
            <Input
                name="username"
                type="text"
                placeholder="성함" 
            />
            <Label>아이디 *</Label>
            <Detail>6글자 이상</Detail>
            <ForInset>            
                <Input
                name="userid"
                type="text"
                placeholder="아이디" 
                />
                <UniqueButton>중복확인</UniqueButton>
            </ForInset>
            <Label>비밀번호 *</Label>
            <Detail>영문과 숫자를 조합한 8글자 이상</Detail>
            <Input
                name="password"
                type="password"
                placeholder="비밀번호"
            /> 
            <Label>비밀번호 확인 *</Label>
            <Input
                name="password"
                type="password"
                placeholder="비밀번호"
            /> 
            <Label>이메일 *</Label>
            <Detail>본인 인증을 위해 사용하시는 이메일 주소로 입력해주세요</Detail>
            <ForInset>            
                <Input
                    name="useremail"
                    type="email"
                    placeholder="이메일 주소 (ex : brave@naver.com)"
                /> 
                <UniqueButton>중복확인</UniqueButton>
            </ForInset>
            <Label>닉네임 *</Label>
            <ForInset>            
                <Input
                    name="nickname"
                    type="text"
                    placeholder="닉네임"
                /> 
                <UniqueButton>중복확인</UniqueButton>
            </ForInset>
            <Button onClick={()=>navigate("/main")}>회원가입</Button>
            <Button onClick={()=>navigate("/main")}>취소</Button>
        </Form>
    );
}

export default SignUp;