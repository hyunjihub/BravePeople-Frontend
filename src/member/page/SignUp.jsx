import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../common/components/Util";
import Loading from "../../common/components/Loading";
// restapi
import axios from 'axios';

const Wrapper = styled.div`
    height: 115vh;
    position: relative;
`;

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

    &:hover {
        background-color: #ff8f8f;
    }
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
    height: 45px;
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

function SignUp(props) {
    const navigate = useNavigate();
    const [gender, setGender] = useState("남성");
    const [isDisabled, setIsDisabled] = useState(false);
    const [email, setEmail] = useState('');
    const [emailId, setEmailId] = useState('');
    const [loc, setLoc] = useState({
        lat: "",
        lng: ""
    });

    //로딩 중 표시
    const [loading, setLoading] = useState(false);

    const handleGender = (e) => {
        if(e.target.value === "1") setGender("여성");
        else setGender("남성");
    }

    //패스워드 검증
    const isPassword = (str) => {
        const correctWord = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
        const Length = str.length>=8;
        return correctWord.test(str) && Length;
    }

    // 모든 입력 들어갔는지 체크
    const handleSignUp = (e) => {
        setLoading(true);
        if(e.target[0].value!=="" && e.target[3].value!=="" && e.target[4].value!=="" && e.target[5].value!==""){
            if(e.target[3].value.length>=6) {
                if(e.target[4].value === e.target[5].value) {
                    if (isPassword(e.target[4].value)) {
                        if (e.target[8].value.length>=2 && e.target[8].value.length<7) {
                            axios.post(`${BASE_URL}/auth/signup`, {
                                name: e.target[0].value,
                                gender: gender,
                                username: e.target[3].value,
                                pw: e.target[4].value,
                                email: email,
                                nickname: e.target[8].value,
                                lat: loc.lat,
                                lng: loc.lng,
                                emailId: emailId
                                })
                                .then(function(response){
                                    Swal.fire({
                                        title: "회원가입 완료",
                                        text: "정상적으로 회원가입이 완료되었습니다. 로그인해주세요.",
                                        icon: "success",
                                        confirmButtonColor: "#d33",
                                        confirmButtonText: "확인",
                                    });
                                    setLoading(false);
                                    navigate("/main");
                                })
                                .catch(function(error){
                                    setLoading(false);
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
                                    } else if (error.response.data.errorMessage ==="Invalid request content." && error.response.status === 400) {
                                        Swal.fire({
                                            title: "형식 오류",
                                            html: "입력 항목 일부의 형식이 잘못되었습니다.",
                                            icon: "error",
                                            confirmButtonColor: "#d33",
                                            confirmButtonText: "확인",
                                        });
                                    }
                                });
                        } else {
                            Swal.fire({
                                title: "닉네임 형식 오류",
                                text: "닉네임은 2글자 이상 6글자 이하이어야 합니다.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                        }   
                    } else {
                        Swal.fire({
                            title: "비밀번호 형식 오류",
                            text: "비밀번호는 영문과 숫자를 조합한 8글자 이상이어야 합니다.",
                            icon: "error",
                            confirmButtonColor: "#d33",
                            confirmButtonText: "확인",
                        });
                    }
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
        }


    const handleAuth = (e) => {
        setLoading(true);
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
                    axios.get(`${BASE_URL}/auth/email`, {
                        params: {
                            address: email
                        }
                    }).then(function(response){
                        Swal.fire('본인인증 메일이 전송되었습니다.', '입력하신 이메일주소로 본인인증을 진행하셔야 회원가입이 완료됩니다.', 'success');
                        setEmailId(response.data.emailId);
                        setLoading(false);
                    })
                    .catch(function(error){
                        if (error.response.data.errorMessage ==="이메일 중복" && error.response.status === 400) {
                            Swal.fire({
                                title: "이메일 중복",
                                html: "이미 회원가입 처리된 이메일입니다. 다른 이메일을 입력해주세요.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                        } else if (error.response.data.errorMessage ==="이미 가입 진행중인 이메일" && error.response.status === 400) {
                            Swal.fire({
                                title: "본인인증 대기 중인 이메일",
                                html: "입력하신 이메일로 이미 본인인증이 대기 중입니다. 메일함을 확인해주세요.<br>메일함에 없을 경우, 스팸함을 확인해주세요.",
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
                        }
                        setIsDisabled(false);
                        setLoading(false);
                    });
                    e.preventDefault();
                }
             });
        }
    }

    // 위치 정보
    const { geolocation } = navigator;
    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 1000 * 3600 * 24,
    }

    // 카카오맵 api 활용
    const [sigudong, setSigudong] = useState(""); 

    const mapApi = (latitude, longitude) => {
        axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
        {headers:{
            Authorization: `KakaoAK ae9e0cedf9e82516ded7194a84881362`
            }    
        })
        .then(function(response){
            if(response.data.documents.length !== 0){
                setSigudong(response.data.documents[0].address.region_2depth_name);
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }

    const SetLocation = (e) => {
        e.preventDefault();
        const handleSuccess = (pos) => {
            setLoc({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
            mapApi(pos.coords.latitude, pos.coords.longitude);
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

    const handleCancel = (e) => {
        navigate("/main");
    }

    return(
        <Wrapper>
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
                        type="text"
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
                        placeholder="위치확인 버튼을 눌러주세요"
                        value={sigudong}
                        disabled
                    /> 
                    <UniqueButton type="button" onClick={SetLocation}>위치확인</UniqueButton>
                </ForInset>
                <Button type="submit">회원가입</Button>
            </Form>
            <Button className="cancel" onClick={handleCancel} style={{"width":"400px", "margin":"0px auto 50px auto"}} >취소</Button>
            {(loading)&&<Loading />}
        </Wrapper>
        
    );
}

export default SignUp;