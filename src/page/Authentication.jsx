import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

// restapi
import axios from 'axios';

//redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setAccessToken, setRefreshToken } from "../redux/modules/login";


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

    // redux로 변수, 함수 가져오기
    const { access, refresh } = useSelector((state)=>({
        access: state.login.accessToken,
        refresh: state.login.refreshToken,
    }), shallowEqual);

    const dispatch = useDispatch();
    const setAccess = (acc) => dispatch(setAccessToken(acc));
    const setRefresh = (ref) => dispatch(setRefreshToken(ref));
    
    // 토큰 재발행 함수
    const ReissueToken = (msg) => {
        axios.post("http://13.209.77.50:8080/auth/reissue",{
            accessToken: access,
            refreshToken: refresh,
        })
        .then(function(response){
            setAccess(response.data.accessToken);
            setRefresh(response.data.refreshToken);
            alert(msg);
            navigate("/main");
        })
        .catch(function(error){
            console.log(error);
        });
    }

    const handleAuth = (e) =>{
        if(e.target[0].value !== "") {
            axios.post('http://13.209.77.50:8080/member/pw', {
            nowPassword: e.target[0].value,
            }, {headers:{
                    Authorization: `Bearer ${access}`
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
                        ReissueToken("토큰 기한이 만료로 요청이 취소되었습니다. 메인페이지로 이동합니다.");   
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