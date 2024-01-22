import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

// restapi
import axios from 'axios';

// redux
import { useDispatch } from "react-redux";
import { setAccessToken, setLogin, setRefreshToken, setMemberId } from "../redux/modules/login";

const Form = styled.form`
    width: 400px;
    margin: auto;
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
    box-sizing: border-box;
    padding: 15px;
    font-size: 15px;
    margin: 24px 0;
`;

const Title = styled.div`
    font-size: 40px;
    font-weight: 800;
    margin: 120px 0 50px;
    text-align: center;
`;

const LinkText = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Text = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

export default function LogIn(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const setLog = (isLogin) => dispatch(setLogin(isLogin));
    const setAccess = (access) => dispatch(setAccessToken(access));
    const setRefresh = (refresh) => dispatch(setRefreshToken(refresh));
    const setId = (id) => dispatch(setMemberId(id));

    const handleLogin = (e) => {
        e.preventDefault();
        // yny3533, rktlrhrl123
        if(e.target[0].value !== "" && e.target[1].value !== ""){
            axios.post('http://13.209.77.50:8080/auth/login', {
                username: e.target[0].value,
                pw: e.target[1].value
            })
            .then(function(response){
                setId(response.data.memberId);
                setAccess(response.data.tokenDto.accessToken);
                setRefresh(response.data.tokenDto.refreshToken);
                setLog(true);
                navigate("/main");
            })
            .catch(function(error){
                Swal.fire({
                    title: "로그인 정보 없음",
                    text: "입력하신 아이디나 비밀번호를 다시 확인해주세요.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
            });
        }else{
            Swal.fire({
                title: "입력하지 않은 항목 있음",
                text: "입력하지 않은 항목이 있는지 다시 한 번 확인해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
    }

    return (
        <Form onSubmit={handleLogin}>
            <Title>로그인</Title>
            <Label>아이디</Label>
            <Input
                name="userid"
                type="text"
                placeholder="아이디" 
            />
            <Label>비밀번호</Label>
            <Input
                name="password"
                type="password"
                placeholder="비밀번호"
            /> 
            <Button type="submit">로그인</Button>
            <Text>
                <LinkText to="/signUp">회원가입</LinkText>
                <LinkText to="/findId">계정 찾기 </LinkText>
            </Text>  
        </Form>
    );
};
