import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

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

    &:hover {
        background-color: #ff8f8f;
    }
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

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const emailCheck = (email) => {
        return emailRegEx.test(email);
    }

    const idFind = (e) => {
        if(emailCheck(e.target[0].value)) {
            if (e.target[0].value !== "") {
                axios.get('https://bravepeople.site:8080/auth/username', {
                    params: {
                        email: e.target[0].value
                    }
                })
                .then(function(response){
                    Swal.fire({
                        title: "아이디 찾기",
                        text: "사용자의 아이디는 " + response.data.username + "입니다.",
                        icon: "success",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                })
                .catch(function(error){
                    if(error.response.status === 400 && error.response.data.errorMessage === "존재하지 않는 이메일") {
                        Swal.fire({
                            title: "존재하지 않는 이메일",
                            text: "가입되지 않은 이메일입니다. 이메일을 다시 확인해주십시오.",
                            icon: "error",
                            confirmButtonColor: "#d33",
                            confirmButtonText: "확인",
                        });
                    }  
                });
                e.preventDefault();
            } else {
                Swal.fire({
                    title: "입력 정보 없음",
                    text: "이메일을 입력해주세요.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
            }
        } else {
            Swal.fire({
                title: "이메일 형식 오류",
                text: "올바른 이메일 주소를 입력해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        
        e.preventDefault();
    }

    const pwFind = (e) => {
        if(e.target[0].value !== "" && e.target[1].value !== "") {
            if(e.target[0].value.length>6) {
                if(emailCheck(e.target[1].value)) {
                    axios.get('https://bravepeople.site:8080/auth/pw', {
                        params: {
                            username: e.target[0].value,
                            email: e.target[1].value,
                        }
                    })
                    .then(function(response){
                        console.log(response);
                        Swal.fire({
                            title: "비밀번호 재설정 링크 전송",
                            text: "입력하신 이메일로 재설정 링크가 전송되었습니다. 메일함을 확인해주세요.",
                            icon: "success",
                            confirmButtonColor: "#d33",
                            confirmButtonText: "확인",
                        });
                        navigate("/main");
                    })
                    .catch(function(error){
                        console.log(error);
                        if(error.response.status === 400 && error.response.data.errorMessage === "이메일 전송 오류") {
                            Swal.fire({
                                title: "이메일 전송 오류",
                                text: "이메일 전송 오류가 발생했습니다. 다시 클릭해주세요.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                        } else if (error.response.data.errorMessage ==="Invalid request content." && error.response.status === 400) {
                            Swal.fire({
                                title: "형식 오류",
                                html: "입력 항목 일부의 형식이 잘못되었습니다.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                        } else if(error.response.status === 400 && error.response.data.errorMessage === "존재하지 않는 아이디") {
                            Swal.fire({
                                title: "존재하지 않는 아이디",
                                text: "가입되지 않은 아이디입니다. 아이디를 다시 확인해주십시오.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                        } else if(error.response.status === 400 && error.response.data.errorMessage === "존재하지 않는 이메일") {
                            Swal.fire({
                                title: "존재하지 않는 이메일",
                                text: "가입되지 않은 이메일입니다. 이메일을 다시 확인해주십시오.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                        } else if (error.response.data.errorMessage ==="이메일 전송 오류" && error.response.status === 400) {
                            Swal.fire({
                                title: "이메일 전송 오류",
                                html: "없는 이메일 주소 입니다. 이메일 주소를 다시 확인해주세요.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                        } else {
                            Swal.fire({
                                title: "계정 정보 없음",
                                text: "입력하신 정보와 일치하는 계정 정보가 없습니다.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                        }
                    });
                } else {
                    Swal.fire({
                        title: "이메일 형식 오류",
                        text: "올바른 이메일 주소를 입력해주세요.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                } 
            } else {
                Swal.fire({
                    title: "아이디 형식 오류",
                    text: "아이디는 6글자 이상입니다. 다시 한 번 확인해주세요.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
            }    
        } else {
            Swal.fire({
                title: "입력 정보 없음",
                text: "아이디나 이메일이 입력되지 않았습니다. 다시 한 번 확인해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        e.preventDefault();
    }

    return(
        <Container>
            <IdForm onSubmit={idFind}>
                <Title>아이디 찾기</Title>
                <Label>아이디</Label>
                <Input
                    name="useremail"
                    type="text"
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
                    type="text"
                    placeholder="이메일 (ex brave@naver.com)" 
                />
                <Button>비밀번호 찾기</Button>
            </PasswordForm>  
        </Container>
        
    );
}

export default FindId;