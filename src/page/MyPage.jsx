import React, { useEffect, useState } from "react";
import styled from "styled-components";
import profile from '../ui/dummy/profile.png';
import { useNavigate } from "react-router";
import { FaCamera } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import Swal from "sweetalert2";

import StarRating from "../components/Rating";
import BadgeCount from "../components/Badge";

import axios from "axios";

//redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLocation } from "../redux/modules/login";

const Container = styled.div`
    width: 1200px;
    height: 700px;
    margin: 100px auto;
    display: flex;
    flex-direction: row;
`;

const Profile = styled.div`
    width: 30%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Board = styled.div`
    width: 70%;
    height: 100%
    background-color: #fff;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
`;

const ProfileButton = styled.button`
    width: 60%;
    height: 30%;
    background-image : url(${profile});
    background-size: cover;
    no-repeat: none;
    border-radius: 999px;
    overflow: hidden;
    margin: 10% 20% 3%;
    border: none;
    cursor: pointer;
`;

const ModifyProfile = styled.button`
    width: 60%;
    height: 30%;
    background-size: cover;
    no-repeat: none;
    border-radius: 999px;
    overflow: hidden;
    margin: 10% 20% 3%;
    border: none;
    cursor: pointer;
    &:hover {
        filter: brightness(80%);
        .icon {
            opacity: 100;
        }
    }

    .icon {
        opacity: 0;
    }
`;

const Nickname = styled.div`
    width: 60%;
    margin-left: 20%;
    font-weight: 700;
    color: #000;
    text-align: center;
    font-size: 38px;
    border: none;
`;

const ModifyNickname = styled.input`
    width: 60%;
    margin-left: 20%;
    font-weight: 700;
    color: #000;
    text-align: center;
    font-size: 38px;
    font-family: 'SUITE';
`;

const ModifyIntro = styled.input`
    font-weight: 200;
    color: #777;
    font-size: 15px;
    text-align: center;
    margin-bottom: 5%;
    font-family: 'SUITE';
`;

const Introduce = styled.div`
    font-weight: 200;
    color: #777;
    font-size: 15px;
    text-align: center;
    margin-bottom: 5%;
`;

const Modify = styled.button`
    font-weight: 300;
    color: #333;
    font-size: 15px;
    text-align: center;
    border: none;
    background-color: #fff;
    font-family: 'SUITE';
    margin-bottom: 3%;
    cursor: pointer;
    &:hover {
        color: #000;
        font-weigh: 400;
    }
`;

const Rating = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5%;
`;

const Badge = styled.div`
    width: 20%;
    height: 12%;
    margin-right: 5%;
    margin-bottom: 10%;
`;

const SettingButton = styled.button`
    width: 10%;
    height: 5%;
    padding: 0px;
    border: none;
    position: absolute;
    top: 20%;
    left: 83%;
    cursor: pointer;
    background-color: #fff;
`;

const Myself = styled.div`
    width: 100%;
    height : 8%;
    background-color: #fff;
    position: relative;
`;

const Box = styled.div`
    width: 80%;
    height: 40%;
    border-radius: 15px;
    margin: 30px auto;
    box-shadow: 0px 4px 15px -5px rgba(18, 23, 42, 0.1);
    display: flex;
    flex-direction: column;
    background-color: #f7f8fd;
`;

const ModifyButton = styled.button`
    width: 48%;
    height: 90%;
    border-radius: 18px;
    background-color: #f8332f;
    color: #fff;
    border: none;
    font-family: 'SUITE';
    font-size: 16px;
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    width: 50%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10%;
`;

