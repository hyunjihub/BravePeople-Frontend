import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

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
    return(
        <Form>
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
            <Button onClick={()=>navigate("/main")}>재설정</Button>
            <Button onClick={()=>navigate("/main")}>취소</Button>
        </Form>
    );
}

export default ResetPw;