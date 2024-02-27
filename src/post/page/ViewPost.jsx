import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { PiGenderMaleBold } from "react-icons/pi";
import { PiGenderFemaleBold } from "react-icons/pi";
import profile from '../../common/resources/img/profile.png';
import StarRating from '../../member/components/Rating';
import Swal from "sweetalert2";
import { BASE_URL } from "../../common/components/Util";
import Loading from "../../common/components/Loading";

// axios
import axios from "axios";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLogin, setMemberId, setLocation, setProfileImg } from "../../member/redux/modules/login"

const Wrapper = styled.div`
    width: 42%;
    height: 750px;
    margin: 15px auto;
    position: relative;
`;

const Title = styled.div`
    width: 100%;
    height: 5%;
    line-height: 1.5;
    font-size: 40px;
    font-weight: 800;
    text-align: center;
    font-family: 'SUITE';
    margin: 50px 0 50px;
`;

const Line = styled.hr`
    color: #d1d1d1;
    opacity: 0.5;
    margin: 2.5% 0;
`;

const TitleBox = styled.div`
    width: 90%;
    height: 4%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 4.5% 5% 2%;
`;

const ContentTitle = styled.div`
    width: 93%;
    font-size: 150%;
    font-weight: 800;
    margin-right: 2%;
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
    height: 7.5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 4% 6% 2% 5%;
`;

const Profile = styled.img`
    width: 8.3%;
    height: 100%;
    border-radius: 50%;
    border: none;
    background-repeat: no-repeat;
    object-fit: cover;
    cursor: pointer;
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
    font-weight: 700;
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

    &:hover {
        background-color: #ff8f8f;
    }
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
    color: #000;
    margin: auto;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;
    hyphens: auto; 
    min-height: 80%;
    padding-bottom: 10%;
    white-space: pre-wrap;
`;

const StickyBox = styled.div`
    width: 75%;
    height: 8%;
    position: sticky;
    bottom: 0;
    background-color: #f8332f;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
`;

const ChatButton = styled.button`
    border: none;
    background-color: #f8332f;
    font-family: 'SUITE';
    font-weight: 800;
    font-size: 30px;
    color: #fff;
    margin: auto;
    cursor: pointer;
`;

const Price = styled.div`
    border: none;
    background-color: #f8332f;
    font-family: 'SUITE';
    font-weight: 800;
    font-size: 30px;
    color: #fff;
    margin: auto;
`;

