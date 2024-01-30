import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

// restapi
import axios from 'axios';

// redux
import { setLocation, setProfileImg, setLogin, setMemberId } from "../redux/modules/login";
import { useDispatch } from "react-redux";

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

    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setId = (id) => dispatch(setMemberId(id));
    const setProfile = (pro) => dispatch(setProfileImg(pro));
    const setLog = (bool) => dispatch(setLogin(bool));

    // 토큰 재발급 요청 api
    const ReissueToken = () => {
        axios.post("http://13.209.77.50:8080/auth/reissue",{
            accessToken: JSON.parse(sessionStorage.getItem('jwt')).access,
            refreshToken: JSON.parse(sessionStorage.getItem('jwt')).refresh
        })
        .then(function(response){
            sessionStorage.setItem('jwt',JSON.stringify({
                access: response.data.accessToken,
                refresh: response.data.refreshToken
            }));
            alert("토큰 기한이 만료로 페이지 요청이 취소되었습니다. 메인페이지로 이동합니다.");
            navigate("/main");
        })
        .catch(function(error){
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
                alert("로그인 유지 시간이 종료되었습니다.");
                navigate("/main");
            }else{
                console.log(error);
            }
        });
    }

    const handleAuth = (e) =>{
        if(e.target[0].value !== "") {
            axios.post('http://13.209.77.50:8080/member/pw', {
            nowPassword: e.target[0].value,
            }, {headers:{
                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }
            })
            .then(function(response){
                navigate("/resetpw");
            })
            .catch(function(error){
                if(error.response.status === 400) {
                    Swal.fire({
                        title: "비밀번호 오류",
                        text: "비밀번호가 틀립니다.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                } else if(error.response.status === 401 && error.response.data.errorMessage === "Access Token 만료"){
                        ReissueToken();   
                    }
                else {
                    console.log(error);
                    alert("에러 발생");
                }
            });
        } else {
            Swal.fire({
                title: "입력 정보 없음",
                text: "비밀번호를 입력해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
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