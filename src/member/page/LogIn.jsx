import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

// restapi
import axios from 'axios';

// redux
import { useDispatch } from "react-redux";
import { setLogin, setMemberId, setLocation, setProfileImg, setIsNew } from "../redux/modules/login";

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
    font-family: 'SUITE';
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
    font-size: 18px;
    margin: 20px 0;
    font-family: 'SUITE';
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

const Caps = styled.div`
    font-size: 15px;
    font-weight: 600;
    margin: 10px 0 5px;
    text-align: center;
    color: rgb(255, 0, 0);
`;

export default function LogIn(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const setLog = (isLogin) => dispatch(setLogin(isLogin));
    const setId = (id) => dispatch(setMemberId(id));
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setProfile = (profileImg) => dispatch(setProfileImg(profileImg));
    const setisNewChat = (isNew) => dispatch(setIsNew(isNew));

    const handleLogin = (e) => {
        e.preventDefault();
        if(e.target[0].value !== "" && e.target[1].value !== ""){
            axios.post('https://bravepeople.site:8080/auth/login', {
                username: e.target[0].value,
                pw: e.target[1].value
            })
            .then(function(response){
                // redux 변수 저장
                setLog(true);
                setId(response.data.memberId);
                setLoc({
                    latitude:response.data.lat, 
                    longitude: response.data.lng
                });
                setProfile(response.data.profileImg);
                // 토큰 저장
                sessionStorage.setItem('jwt', JSON.stringify({
                    access: response.data.tokenDto.accessToken,
                    expirationTime: response.data.tokenDto.accessTokenExpiresIn,
                    refresh: response.data.tokenDto.refreshToken
                }));
                // 새로고침으로 인한 데이터 삭제 방지용 데이터 저장
                sessionStorage.setItem('savedData', JSON.stringify({
                    isLogin: true,
                    id: response.data.memberId,
                    loc : {
                        latitude: response.data.lat,
                        longitude: response.data.lng
                    },
                    profileImg: response.data.profileImg
                }));
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

    const [capsLockFlag, setCapsLockFlag] = useState(false);
    const checkCapsLock = (e) => {
        let capsLock = e.getModifierState("CapsLock");
        setCapsLockFlag(capsLock);
    };

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
                onKeyUp={(e) => checkCapsLock(e)}
            /> 
            {capsLockFlag && <Caps>Caps Lock이 켜져 있습니다.</Caps>}
            <Button type="submit">로그인</Button>
            <Text>
                <LinkText to="/signUp">회원가입</LinkText>
                <LinkText to="/findId">계정 찾기 </LinkText>
            </Text>  
        </Form>
    );
};
