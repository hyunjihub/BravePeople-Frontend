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
import { setAccessToken, setRefreshToken, setParamId } from "../redux/modules/login";


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
        profileImage: "",
        nickname: "",
        intro: "",
        score: 0,
        medalCount: 0
    });

    // redux로 변수, 함수 가져오기
    const { isLog, id, access, refresh, param } = useSelector((state)=>({
        isLog: state.login.isLogin,
        id: state.login.memberId,
        access: state.login.accessToken,
        refresh: state.login.refreshToken,
        param : state.login.paramId
    }), shallowEqual);

    const dispatch = useDispatch();
    const setAccess = (acc) => dispatch(setAccessToken(acc));
    const setRefresh = (ref) => dispatch(setRefreshToken(ref));
    const setParam = (paramid) => dispatch(setParamId(paramid));


    useEffect(()=>{
        (param === id) ? setMySelf(true) : setMySelf(false);
    }, [])

    useEffect(()=>{
        if(!isLog){
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
            axios.get(`http://13.209.77.50:8080/member/profile?memberid=${param}`,{
                headers:{
                    Authorization: `Bearer ${access}`
                }
            })
            .then(function(response){
                if(response.data.status === 401 && response.data.message === "Access Token 만료"){
                    axios.post("http://13.209.77.50:8080/auth/reissue",{
                        accessToken: access,
                        refreshToken: refresh,
                    })
                    .then(function(response){
                        setAccess(response.data.accessToken);
                        setRefresh(response.data.refreshToken);
                        alert("토큰 만료");
                        navigate("/main");
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }else{
                    setUserInfo({
                        profileImage: response.data.profileImage,
                        nickname: response.data.nickname,
                        intro: response.data.introduction,
                        score: response.data.score,
                        medalCount: response.data.medalCount
                    });
                }
            })
            .catch(function(error){
                console.log(error);
            });
        };
    }, []);

    const [currentName, setCurrentName] = useState(null);
    const preName = userInfo.nickname;

    const handleCurrentName = (e) => {
        setCurrentName(e.target.value);
    }

    const [currentIntro, setCurrentIntro] = useState(null);
    const preIntro = userInfo.intro;

    const handleCurrentIntro = (e) => {
        setCurrentIntro(e.target.value);
    }

    const handleIsClicked = () => {
        if(isClicked) {
            setIsClicked(false);
        }
        else {
            setIsClicked(true);
        }
    };

    const handleModify = (e) => {
        axios.patch("http://13.209.77.50:8080/member/profile", {
            nickname: currentName,
            introduction: currentIntro
        }, {
            headers:{
                Authorization: `Bearer ${access}`
            }
        }).then(function(response){
            if(response.data.status === 401 && response.data.message === "Access Token 만료"){
                axios.post("http://13.209.77.50:8080/auth/reissue",{
                    accessToken: access,
                    refreshToken: refresh,
                })
                .then(function(response){
                    setAccess(response.data.accessToken);
                    setRefresh(response.data.refreshToken);
                    alert("토큰 만료");
                    navigate("/main");
                })
                .catch(function(error){
                    console.log(error);
                });
            } else {
                setUserInfo({
                    profileImage: userInfo.profileImage,
                    nickname: response.data.nickname,
                    intro: response.data.introduction,
                    score: userInfo.score,
                    medalCount: userInfo.medalCount
                });
                setCurrentName(null);
                setCurrentIntro(null);
            }
        })
        .catch(function(error){
            alert("에러 발생");
            console.log(error);
        });
        setIsClicked(false);
    }

    const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";

    const fileInput = React.createRef();
    const handleProfile = (e) => {
        fileInput.current.click();
    }


    
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
            const frm = new FormData();
            frm.append('file', files[0]);

            axios.patch("http://13.209.77.50:8080/member/profile/image", frm, {
                headers: {'Content-Type' : 'Multipart/form-data',
                'Authorization': `Bearer ${access}`
            }
            }).then(function(response){
                if(response.data.status === 401 && response.data.message === "Access Token 만료"){
                    axios.post("http://13.209.77.50:8080/auth/reissue",{
                        accessToken: access,
                        refreshToken: refresh,
                    })
                    .then(function(response){
                        setAccess(response.data.accessToken);
                        setRefresh(response.data.refreshToken);
                        alert("토큰 만료");
                        navigate("/main");
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                } else {
                    setUserInfo({
                        profileImage: response.data.profileImage,
                        nickname: userInfo.nickname,
                        intro: userInfo.introduction,
                        score: userInfo.score,
                        medalCount: userInfo.medalCount
                    });
                }
                
            })
            .catch(function(error){
                alert("에러 발생");
                console.log(error);
            });
        }
    }

    return(
        <Container>
            <Profile>
                {isClicked?<ModifyProfile onClick={handleProfile} style={{backgroundImage: `url(${userInfo.profileImage ? userInfo.profileImage : profile})`}}><FaCamera className="icon" size="45" color="ccc"/></ModifyProfile>:
                <ProfileButton style={{backgroundImage: `url(${userInfo.profileImage ? userInfo.profileImage : profile})`}}/>}
                <input type="file" ref={fileInput} onChange={handleChange} style={{ display: "none" }}/>
                <Myself>
                    {isClicked?
                    <ModifyNickname type="text" defaultValue={preName} onChange={handleCurrentName}></ModifyNickname>
                    :<Nickname>{userInfo.nickname}</Nickname>}
                    {myself?<SettingButton onClick={handleIsClicked}><IoSettings size="23" color="#808080"/></SettingButton>:null}
                </Myself>
                {isClicked?
                    <ModifyIntro type="text" defaultValue={preIntro} onChange={handleCurrentIntro}></ModifyIntro>
                    :<Introduce>{(userInfo.intro == null || userInfo.intro == "")?"자기소개 문구가 작성되지 않았습니다.":userInfo.intro}</Introduce>}
                <Rating>
                    <StarRating value={userInfo.score}></StarRating>
                </Rating>
                <Badge><BadgeCount value={userInfo.medalCount} /></Badge>
                <ButtonContainer>
                    {isClicked?<ModifyButton onClick={handleModify}>수정완료</ModifyButton>:null}
                    {isClicked?<ModifyButton onClick={handleIsClicked}>취소</ModifyButton>:null}
                </ButtonContainer>
                <Modify onClick={()=>navigate("/authentication")}>비밀번호 재설정</Modify>
                <Modify >위치정보 재설정</Modify>
                
                
                
            </Profile>

            <Board>
                <Box>내가 쓴 글</Box>
                <Box>후기</Box>
            </Board>
        </Container>
    );
}

export default MyPage;