function MyPage(props) {

    const navigate = useNavigate();
    
    // state 선언부
    const [myself, setMySelf] = useState(true);
    const [isClicked, setIsClicked] = useState(false);

    const [userInfo, setUserInfo] = useState({
        profileImage: null,
        nickname: null,
        intro: null,
        score: 0,
        medalCount: 0
    });

    // redux로 변수, 함수 가져오기
    const { isLog, id, param } = useSelector((state)=>({
        isLog: state.login.isLogin,
        id: state.login.memberId,
        access: state.login.accessToken,
        refresh: state.login.refreshToken,
        param : state.login.paramId
    }), shallowEqual);

    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));

    // 토큰 재발급
    const ReissueToken = (msg) => {
        axios.post("http://13.209.77.50:8080/auth/reissue",{
            accessToken: JSON.parse(sessionStorage.getItem('jwt')).access,
            refreshToken: JSON.parse(sessionStorage.getItem('jwt')).refresh
        })
        .then(function(response){
            sessionStorage.setItem('jwt',JSON.stringify({
                access: response.data.accessToken,
                refresh: response.data.refreshToken
            }))
            alert(msg);
            navigate("/main");
        })
        .catch(function(error){
            console.log(error);
        });
    }

    useEffect(()=>{
        if(!JSON.parse(sessionStorage.getItem('savedData')).isLogin && !isLog){
            Swal.fire({
                title: "비정상적인 접속",
                text: "비회원은 마이페이지에 접속하실 수 없습니다.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
            navigate("/main");
        }
        else{
            //마이페이지에 처음 접근할 때
            (param === id) ? setMySelf(true) : setMySelf(false);
            if(JSON.parse(sessionStorage.getItem('savedUserInfo')).nickname === null){
                axios.get(`http://13.209.77.50:8080/member/profile?memberid=${param}`,{
                    headers:{
                        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                    }
                })
                .then(function(response){
                        setUserInfo({
                            profileImage: response.data.profileImage,
                            nickname: response.data.nickname,
                            intro: response.data.introduction,
                            score: response.data.score,
                            medalCount: response.data.medalCount
                        });
                        sessionStorage.setItem('savedUserInfo', JSON.stringify({
                            profileImage: response.data.profileImage,
                            nickname: response.data.nickname,
                            intro: response.data.introduction,
                            score: response.data.score,
                            medalCount: response.data.medalCount
                        }));
                    }
                )
                .catch(function(error){
                    if(error.response.status === 401 && error.response.data.errorMessage === "Access Token 만료"){
                        ReissueToken("토큰 기한이 만료로 페이지 요청이 취소되었습니다. 메인페이지로 이동합니다.");   
                    }
                    else {
                        console.log(error);
                    }
                });
            }else{
                // 마이페이지에 처음 접근하는 것이 아닐 때
                setUserInfo({
                    profileImage: JSON.parse(sessionStorage.getItem('savedUserInfo')).profileImage,
                    nickname: JSON.parse(sessionStorage.getItem('savedUserInfo')).nickname,
                    intro: JSON.parse(sessionStorage.getItem('savedUserInfo')).intro,
                    score: JSON.parse(sessionStorage.getItem('savedUserInfo')).score,
                    medalCount: JSON.parse(sessionStorage.getItem('savedUserInfo')).medalCount,
                });
            }
        };
    }, []);
    const [currentName, setCurrentName] = useState(null);

    const handleCurrentName = (e) => {
        setCurrentName(e.target.value);
        e.preventDefault();
    }

    const [currentIntro, setCurrentIntro] = useState(null);

    const handleCurrentIntro = (e) => {
        setCurrentIntro(e.target.value);
        e.preventDefault();
    }

    const [currentImg, setCurrentImg] = useState(null);

    const handleCurrentImg = (img) => {
        setCurrentImg(img);
    }

    // 수정 비/활성화
    const handleIsClicked = () => {
        if(isClicked) {
            setIsClicked(false);
        }
        else {
            setIsClicked(true);
            console.log(userInfo.intro);
            console.log(userInfo.nickname);
            console.log(userInfo.profileImage);
            handleCurrentImg(userInfo.profileImage);
            setCurrentName(userInfo.nickname);
            setCurrentIntro(userInfo.intro);
        }
    };

    // 수정 완료 버튼
    const handleModify = (e) => {
        if(currentName.length<=1 && currentName.length>6) {
            Swal.fire({
                title: "닉네임 형식 오류",
                text: "닉네임은 2글자 이상 6글자 이하로 작성해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        } else {
            axios.patch("http://13.209.77.50:8080/member/profile", {
            nickname: currentName,
            introduction: currentIntro,
            profileImg: currentImg
        }, {
            headers:{
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }
        }).then(function(response){
            console.log(response);
                setUserInfo({
                    ...userInfo,
                    nickname: response.data.nickname,
                    intro: response.data.introduction,
                    profileImage: response.data.profileImg,
                });
                sessionStorage.setItem('savedUserInfo', JSON.stringify({
                    profileImage: response.data.profileImg,
                    nickname: response.data.nickname,
                    intro: response.data.introduction,
                    score: userInfo.score,
                    medalCount: userInfo.medalCount
                }));
                setCurrentImg(response.data.profile);
                setCurrentIntro(response.data.introduction);
                setCurrentName(response.data.nickname);
                console.log(response.data.profileImg);
                console.log(response.data.nickname);
                console.log(response.data.introduction);
                setIsClicked(false);
            }).catch(function(err) {
                if(err.response.data.status === '401 UNAUTHORIZED' && err.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken("토큰기한 만료로 수정이 취소되었습니다. 메인 페이지로 이동합니다.");
                } else if((err.response.data.status === '400 BAD_REQUEST' && err.response.data.errorMessage === '닉네임 중복 오류')) {
                    Swal.fire({
                        title: "닉네임 중복",
                        text: "현재 사용중인 닉네임입니다.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                    setIsClicked(true);
                } else {
                    console.log(err);
                }
            })
        }
    }

    const fileInput = React.createRef();
    const handleProfile = (e) => {
        fileInput.current.click();
    }
    const frm = new FormData();

    //프로필 이미지 불러오기
    const handleChange = (e) => {
        const files = e.target.files;
        var reg = /(.*?)\.(jpg|jpeg|png)$/;

        if (!files[0].name.match(reg)) {
            Swal.fire({
                title: "불가능한 파일 확장자",
                text: "프로필 이미지는 jpg, jpeg, png만 사용가능합니다.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        else if (files && files.length > 0) {
            frm.append('file', files[0]);
            axios.post("http://13.209.77.50:8080/image", frm, {
                headers: {'Content-Type' : 'Multipart/form-data',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }}).then(function(response){
                handleCurrentImg(response.data.imgUrl);
            }).catch(function(err){
                if(err.response.data.status === '401 UNAUTHORIZED' && err.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken("토큰기한 만료로 수정이 취소되었습니다. 메인 페이지로 이동합니다.");
                } else if((err.response.data.status === '400 BAD_REQUEST' && err.response.data.errorMessage === '파일 업로드 실패')) {
                    Swal.fire({
                        title: "파일 업로드 오류",
                        text: "파일 업로드 오류가 발생했습니다. 다시 시도해주세요.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                } else {
                    console.log(err);
                }
            })
        }
    }
    // 위치 정보
    const { geolocation } = navigator;
    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 1000 * 3600 * 24,
    }

    const SetLocation = () => {
        const handleSuccess = (pos) => {
            axios.patch("http://13.209.77.50:8080/member/location", {
                lat:pos.coords.latitude,
                lng:pos.coords.longitude
            }, {
                headers:{
                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }
            }).then(function(response){
                    setLoc({
                        latitude: response.data.lat,
                        longitude: response.data.lng
                    })
            }).catch(function(error){
                if(error.response.status === 401 && error.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken("토큰기한 만료로 수정이 취소되었습니다. 메인 페이지로 이동합니다.");
                }else{
                console.log(error);
                }
            });
        }
        const handleError = (err) => {
                console.log(err);
        }
        if(!geolocation){
            console.log('Geolocation is not supported');
            return;
        }
        if(window.confirm("위치 정보를 새로 저장하시겠습니까?")){
            geolocation.getCurrentPosition(handleSuccess, handleError, geolocationOptions);
        }else{
            console.log("위치 정보 저장 취소");
        }
    }

    return(
        <Container>
            <Profile>
                {isClicked?<ModifyProfile onClick={handleProfile} style={{backgroundImage: `url(${currentImg ? currentImg : profile})`}}><FaCamera className="icon" size="45" color="ccc"/></ModifyProfile>:
                <ProfileButton style={{backgroundImage: `url(${userInfo.profileImage ? userInfo.profileImage : profile})`}}/>}
                <input type="file" ref={fileInput} onChange={handleChange} style={{ display: "none" }}/>
                <Myself>
                    {isClicked?
                    <ModifyNickname type="text" defaultValue={userInfo.nickname} onChange={handleCurrentName}></ModifyNickname>
                    :<Nickname>{userInfo.nickname}</Nickname>}
                    {myself?<SettingButton onClick={handleIsClicked}><IoSettings size="23" color="#808080"/></SettingButton>:null}
                </Myself>
                {isClicked?
                    <ModifyIntro type="text" defaultValue={(userInfo.intro) === null ? "널값임":userInfo.intro} onChange={handleCurrentIntro}></ModifyIntro>
                    :<Introduce>{(userInfo.intro === null || userInfo.intro === "")?"자기소개 문구가 작성되지 않았습니다.":userInfo.intro}</Introduce>}
                <Rating>
                    <StarRating value={userInfo.score}></StarRating>
                </Rating>
                <Badge><BadgeCount value={userInfo.medalCount} /></Badge>
                <ButtonContainer>
                    {isClicked?<ModifyButton onClick={handleModify}>수정완료</ModifyButton>:null}
                    {isClicked?<ModifyButton onClick={handleIsClicked}>취소</ModifyButton>:null}
                </ButtonContainer>
                <Modify onClick={()=>navigate("/authentication")}>비밀번호 재설정</Modify>
                <Modify onClick={SetLocation}>위치정보 재설정</Modify>  
            </Profile>

            <Board>
                <Box>내가 쓴 글</Box>
                <Box>후기</Box>
            </Board>
        </Container>
    );
}

export default MyPage;