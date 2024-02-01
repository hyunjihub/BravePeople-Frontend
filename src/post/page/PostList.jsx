import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostItem from "../components/PostItem";
import { BiMenuAltRight } from "react-icons/bi";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

//redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLocation, setProfileImg, setLogin, setMemberId } from "../../member/redux/modules/login";

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    margin: 15px auto;
`;

const Title = styled.div`
    width: 42%;
    height: 5%;
    line-height: 1.5;
    font-size: 40px;
    font-weight: 800;
    text-align: center;
    font-family: 'SUITE';
    margin: 50px auto;
`;

const PostListBox = styled.div`
    width: 100%;
    height: 95%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin: 0px auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const WriteButton = styled.button`
    width: 9%;
    height: 70%;
    background-color: #f8332f;
    font-family: 'SUITE';
    border: none;
    border-radius: 10px;
    color: #fff;
    font-weight: 600;
    font-size: 100%;
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    width: 42%;
    height: 6%;
    display: flex;
    justify-content: flex-end;
    margin: 0px auto;
`;

const DonerMenu = styled.button`
    height: 90%;
    border: none;
    background-color: #fff;
    margin-top: -1%;
    cursor: pointer;
    position: relative;
`;

const DropdownMenu = styled.ul`
    width: 5%;
    height: 15%;
    list-style: none;
    position: absolute;
    top: 28%;
    left: 62%;
    z-index: 99;
    border: 1px solid #d1d1d1;
    border-radius: 10px;
    font-weight: 500;
    background-color: #fff;
    padding: 0.5% 0.5% 0.5% 0.7%;
    box-sizing: border-box;
    box-shadow: 0px 0px 3px 1px rgba(190, 190, 190, 0.3);
`;

const DropdownOption = styled.li`
    margin : 0% 5% 17% 0%;
    font-size: 17px;
    cursor: pointer;

    &:hover {
        background-color: #ced4da;
        font-weight: 800;
    }
`;


function PostList(props) {

    const navigate = useNavigate();

    const [ postItems, setPostItems ] = useState([]);
    const { ishelped } = useParams();
    let type = ishelped === "helping" ? "원정대" : "의뢰인";

    //드롭다운 메뉴 구현
    const options = ['2', '5', '10', '0'];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('2');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setId = (id) => dispatch(setMemberId(id));
    const setProfile = (pro) => dispatch(setProfileImg(pro));
    const setLog = (bool) => dispatch(setLogin(bool));

    // redux로 변수, 함수 가져오기
    const { isLog } = useSelector((state)=>({
        isLog: state.login.isLogin,
    }), shallowEqual);

    // 토큰 재발급 요청 api
    const ReissueToken = async () => {
        try {
            const response = await axios.post("http://13.209.77.50:8080/auth/reissue",{
                accessToken: JSON.parse(sessionStorage.getItem('jwt')).access,
                refreshToken: JSON.parse(sessionStorage.getItem('jwt')).refresh
            })
            sessionStorage.setItem('jwt',JSON.stringify({
                access: response.data.accessToken,
                expirationTime: Date.now() + (5 * 60 * 1000),
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

    // 작성버튼
    const handleWrite = (e) => {
        if(!isLog) {
            navigate("/login");
        }
        else navigate("./writepost/-1");
        e.preventDefault();
    }

    //게시글 조회
    // 무한 스크롤
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const pageEnd = useRef();
    const [postLength, setPostLength] = useState(0);

    // 게시판 페이지 들어갈 때
    useEffect(()=>{
        window.scrollTo(0, 0);
        setPostItems([]);
        setLoading(true);
        setPage(0);
    }, [ishelped]);

    // 게시글 불러오기 함수
    useEffect(()=>{
        const loadPost = async () => {
            // 로그인 상태일 때 게시글 조회
            if(JSON.parse(sessionStorage.getItem('savedData')).isLogin){
                if(JSON.parse(sessionStorage.getItem('jwt')).expirationTime <= Date.now()) {
                    if (!await ReissueToken()) return;
                }

                axios.get(`http://13.209.77.50:8080/posts?type=${type}&distance=${selectedOption}&page=${page}&amount=7`,
                {
                    headers:{
                        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                    }
                })
                .then(function(response){
                    setPostLength(response.data.data.length);
                    setPostItems(postItems => [...postItems, ...response.data.data]);
                    setLoading(response.data.hasNext); 
                })
                .catch(function(error){
                    if(error.response.status === 401 && error.response.data.errorMessage === "Access Token 만료"){
                        ReissueToken();   
                    } 
                })
            }
            else{
                // 비로그인 상태일 때 게시글 조회
                axios.get(`http://13.209.77.50:8080/posts?type=${type}&page=${page}&amount=7`)
                .then(function(response){
                    setPostLength(response.data.data.length);
                    setPostItems(postItems => [...postItems, ...response.data.data]);
                    setLoading(response.data.hasNext); 
                })
                .catch(function(error){
                    console.log(error);
                });
            }
        }

        loadPost();
    }, [page])

    useEffect(()=>{
        if(loading){
            const observer = new IntersectionObserver(
                entries => {
                    if(entries[0].isIntersecting && loading){
                        setPage(page => page + 1);
                    }
                },
                { threshold: 0 }
            );
            observer.observe(pageEnd.current);
        }
    }, [loading]);

    // 거리 바꿀 시 데이터 불러오기
    useEffect(()=>{

        const changeDistance = async () => {
            if(JSON.parse(sessionStorage.getItem('savedData')).isLogin){
                if(JSON.parse(sessionStorage.getItem('jwt')).expirationTime <= Date.now()) {
                    if (!await ReissueToken()) return;
                }
    
                axios.get(`http://13.209.77.50:8080/posts?type=${type}&distance=${selectedOption}&page=${page}&amount=5`,
                {
                    headers:{
                        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                    }
                })
                .then(function(response){
                    setPostLength(response.data.data.length);
                    setPostItems(response.data.data);
                    setLoading(response.data.hasNext); 
                })
                .catch(function(error){
                    if(error.response.status === 401 && error.response.data.errorMessage === "Access Token 만료"){
                        ReissueToken();   
                    } 
                })
            }
        }
        changeDistance();
        
    }, [selectedOption])    

    // postItem에 들어갈 데이터 - postId, category, gender, title, createdAt, price
    return(
        <Wrapper>
            <Title>{type}</Title>
            <ButtonContainer>
                {(JSON.parse(sessionStorage.getItem('savedData')).isLogin) ? 
                <DonerMenu onClick={() => setIsOpen(!isOpen)}><BiMenuAltRight size="55" color="#f8332f"/></DonerMenu> : <div></div>}
                {isOpen&& (<DropdownMenu>
                    {options.map((option) => (
                    <DropdownOption
                        key={option}
                        onClick={() => handleOptionClick(option)}>
                        {(option === '0') ? "전역" : `${option}km`}
                    </DropdownOption>
                    ))}
                </DropdownMenu>)}
                <WriteButton onClick={handleWrite}>글쓰기</WriteButton>
            </ButtonContainer>
            
            <PostListBox>
                {((postLength === 0)&&(postItems.length === 0)) ? <div style={{width:"100%", height:"10%", textAlign:"center", marginTop:"200px", fontSize:"35px"}}>
                    등록된 게시물이 없습니다!</div> : 
                postItems.map((item)=>{
                    return <PostItem key={item.postId} value={item} />
                })}  
                {(loading) && <div style={{width:"100%", height:"30px"}} ref={pageEnd}></div>}
            </PostListBox>
        </Wrapper>
    );
}

export default PostList;