import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

// restapi
import axios from 'axios';

// redux

const Title = styled.div`
    font-size: 40px;
    font-weight: 800;
    margin: 70px 0 50px;
    text-align: center;
`;

const Form = styled.form`
    width: 400px;
    margin: auto auto -10px auto;
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
    font-family: 'SUITE';
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
    font-family: 'SUITE';
    cursor: pointer;
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
    font-family: 'SUITE';
    cursor: pointer;
`;

const RadioButton = styled.input`
    width : 20px;
    height: 20px;

    accent-color: #f8332f;
    margin-right: 5px;
    cursor: pointer;
`;

const RadioBox = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
`;

const RadioLabel = styled.label`
    font-family: 'SUITE';
    font-size: 17px;
    margin-right: 10px;
`;


/* 인증 버튼 클릭시 인증 완료 버튼으로 변경되고 인증 완료 버튼 누를시 백으로 인증여부 물어봄, 위치확인은 권한설정*/
/* 인증 버튼 누를 시, 위에 안내 문구를 이메일 인증 완료 후, 인증 완료 버튼을 눌러주세요로 변경돼야 함*/
function SignUp(props) {
    const navigate = useNavigate();
    const [gender, setGender] = useState("남성");
    const [isDisabled, setIsDisabled] = useState(false);
    const [email, setEmail] = useState('');
    const [emailId, setEmailId] = useState('');

    const handleGender = (e) => {
        if(e.target.value === "1") setGender("여성");
        else setGender("남성");
    }

    // 위도랑 경도 파라미터 추가해야하고, 중복검사 추가해야함 
    const handleSignUp = (e) => {
        console.log("회원가입 중!");
        if(e.target[0].value !== "" && e.target[3].value !== ""){
            if(e.target[3].value.length>6) {
                if(e.target[4].value === e.target[5].value) {
                    axios.post('http://13.209.77.50:8080/auth/signup', {
                    name: e.target[0].value,
                    gender: gender,
                    username: e.target[3].value,
                    pw: e.target[4].value,
                    email: email,
                    nickname: e.target[8].value,
                    lat: "123.123456789012345",
                    lng: "123.123456789012345",
                    emailId: emailId
                    })
                    .then(function(response){
                        console.log(response);
                        navigate("/main");
                    })
                    .catch(function(error){
                        if(error.response.data.errorMessage ==="이메일 미인증" && error.response.status === 400) {
                            Swal.fire({
                                title: "이메일 미인증",
                                text: "입력하신 이메일로 본인인증을 진행해주세요. 전송된 이메일이 없을 시 스팸함을 확인해주세요.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                        } else if (error.response.data.errorMessage ==="아이디 중복" && error.response.status === 400) {
                            Swal.fire({
                                title: "아이디 중복",
                                text: "입력하신 아이디는 현재 가입되어 있습니다.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                        } else if (error.response.data.errorMessage ==="닉네임 중복" && error.response.status === 400) {
                            Swal.fire({
                                title: "닉네임 중복",
                                text: "현재 입력하신 닉네임을 사용하는 회원이 존재합니다.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                        }
                    });
                } else {
                    Swal.fire({
                        title: "비밀번호 불일치",
                        text: "비밀번호와 비밀번호 확인에 입력하신 두 비밀번호가 다릅니다.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                }
            } else {
                Swal.fire({
                    title: "아이디 사용 불가능",
                    text: "아이디는 6글자 이상으로 작성해주세요.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
            }  
        }else{
            Swal.fire({
                title: "모든 항목이 입력되지 않았습니다.",
                text: "입력하지 않은 항목이 없는지 다시 한 번 확인해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
        
            });
        }
        e.preventDefault();
        navigate("/main");
    }

    // 인증버튼 누를시 인증완료 버튼 + 안내문구 수정 (위 주석 참고) 인증완료 버튼 누를시 백에서부터 인증 완료됐는지 정보 가져옴 -> alert로 인증완료 여부 알려줌
    const handleAuth = (e) => {

        const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
        const emailCheck = (email) => {
            return emailRegEx.test(email);
        }

        if(email==="") {
            Swal.fire({
                title: "이메일 입력 없음",
                text: "이메일 주소를 입력해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        } else if (!emailCheck(email)) {
            Swal.fire({
                title: "이메일 형식 오류",
                text: "올바른 이메일 주소를 입력해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        } else {
            Swal.fire({
                title: "이메일 주소 수정 불가",
                text: "작성하신 이메일이 맞는지 다시 한 번 확인해주세요.",
                icon: "warning",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
                showCancelButton: true, 
                cancelButtonColor: '#3085d6', 
                cancelButtonText: '취소',
    
            }).then(result => {
                if (result.isConfirmed) {
                    setIsDisabled(true);
                    axios.get('http://13.209.77.50:8080/auth/email', {
                        params: {
                            address: email
                        }
                    }).then(function(response){
                        Swal.fire('본인인증 메일이 전송되었습니다.', '입력하신 이메일주소로 본인인증을 진행하셔야 회원가입이 완료됩니다.', 'success');
                        setEmailId(response.data.emailId);
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                    e.preventDefault();
                }
             });
        }
    }

    // 버튼 클릭시 위치정보 (시,군,구) 위치정보 input의 기본 텍스트로 입력됨, 위도와 경도 값을 받아와서 나중에 회원가입할 때 같이 보낼 수 있게 저장해야 할 듯
    // 위치 정보
    const { geolocation } = navigator;
    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 1000 * 3600 * 24,
    }

    const SetLocation = () => {
        const handleSuccess = (pos) => {
            console.log(pos);
        }
        const handleError = (err) => {
                console.log(err);
        }
        if(!geolocation){
            console.log('Geolocation is not supported');
            return;
        }
        if(window.confirm("위치 정보를 불러오시겠습니까?")){
            geolocation.getCurrentPosition(handleSuccess, handleError, geolocationOptions);
        }else{
            console.log("위치 정보 저장 취소");
        }
    }
    
    const handleLocation = (e) => {
        SetLocation();
    }

    return(
        <div>
            <Form>
            <Title>회원가입</Title>
            <Label>성함 *</Label>
            <Input
                name="username"
                type="text"
                placeholder="성함" 
            />
            <Label>성별 *</Label>
            <RadioBox>
                <RadioButton type="radio" value="0" checked={gender==="남성"} onChange={handleGender}></RadioButton>
                <RadioLabel>남성</RadioLabel>
                <RadioButton type="radio" value="1" checked={gender==="여성"} onChange={handleGender}></RadioButton>
                <RadioLabel>여성</RadioLabel>
            </RadioBox>
            <Label>아이디 *</Label>
            <Detail>6글자 이상</Detail>           
            <Input
            name="userid"
            type="text"
            placeholder="아이디" 
            />
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
                    disabled={isDisabled}
                    onChange={(e)=>setEmail(e.target.value)}
                /> 
                <UniqueButton type="button" onClick={handleAuth} disabled={isDisabled}>인증</UniqueButton>
            </ForInset>
            <Label>닉네임 *</Label>          
            <Input
                name="nickname"
                type="text"
                placeholder="닉네임"
            /> 
            <Label>내 위치 *</Label>
            <ForInset>            
                <Input
                    name="location"
                    type="text"
                    placeholder="이 문구가 나타날 시, 위치확인 버튼을 눌러주세요"
                    disabled
                /> 
                <UniqueButton onClick={handleLocation}>위치확인</UniqueButton>
            </ForInset>
            <Button type="submit">회원가입</Button>
        </Form>
        <Button onClick={handleSignUp} style={{"width":"400px", "margin":"0px auto 50px auto"}} >취소</Button>
        </div>
        
    );
}

export default SignUp;