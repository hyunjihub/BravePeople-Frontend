import React from "react";
import styled from "styled-components";

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
    font-family: 'SUITE-Regular';
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
    font-family: 'SUITE-Regular';
`;

const Container = styled.div`
    width: 1300px;
    display: flex;
    margin: auto;
    align-items: center;
    flex: space-between;
`;

function FindId(props) {
    return(
        <Container>
            <IdForm>
                <Title>아이디 찾기</Title>
                <Label>아이디</Label>
                <Input
                    name="useremail"
                    type="email"
                    placeholder="이메일 (ex brave@naver.com)" 
                />
                <Button>아이디 찾기</Button>
            </IdForm>
            <PasswordForm>
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