import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { PiGenderMaleBold } from "react-icons/pi";
import { PiGenderFemaleBold } from "react-icons/pi";
import profile from '../../common/resources/img/profile.png';
import StarRating from '../../member/components/Rating';
import Swal from "sweetalert2";

// axios
import axios from "axios";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLogin, setMemberId, setLocation, setProfileImg } from "../../member/redux/modules/login";

const Wrapper = styled.div`
    width: 40%;
    height: 100vh;
    margin: 15px auto;
`;

const Title = styled.div`
    width: 100%;
    height: 5%;
    line-height: 1.5;
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    font-family: 'SUITE';
    margin: 50px 0 50px;
`;

const Line = styled.hr`
    color: #d1d1d1;
    opacity: 0.5;
    margin: 3% 0;
`;

const TitleBox = styled.div`
    width: 90%;
    height: 3%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 5%;
`;

const ContentTitle = styled.div`
    width: 95%;
    font-size: 28px;
    font-weight: 600;
`;

const Category = styled.div`
    width: 9%;
    height: 100%;
    background-color: #f8332f;
    border-radius: 15px;
    color: #fff;
    font-size: 18px;
    margin-right: 2%;
    text-align: center;
    box-sizing: border-box;
    padding: 3px 0px 0px 0px;
`;

const ProfileBox = styled.div`
    width: 90%;
    height: 5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2% 6% ;
`;

const Profile = styled.img`
    width: 7%;
    height: 100%;
    border-radius: 50%;
    border: none;
`;

const NicknameBox = styled.div`
    width: 70%;
    height: 90%;
    display: flex;
    flex-direction: column;
    margin: 2% 2% ;
`;

const Nickname = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-right: 1%;
`;

const Time = styled.div`
    font-size: 15px;
    font-weight: 200;
    color: #868e96;
`;

const Button = styled.button`
    width: 100%;
    height: 60%;
    border-radius: 18px;
    background-color: #f8332f;
    color: #fff;
    border: none;
    font-family: 'SUITE';
    font-size: 16px;
    cursor: pointer;
    margin: 5% 2% 0;
`;

const HiddenButton = styled.div`
    width: 100%;
    height: 60%;
    border-radius: 18px;
    color: #fff;
    border: none;
    font-family: 'SUITE';
    font-size: 16px;
    cursor: pointer;
    margin: 5% 2% 0;
`;

const ButtonContainer = styled.div`
    width: 18%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2%;
`;

const Content = styled.div`
    width: 90%;
    height: 70%;
    color: #000;
    margin: auto;
    font-size: 20px;
    display: flex;
    flex-direction: column;
`;

const StickyBox = styled.div`
    width: 70%;
    height: 7%;
    background-color: #f8332f;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    position: sticky;
    bottom: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
`;

const ChatButton = styled.button`
    border: none;
    background-color: #f8332f;
    font-family: 'SUITE';
    font-weight: 600;
    font-size: 30px;
    color: #fff;
    margin: auto;
`;

const Price = styled.div`
    border: none;
    background-color: #f8332f;
    font-family: 'SUITE';
    font-weight: 600;
    font-size: 30px;
    color: #fff;
    margin: auto;
`;

const Image = styled.img`
    width: 70%;
    margin: 2% auto 3%;
`;

const Rating = styled.div`
    display: flex;
    flex-direction: row;
    height: 50%;
`;

function ViewPost(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const setLog = (isLogin) => dispatch(setLogin(isLogin));
    const setId = (id) => dispatch(setMemberId(id));
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setProfile = (profileImg) => dispatch(setProfileImg(profileImg));

    // redux로 변수, 함수 가져오기
    const { isLog, id, param, loc } = useSelector((state)=>({
        isLog: state.login.isLogin,
        id: state.login.memberId,
        param : state.login.paramId,
        loc: state.login.location,
    }), shallowEqual);

    const { postid } = useParams();
    const [postData, setPostData] = useState({
        type: "",
        category: "",
        title: "",
        gender: "",
        img: "",
        nickname: "",
        createdAt: "",
        contents: "",
        price: ""
    });

    // 버튼들(수정, 삭제, 달려가기, 부탁하기) 활성화 여부
    const [isActivate, setIsActivate] = useState(false);

    useEffect(()=>{
        axios.get(`http://13.209.77.50:8080/posts/${postid}`)
        .then(function(response){
            setPostData(response.data);
            if((id !== null)&&(id === response.data.memberId.toString())&&(!response.data.disabled)){ setIsActivate(true); }
            else { setIsActivate(false); }
        })
        .catch(function(error){
            console.log(error);
        });
    }, []);

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

    //수정 버튼 클릭시 이동
    const handleModify = (e) => {
        e.preventDefault();
    }

    //삭제 버튼 클릭시 삭제 API
    const handleDelete = (e) => {
        Swal.fire({
            title: "삭제하시겠습니까?",
            text: "삭제된 게시글은 복구할 수 없습니다. 정말 삭제하시겠습니까?",
            icon: "warning",
            confirmButtonColor: "#d33",
            confirmButtonText: "확인",
            showCancelButton: true, 
            cancelButtonColor: '#3085d6', 
            cancelButtonText: '취소',
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete(`http://13.209.77.50:8080/posts/${postid}`, {
                    headers:{
                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }})
                .then(function(response){
                    Swal.fire({
                        title: "삭제 완료",
                        text: "정상적으로 삭제되었습니다.",
                        icon: "success",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                    navigate(-1);
                })
                .catch(function(error){
                    if(error.response.status === 401 && error.response.data.errorMessage === "Access Token 만료"){
                        ReissueToken();   
                    } else if(error.response.status === 404 && error.response.data.errorMessage === "게시글 없음"){
                        navigate("/error"); 
                    }
                });
            }
        })
    } 

    //클릭시 프로필 페이지 이동
    const handlePage = (e) => {
    }

    const checkFunc = () => {
        console.log(isActivate);
    }

    return(
        <Wrapper>
            <div><button onClick={checkFunc}>TEST</button></div>
            <Title>{postData.type}</Title>
            <Line />
            <TitleBox>
                <Category>{postData.category}</Category>
                <ContentTitle>{postData.title}</ContentTitle>
                {(postData.gender === "남성")?<PiGenderMaleBold size="40" color="#254995"/>:<PiGenderFemaleBold size="40" color="#a93957"/>}
            </TitleBox>
            <ProfileBox>
                <Profile src={postData.profileImg?postData.profileImg:profile} alt="프로필"/>
                <NicknameBox>
                    <Rating>
                        <Nickname>{postData.nickname}</Nickname>
                        <StarRating value={"3.8"} size="20"/>
                    </Rating>
                    <Time>{postData.createdAt}</Time>
                </NicknameBox>
                {(isActivate)?
                <ButtonContainer>
                    <Button>수정</Button>
                    <Button onClick={handleDelete}>삭제</Button>
                </ButtonContainer>:null}
            </ProfileBox>
            <Line />
            <Content>
                <Image src={postData.postImg?postData.postImg:null}/>
                {postData.contents}
            </Content>
            <StickyBox>
                <ChatButton disabled={!isActivate} onClick={()=>{alert(`${(postData.type==="원정대")? "의뢰하기" : "원정가기"}버튼 눌림`)}}>
                    {(postData.type==="원정대")? "의뢰하기" : "원정가기"}</ChatButton>
                <Price>{postData.price!=="-1"?postData.price+"원":"가격협의"}</Price>
            </StickyBox>
        </Wrapper>
    );
}

export default ViewPost;