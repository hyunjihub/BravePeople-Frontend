import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostItem from "../components/PostItem";
import { BiMenuAltRight } from "react-icons/bi";
import { useNavigate } from "react-router";
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

/* 무한스크롤 구현해야 함 */
const PostListBox = styled.div`
    width: 100%;
    height: 95%;
    overflow-y: scroll;
    margin: 0px auto;
    &::-webkit-scrollbar {
        display: none;
    }
    margin: 0px auto;
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
    margin-right: 6%;
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

    const handleWrite = (e) => {
        if(!isLog) {
            navigate("/login");
        }
        else navigate("./writepost/-1");
        e.preventDefault();
    }

    // 게시글 데이터 불러오기 api
    // 포스트 개수
    const [postLength, setPostLength] = useState(0);

    useEffect(()=>{
        window.scrollTo(0, 0);
        setLoading(true);
        setPage(0);
        // 로그인 상태일 때 게시글 조회
        if(JSON.parse(sessionStorage.getItem('savedData')).isLogin){
            axios.get(`http://13.209.77.50:8080/posts?type=${type}&distance=${selectedOption}&page=${page}&amount=7`,
            {
                headers:{
                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }
            })
            .then(function(response){
                setPostLength(response.data.data.length);
                setPostItems(response.data.data);
                if(!response.data.hasNext) { setLoading(false); }
            })
            .catch(function(error){
                if(error.response.status === 401 && error.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken();   
                } 
            })
            // 비로그인 상태일 때 게시글 조회
        }
        else{
            axios.get(`http://13.209.77.50:8080/posts?type=${type}&page=${page}&amount=7`)
            .then(function(response){
                setPostLength(response.data.data.length);
                setPostItems(response.data.data);
                if(!response.data.hasNext) { setLoading(false); }
            })
            .catch(function(error){
                console.log("비로그인 에러");
                console.log(error);
            })
        }   
    }, [ishelped]);

    // 거리 바꿀 시 데이터 불러오기
    useEffect(()=>{
        if(JSON.parse(sessionStorage.getItem('savedData')).isLogin){
            axios.get(`http://13.209.77.50:8080/posts?type=${type}&distance=${selectedOption}&page=0&amount=5`,
            {
                headers:{
                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }
            })
            .then(function(response){
                setPostLength(response.data.data.length);
                setPostItems(response.data.data);
                if(!response.data.data.hasNext) { setLoading(false); }
            })
            .catch(function(error){
                if(error.response.status === 401 && error.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken();   
                } 
            })
        }
    }, [selectedOption])

    // 무한 스크롤
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const pageEnd = useRef();
   
    const increasePage = () => { setPage(page => page + 1); };

    const handleScroll = (page) => {
        if(JSON.parse(sessionStorage.getItem('savedData')).isLogin){
            axios.get(`http://13.209.77.50:8080/posts?type=${type}&distance=${selectedOption}&page=${page}&amount=7`,
            {
                headers:{
                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }
            })
            .then(function(response){
                setPostItems(postItems => [...postItems, ...response.data.data]);
                if(!response.data.hasNext) { setLoading(false); }
            })
            .catch(function(error){
                if(error.response.status === 401 && error.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken();   
                } 
            })
        }
        else{
            axios.get(`http://13.209.77.50:8080/posts?type=원정대&page=${page}&amount=7`)
            .then(function(response){
                setPostItems(postItems => [...postItems, ...response.data.data]);
                if(!response.data.hasNext) { setLoading(false); }
            })
            .catch(function(error){
                console.log(error);
            });
        }
    };
    useEffect(()=>{
        if(loading) { handleScroll(page); }
    }, [page])

    useEffect(()=>{
        if(loading){
            const observer = new IntersectionObserver(
                entries => {
                    if(entries[0].isIntersecting){
                        increasePage();
                    }
                },
                { threshold: 0 }
            );
            observer.observe(pageEnd.current);
        }
    }, [loading]);

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
                {(postLength === 0) ? <div style={{width:"100%", height:"10%", textAlign:"center", marginTop:"200px", fontSize:"35px"}}>
                    등록된 게시물이 없습니다!</div> : 
                postItems.map((item)=>{
                    return <PostItem key={item.postId} value={item} />
                })}  
                <div style={{width:"100%", height:"30px"}} ref={pageEnd}></div>
            </PostListBox>
        </Wrapper>
    );
}

export default PostList;