const Image = styled.img`
    width: 65%;
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
    const { isLog, id } = useSelector((state)=>({
        isLog: state.login.isLogin,
        id: state.login.memberId,
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

    //로딩 중 표시
    const [loading, setLoading] = useState(false);

    // 버튼(달려가기, 부탁하기) 활성화 여부
    const [isActivate, setIsActivate] = useState(false);
    // 버튼(수정하기, 삭제하기) 활성화 여부
    const [isSelf, setIsSelf] = useState(false);

    // 데이터 불러오기
    useEffect(()=>{
        setLoading(true);
        axios.get(`${BASE_URL}/posts/${postid}`)
        .then(function(response){
            setPostData(response.data);
            if(response.data.disabled) {
                Swal.fire({
                    title: "비활성화 게시글",
                    text: "현 게시글은 의뢰가 종료된 게시글입니다.",
                    icon: "info",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
            }
            if(id === null) { setIsActivate(false); }
            else{
                if(id === response.data.memberId.toString()) { 
                    setIsSelf(true)
                    setIsActivate(false);
                }
                else {
                    setIsSelf(false)
                    setIsActivate(true);
                }
            }
        })
        .catch(function(error){
            console.log(error);
        });
        setLoading(false);
    }, []);

    // 토큰 재발급 요청 api
    const ReissueToken = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/reissue`,{
                accessToken: JSON.parse(sessionStorage.getItem('jwt')).access,
                refreshToken: JSON.parse(sessionStorage.getItem('jwt')).refresh
            })
            sessionStorage.setItem('jwt',JSON.stringify({
                access: response.data.accessToken,
                expirationTime: response.data.accessTokenExpiresIn,
                refresh: response.data.refreshToken
            }));
            return true;
        } catch(error){
            const logoutProcess = (title, text) => {
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
                Swal.fire({
                    title: title,
                    text: text,
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
                navigate("/main");
            }
            if(error.response.status === 401 && error.response.data.errorMessage === "Refresh Token 만료"){
                logoutProcess("로그인 기간 만료", "로그인 유지 기간이 만료되었습니다. 재로그인 해주세요.");
            }else{
                logoutProcess("비정상 접근 감지", "비정상적인 접근이 감지되어 로그아웃합니다.");
            }
            return false;
        };
    }

    //삭제 버튼 클릭시 삭제 API
    const handleDelete = async (e) => {
        setLoading(true);
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
                axios.delete(`${BASE_URL}/posts/${postid}`, {
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
                    {(postData.type==="원정대")? navigate("/postlist/helping"):navigate("/postlist/helped")}
                })
                .catch(function(error){
                    if(error.response.status === 404 && error.response.data.errorMessage === "게시글 없음"){
                        navigate("/error"); 
                    } else if(error.response.status === 400 && error.response.data.errorMessage === "진행중인 의뢰 존재") {
                        Swal.fire({
                            title: "삭제 불가",
                            text: "해당 게시글은 의뢰가 진행 중입니다. 의뢰 완료/취소 후 삭제해주세요.",
                            icon: "error",
                            confirmButtonColor: "#d33",
                            confirmButtonText: "확인",
                        });
                    } else if(error.response.status === 401){
                        if(!ReissueToken()) { return; }
                        else { handleDelete(e); }
                    }
                });
            }
        })
        setLoading(false);
    } 

    //클릭시 프로필 페이지 이동
    const handlePage = (e) => {
        if(!isLog) {
            navigate("/login");
        }
        else {
            sessionStorage.setItem('savedUserInfo', JSON.stringify({
                profileImage: null,
                nickname: null,
                intro: null,
                score: null,
                medalCount: null,
            }));
            navigate(`/profile/${String(postData.memberId)}`);
        }
        e.preventDefault();
    }

    // 부탁하기/달려가기 버튼
    const handleRequestButton = async(e) => {
        
        if(!isLog) {
            navigate("/login");
            return;
        }
        if(!isActivate) {
            Swal.fire({
                title: "본인이 작성한 게시글",
                text: "본인의 게시글로 원정 또는 의뢰를 진행할 수 없습니다.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
            return;
        }
        if(postData.disabled) {
            Swal.fire({
                title: "비활성화된 게시글",
                text: "해당 게시글은 의뢰/원정 요청이 중지된 게시글입니다.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
            return;
        }
        setLoading(true);
        axios.get(`${BASE_URL}/posts/${postid}/request`,
        {
            headers :{
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }
        })
        .then(function(response){
            sessionStorage.setItem('nowRoomId', JSON.stringify(response.data.roomId));
            navigate("/chat");
        })
        .catch(function(error){
            if(error.response.status === 401){
                if(!ReissueToken()) {return;}
                else { handleRequestButton(); }
            } else if(error.response.status === 400 && error.response.data.errorMessage === "글 작성자가 의뢰 진행 중") {
                Swal.fire({
                    title: "의뢰를 진행할 수 없습니다.",
                    html: "작성자가 현 게시글에서 다른 사용자와 의뢰를 진행 중입니다.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
            } else if(error.response.status === 400 && error.response.data.errorMessage === "상대방과 진행중인 의뢰 존재") {
                Swal.fire({
                    title: "의뢰를 진행할 수 없습니다.",
                    html: "작성자와 사용자 간의 의뢰가 진행 중입니다.<br>작성자와의 의뢰 완료 후, 다시 시도해주세요.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
            } else if(error.response.status === 400 && error.response.data.errorMessage === "이미 신청한 의뢰") {
                Swal.fire({
                    title: "의뢰 요청 중입니다.",
                    html: "현 게시글로 의뢰 요청 중입니다.<br>작성자의 의뢰 수락 후, 의뢰를 진행하실 수 있습니다.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
            }
        })
        setLoading(false);
    }

    return(
        <Wrapper>
            <Title>{postData.type}</Title>
            <Line />
            <TitleBox>
                <Category>{postData.category}</Category>
                <ContentTitle>{postData.title}</ContentTitle>
                {(postData.gender === "남성")?<PiGenderMaleBold size="40" color="#254995"/>:<PiGenderFemaleBold size="40" color="#a93957"/>}
            </TitleBox>
            <ProfileBox>
                <Profile onClick={handlePage} src={postData.profileImg?postData.profileImg:profile} alt="프로필"/>
                <NicknameBox>
                    <Rating>
                        <Nickname>{postData.nickname}</Nickname>
                        <StarRating value={postData.score} size="20"/>
                    </Rating>
                    <Time>{postData.createdAt}</Time>
                </NicknameBox>
                {(isSelf)?
                <ButtonContainer>
                    {(!postData.disabled)?<Button onClick={()=>{navigate(`/postlist/${(postData.type==="원정대")? "helping" : "helped"}/writepost/${postid}`)}}>수정</Button>
                    :<HiddenButton />}
                    <Button onClick={handleDelete}>삭제</Button>
                </ButtonContainer>:null}
            </ProfileBox>
            <Line />
            <Content>
                <Image src={postData.postImg?postData.postImg:null}/>
                {postData.contents}
            </Content>
            <StickyBox>
                <ChatButton onClick={handleRequestButton}>
                    {(postData.type==="원정대")? "의뢰하기" : "원정가기"}</ChatButton>
                <Price>{postData.price!=="-1"?postData.price+"원":"가격협의"}</Price>
            </StickyBox>
            {(loading)&&<Loading />} 
        </Wrapper>
    );
}

export default ViewPost;