import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";

// restapi
import axios from 'axios';

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

    const handleGender = (e) => {
        if(e.target.value === "1") setGender("여성");
        else setGender("남성");
    }

    // 여기서 위도랑 경도 파라미터 추가해야하고, 중복검사 추가해야함 
    const handleSignUp = (e) => {
        console.log(e);
        if(e.target[0].value !== "" && e.target[3].value !== ""){
            if(e.target[3].value.length>6) {
                if(e.target[4].value === e.target[5].value) {
                    axios.post('http://13.209.77.50:8080/auth/signup', {
                    name: e.target[0].value,
                    gender: gender,
                    username: e.target[3].value,
                    pw: e.target[4].value,
                    email: e.target[6].value,
                    nickname: e.target[8].value,
                    lat: "123.123456789012345",
                    lng: "123.123456789012345"
                    })
                    .then(function(response){
                        console.log(response);
                        navigate("/main");
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                } else {
                    alert("입력하신 비밀번호가 일치하지 않습니다.");
                }
            } else {
                alert("아이디는 6글자 이상으로 작성해야 합니다.");
            }  
        }else{
            alert("모든 항목이 입력되지 않았습니다.");
        }
        e.preventDefault();
    }

    // 인증버튼 누를시 인증완료 버튼 + 안내문구 수정 (위 주석 참고) 인증완료 버튼 누를시 백에서부터 인증 완료됐는지 정보 가져옴 -> alert로 인증완료 여부 알려줌
    const handleAuth = (e) => {
        
    }

    // 버튼 클릭시 위치정보 (시,군,구) 위치정보 input의 기본 텍스트로 입력됨, 위도와 경도 값을 받아와서 나중에 회원가입할 때 같이 보낼 수 있게 저장해야 할 듯
    const handleLocation = (e) => {

    }

    return(
        <div>
            <Form onSubmit={handleSignUp}>
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
                /> 
                <UniqueButton>인증</UniqueButton>
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
                <UniqueButton>위치확인</UniqueButton>
            </ForInset>
            <Button type="submit">회원가입</Button>
        </Form>
        <Button onClick={()=>navigate("/main")} style={{"width":"400px", "margin":"0px auto 50px auto"}} >취소</Button>
        </div>
        
    );
}

export default SignUp;