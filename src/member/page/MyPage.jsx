import React, { useEffect, useState } from "react";
import styled from "styled-components";
import profile from '../../common/resources/img/profile.png';
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { FaCamera } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FcRules } from "react-icons/fc";
import document from "../resources/img/document.png";
import reviewIcon from "../resources/img/review.png";
import uuid from 'react-uuid';
import Swal from "sweetalert2";
import { BASE_URL } from "../../common/components/Util";

import StarRating from "../components/Rating";
import BadgeCount from "../components/Badge";
import Modal from "../../chat/components/Modal";
import Review from "../components/DetailReview";
import Loading from "../../common/components/Loading";

import axios from "axios";

//redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLocation, setProfileImg, setLogin, setMemberId } from "../redux/modules/login";

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
    background-position: center;
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
    background-repeat: no-repeat;
    object-fit: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    &:hover {
        filter: brightness(75%);
        .icon {
            opacity: 100;
            margin: 20% 0 0 40%;
        }
    }

    .icon {
        opacity: 0;
    }
`;

const Nickname = styled.div`
    width: 60%;
    margin-left: 20%;
    font-weight: 800;
    color: #000;
    text-align: center;
    font-size: 38px;
    border: none;
`;

const ModifyNickname = styled.input`
    width: 60%;
    margin-left: 20%;
    font-weight: 800;
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

    &.time {
        margin-bottom: 0%;
        margin-top: 3%;
    }
`;

const Modify = styled.button`
    font-weight: 500;
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
    height: 32%;
    border-radius: 15px;
    margin: 1% auto 6%;
    box-shadow: 0px 4px 15px -5px rgba(18, 23, 42, 0.1);
    display: flex;
    flex-direction: column;
    background-color: #f7f8fd;
    border: 1px dashed rgba(0,0,0,0.2);
`;

const BoardName = styled.div`
    width: 55%;
    height: 5%;
    font-size: 30px;
    font-weight: 800;
    margin-left: 10%;
    color: #000;

    &.write {
        margin-top: 5.5%;
    }
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

const Post = styled.div`
    width: 80%;
    font-size: 19px;
    font-weight: 500;
    color: #000;
    margin: 2.5% 0% 0.7% 0%;
    cursor: pointer;

    &.review {
        width: 78%;
        margin-bottom: 0%;
    } 
`;

const NullPost = styled.div`
    font-size: 30px;
    font-weight: 800;
    color: #000;
    margin: auto;
    text-align: center;
`;

const PostBox = styled.div`
    width: 96%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
`;

const Icon = styled.img`
    width: 4%;
    height: 60%;
    margin: 2% 2% 0 4%;

    &.review {
        width: 4.5%;
    }
`;

const RatingBox = styled.div`
    width: 18%;
    margin-top: 2.8%;
    margin-left: 5%;
`;


