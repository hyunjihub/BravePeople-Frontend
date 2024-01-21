import React from "react";
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

const IdForm = styled.form`
    width: 400px;
    margin: auto;
`;

const PasswordForm = styled.form`
    width: 400px;
    margin: auto;
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

const Container = styled.div`
    width: 1300px;
    display: flex;
    margin: auto;
    align-items: center;
    flex: space-between;
`;

function FindId(props) {

    const navigate = useNavigate();

    const idFind = (e) => {
        // yny3533, rktlrhrl123
        if (e.target[0].value !== "") {
            axios.get('http://13.209.77.50:8080/auth/username', {
                params: {
                    email: e.target[0].value
                }
            })
            .then(function(response){
                alert("사용자의 아이디는 " + response.data.username + "입니다.");
            })
            .catch(function(error){
                alert("등록된 이메일이 없습니다.");
            });
            e.preventDefault();
        } else {
            alert("이메일이 입력되지 않았습니다.");
        }
        
    }

    const pwFind = (e) => {
        
        if(e.target[0].value !== "" && e.target[1].value !== "") {
            if(e.target[0].value.length>6) {
                axios.post('http://13.209.77.50:8080/auth/pw', {
                    username: e.target[0].value,
                    email: e.target[1].value,
                })
                .then(function(response){
                    navigate("/main");
                })
                .catch(function(error){
                    alert("등록된 이메일이 없습니다.");
                });
                e.preventDefault();
            } else {
                alert("아이디는 6글자 이상입니다.");
            }    
        } else {
            alert("아이디 또는 이메일이 입력되지 않았습니다.");
        }
        
    }

    return(
        <Container>
            <IdForm onSubmit={idFind}>
                <Title>아이디 찾기</Title>
                <Label>아이디</Label>
                <Input
                    name="useremail"
                    type="email"
                    placeholder="이메일 (ex brave@naver.com)" 
                />
                <Button>아이디 찾기</Button>
            </IdForm>
            <PasswordForm onSubmit={pwFind}>
                <Title>비밀번호 찾기</Title>
                <Label>아이디</Label>
                <Input
                    name="userid"
                    type="text"
                    placeholder="아이디" 
                />
                <Input
                    name="useremail"
                    type="email"
                    placeholder="이메일 (ex brave@naver.com)" 
                />
                <Button>비밀번호 찾기</Button>
            </PasswordForm>  
        </Container>
        
    );
}

export default FindId;