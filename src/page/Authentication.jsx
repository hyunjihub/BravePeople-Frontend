import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

// restapi
import axios from 'axios';
import { shallowEqual, useSelector } from "react-redux";


const Title = styled.div`
    font-size: 40px;
    font-weight: 800;
    margin: 120px 0 50px;
    text-align: center;
`;

const Label = styled.label`
    display: block;
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
`;

const Form = styled.form`
    width: 400px;
    margin: auto auto 200px auto;
`;

function Authentication(props) {
    const navigate = useNavigate();
    const { access, refresh } = useSelector((state)=>({
        access: state.login.accessToken,
        refresh: state.login.refreshToken
    }), shallowEqual);

    const handleAuth = (e) =>{

        console.log(e.target[0].value);
        
        if(e.target[0].value != "") {
            axios.post('http://13.209.77.50:8080/member/pw', {
                nowPassword: e.target[0].value,
            })
            .then(function(response){
                console.log(response);
                navigate("/resetpw");
            })
            .catch(function(error){
                console.log(error);
                alert("비밀번호가 틀립니다.");
            });
        } else {
            alert("비밀번호를 입력해주세요.");
        }
        e.preventDefault();
    }

    return(
        <Form onSubmit={handleAuth}>
            <Title>본인 인증</Title>
            <Label>비밀번호</Label>
            <Input
                name="password"
                type="password"
                placeholder="비밀번호" 
            />
            <Button type="submit">본인 인증</Button>
        </Form>
        

    );
}

export default Authentication;