function MyPage(props) {

    const navigate = useNavigate();
    
    // state 선언부
    const [isClicked, setIsClicked] = useState(false);
    const [myself, setMySelf] = useState(false);

    //로딩 중 표시
    const [loading, setLoading] = useState(false);

    const [userInfo, setUserInfo] = useState({
        profileImage: null,
        nickname: null,
        intro: null,
        score: 0,
        medalCount: 0,
        posts : []
    });

    // redux로 변수, 함수 가져오기
    const { isLog, id, loc } = useSelector((state)=>({
        isLog: state.login.isLogin,
        id: state.login.memberId,
        loc: state.login.location,
    }), shallowEqual);

    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setId = (id) => dispatch(setMemberId(id));
    const setProfile = (pro) => dispatch(setProfileImg(pro));
    const setLog = (bool) => dispatch(setLogin(bool));

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
                Swal.fire({
                    title: "로그인 기간 만료",
                    text: "로그인 유지 기간이 만료되었습니다. 재로그인 해주세요.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
                navigate("/main");
            }else{
                console.log(error);
            }
            return false;
        };
    }
    
    const { memberid } = useParams();

    // 마이페이지 실행 시 
    useEffect(() =>{
        const loadMypage = async () => {
            // 비회원일 때 
            if(!JSON.parse(sessionStorage.getItem('savedData')).isLogin && !isLog){
                Swal.fire({
                    title: "비정상적인 접속",
                    text: "비회원은 프로필 페이지에 접속하실 수 없습니다.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
                navigate("/main");
                return;
            }
            else{
                if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
                    if (!await ReissueToken()) return;
                }
                
                //마이페이지에 처음 접근할 때
                if(JSON.parse(sessionStorage.getItem('savedUserInfo')).nickname === null){
                    setLoading(true);
                    axios.get(`${BASE_URL}/member/profile/${memberid}`,{
                        headers:{
                            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                        }
                    })
                    .then(function(response){
                            setUserInfo({
                                profileImage: (response.data.profileImage === null) ? profile : response.data.profileImage,
                                nickname: response.data.nickname,
                                intro: response.data.introduction,
                                score: response.data.score,
                                medalCount: response.data.medalCount,
                                posts: response.data.postListVo
                            });
                            sessionStorage.setItem('savedUserInfo', JSON.stringify({
                                profileImage: (response.data.profileImage === null) ? profile : response.data.profileImage,
                                nickname: response.data.nickname,
                                intro: response.data.introduction,
                                score: response.data.score,
                                medalCount: response.data.medalCount,
                                posts: response.data.postListVo
                            }));
                        }
                    )
                    .catch(function(error){
                        if(error.response.status === 401 && error.response.data.errorMessage === "Access Token 만료"){
                            ReissueToken();   
                        } else if (error.response.data.errorMessage ==="존재하지 않는 멤버ID" && error.response.status === 400) {
                            Swal.fire({
                                title: "존재하지 않는 회원",
                                html: "존재하지 않은 회원입니다. 다시 확인해주세요.",
                                icon: "error",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "확인",
                            });
                            navigate("/main");
                        }
                    });
                    setLoading(false);
                }else{
                    // 마이페이지에 처음 접근하는 것이 아닐 때
                    setUserInfo({
                        profileImage: JSON.parse(sessionStorage.getItem('savedUserInfo')).profileImage,
                        nickname: JSON.parse(sessionStorage.getItem('savedUserInfo')).nickname,
                        intro: JSON.parse(sessionStorage.getItem('savedUserInfo')).intro,
                        score: JSON.parse(sessionStorage.getItem('savedUserInfo')).score,
                        medalCount: JSON.parse(sessionStorage.getItem('savedUserInfo')).medalCount,
                        posts: JSON.parse(sessionStorage.getItem('savedUserInfo')).posts,
                    });
                }
            };
        }
        loadMypage();
    }, [memberid]);

    useEffect(()=>{
        if(id !== null){
            {(id===memberid)? setMySelf(true) : setMySelf(false)};
        }
    }, [id]);

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
            setCurrentImg(null);
            setCurrentIntro(null);
            setCurrentName(null);
            setIsClicked(false);
        }
        else {
            setIsClicked(true);
            setCurrentImg(userInfo.profileImage);
            setCurrentIntro(userInfo.intro);
            setCurrentName(userInfo.nickname);
        }
    };

    // 수정 완료 버튼
    const handleModify = async (e) => {       
        setLoading(true);
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if (!await ReissueToken()) return;
        }
        if((currentName === userInfo.nickname) && (currentIntro === userInfo.intro) && (currentImg === userInfo.profileImage)){
            setIsClicked(false);
        }else{
            if(currentName !== null && (currentName.length <= -1 || currentName.length > 6)) {
                Swal.fire({
                    title: "닉네임 형식 오류",
                    text: "닉네임은 2글자 이상 6글자 이하로 작성해주세요.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "확인",
                });
            }else{
                axios.patch(`${BASE_URL}/member/profile`, {
                    nickname: currentName,
                    introduction: currentIntro,
                    profileImg: currentImg
                }, {
                    headers:{
                        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                    }
                }).then(function(response){
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
                        medalCount: userInfo.medalCount,
                        posts: userInfo.posts
                    }));
                    sessionStorage.setItem('savedData', JSON.stringify({
                        isLogin: isLog,
                        id: id,
                        loc : {
                            latitude: loc.latitude,
                            longitude: loc.longitude
                        },
                        profileImg: response.data.profileImg
                    }));
                    setProfile(response.data.profileImg);
                    setCurrentImg(null);
                    setCurrentIntro(null);
                    setCurrentName(null);
                    setIsClicked(false);
                }).catch(function(err) {
                    if(err.response.status === 401 && err.response.data.errorMessage === "Access Token 만료"){
                        ReissueToken();
                    } else if((err.response.status === 400 && err.response.data.errorMessage === '닉네임 중복')) {
                        Swal.fire({
                            title: "닉네임 중복",
                            text: "현재 사용중인 닉네임입니다.",
                            icon: "error",
                            confirmButtonColor: "#d33",
                            confirmButtonText: "확인",
                        });
                        setIsClicked(true);
                    } else if((err.response.status === 400 && err.response.data.errorMessage === 'Invalid request content.')) {
                        Swal.fire({
                            title: "형식 오류",
                            text: "닉네임과 자기소개 중 형식에 맞지않게 작성된 항목이 있습니다.",
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
        setLoading(false);
    }

    const fileInput = React.createRef();
    const handleProfile = async (e) => {
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if (!await ReissueToken()) return;
        }
        fileInput.current.click();
    }
    const frm = new FormData();

    //프로필 이미지 불러오기
    const handleChange = async (e) => {
        if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
            if (!await ReissueToken()) return;
        }

        const files = e.target.files;
        var reg = /(.*?)\.(jpg|jpeg|png)$/;

        if (!files[0].name.match(reg)) {
            Swal.fire({
                title: "불가능한 파일 확장자",
                text: "프로필 이미지는 jpg, jpeg, png만 사용 가능합니다.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        else if (files[0].size>1024 ** 2 * 10){
            Swal.fire({
                title: "불가능한 파일 크기",
                text: "프로필 이미지는 10MB이하만 사용 가능합니다.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        } else if (files && files.length === 1) {
            setLoading(true);
            frm.append('file', files[0]);
            axios.post(`${BASE_URL}/image`, frm, {
                headers: {'Content-Type' : 'Multipart/form-data',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }}).then(function(response){
                handleCurrentImg(response.data.imgUrl);
            }).catch(function(err){
                if(err.response.status === 401 && err.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken();
                } else if((err.response.status === 400 && err.response.data.errorMessage === '파일 업로드 실패')) {
                    Swal.fire({
                        title: "파일 업로드 오류",
                        text: "파일 업로드 오류가 발생했습니다. 다시 시도해주세요.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                }
            })
            setLoading(false);
        }
    }

    const handleNull = (e) => {
        setCurrentImg(null);
        fileInput.current.value = "";
        e.preventDefault();
    }
    // 위치 정보
    const { geolocation } = navigator;
    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 1000 * 3600 * 24,
    }

    const SetLocation = async () => {
        const handleSuccess = async (pos) => {
            setLoading(true);
            if((JSON.parse(sessionStorage.getItem('jwt')).expirationTime)-60000 <= Date.now()){
                if (!await ReissueToken()) return;
            }
            axios.patch(`${BASE_URL}/member/location`, {
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
                });
                const presessionStorageId = JSON.parse(sessionStorage.getItem('savedData')).id;

                sessionStorage.setItem('savedData', JSON.stringify({
                    isLogin: true,
                    id: presessionStorageId,
                    loc : {
                        latitude: response.data.lat,
                        longitude: response.data.lng
                    }
                }));
            }).catch(function(err){
                if (err.response.status === 401 && err.response.data.errorMessage === "존재하지 않는 멤버ID") {
                    Swal.fire({
                        title: "존재하지 않는 회원",
                        html: "존재하지 않은 회원입니다. 다시 확인해주세요.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                }
            });
            setLoading(false);
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

    //글자수 over시 ...처리
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    const handleView = (postId) => {
        navigate(`/viewpost/${postId}`);
    }

    // 이미지 클릭 시, 모달 창
    const [modalOpen, setModalOpen] = useState(false);
    const [clickImg, setClickImg] = useState(null);

    const handleExpand = (img) => {
        if(img!==null) {
            setClickImg(img);
            setModalOpen(true);
        }
    }

    const [reviewOpen, setReviewOpen] = useState(false);
    const handleDetail = () => {
        setReviewOpen(true);
    }

    return(
        <Container>
            <Profile>
                {isClicked?<ModifyProfile style={{backgroundImage: `url(${(currentImg === null) ? profile : currentImg})`}}><FaCamera onClick={handleProfile} className="icon" size="45" color="#212121"/>
                <FaTrashAlt onClick={handleNull} className="icon" size="45" color="#212121"/></ModifyProfile>:
                <ProfileButton onClick={()=>{handleExpand(userInfo.profileImage)}} style={{backgroundImage: `url(${(userInfo.profileImage === null) ? profile : userInfo.profileImage})`}}/>}
                <input type="file" ref={fileInput} onChange={handleChange} style={{ display: "none" }}/>
                <Myself>
                    {isClicked?
                    <ModifyNickname type="text" value={currentName || ""} onChange={handleCurrentName}></ModifyNickname>
                    :<Nickname>{userInfo.nickname}</Nickname>}
                    {myself?<SettingButton onClick={handleIsClicked}><IoSettings size="23" color="#808080"/></SettingButton>:null}
                </Myself>
                {isClicked?
                    <ModifyIntro type="text" value={currentIntro || ""} onChange={handleCurrentIntro}></ModifyIntro>
                    :<Introduce>{(userInfo.intro === null || userInfo.intro === "")?"자기소개 문구가 작성되지 않았습니다.":userInfo.intro}</Introduce>}
                <Rating>
                    <StarRating value={userInfo.score} size="40"></StarRating>
                </Rating>
                <Badge><BadgeCount value={userInfo.medalCount}/></Badge>
                <ButtonContainer>
                    {isClicked?<ModifyButton onClick={handleModify}>수정완료</ModifyButton>:null}
                    {isClicked?<ModifyButton onClick={handleIsClicked}>취소</ModifyButton>:null}
                </ButtonContainer>
                {myself?<Modify onClick={()=>navigate("/authentication")}>비밀번호 재설정</Modify>:null}
                {myself?<Modify onClick={SetLocation}>위치정보 재설정</Modify>:null}
                
            </Profile>

            <Board>
                <BoardName className="write">{myself?"내가 작성한 글":userInfo.nickname+"(이)가 작성한 글"}</BoardName>
                <Box> 
                {userInfo.posts.length === 0 ? (<NullPost>게시글 없음</NullPost>) : (
                userInfo.posts.map((post) => (
                <PostBox key={uuid()}>
                    <Icon src={document} alt="게시글" />
                    <Post onClick={() => handleView(post.postId)}> {truncate(post.title, 30)}</Post>
                    <Introduce className="time">{post.createdAt}</Introduce>
                </PostBox>)))}
                    
                </Box>
                <BoardName>후기</BoardName>
                <Box>
                    <PostBox>
                        <Icon className="review" src={reviewIcon} alt="리뷰" />
                        <Post className="review" onClick={handleDetail}>{truncate("정말 너무너무너무너무너무너무너무너문머누머누머누머누머누머너무너무너무 친절해요", 25)}</Post>
                        <RatingBox><StarRating value="4.5" size="20" /></RatingBox>
                    </PostBox>
                    <PostBox>
                        <Icon className="review" src={reviewIcon} alt="리뷰" />
                        <Post className="review">{truncate("정말 너무너무너무너무너무너무너무너문머누머누머누머누머누머너무너무너무 친절해요", 25)}</Post>
                        <RatingBox><StarRating value="4.5" size="20" /></RatingBox>
                    </PostBox>
                    <PostBox>
                        <Icon className="review" src={reviewIcon} alt="리뷰" />
                        <Post className="review">{truncate("정말 너무너무너무너무너무너무너무너문머누머누머누머누머누머너무너무너무 친절해요", 25)}</Post>
                        <RatingBox><StarRating value="4.5" size="20" /></RatingBox>
                    </PostBox>
                </Box>
            </Board>
            {(modalOpen===true)&&<Modal img={clickImg} setModal={setModalOpen} setImg={setClickImg}/>}
            {(reviewOpen===true)&&<Review setModal={setReviewOpen} />}
            {(loading)&&<Loading />}
        </Container>
    );
}

export default MyPage;