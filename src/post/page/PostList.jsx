import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostItem from "../components/PostItem";
import { BiMenuAltRight } from "react-icons/bi";
import { useNavigate } from "react-router";
import uuid from 'react-uuid';
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../common/components/Util";

//redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLocation, setProfileImg, setLogin, setMemberId } from "../../member/redux/modules/login";

//무한스크롤
import { useInView } from "react-intersection-observer";

const Wrapper = styled.div`
    width: 100%;
    height: 1000px;
    margin: 15px auto;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
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
    cursor: pointer;

    &:hover {
        background-color: #ff8f8f;
    }
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
    width: 150%;
    height: 290%;
    list-style: none;
    position: absolute;
    top: 80%;
    z-index: 99;
    border: 1px solid #d1d1d1;
    border-radius: 10px;
    font-weight: 500;
    background-color: #fff;
    padding: 0.5% 0.5% 0.5% 0.5%;
    box-sizing: border-box;
    box-shadow: 0px 0px 3px 1px rgba(190, 190, 190, 0.3);
`;

const Current = styled.div`
    font-size: 22px;
    font-weight: 700;
    margin-top: 1%;
`;

const DropdownOption = styled.li`
    margin : 10% 5% 17% 5%;
    font-size: 17px;
    cursor: pointer;
    &:hover {
        background-color: #f8332f;
        color: #fff;
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
    const [pageEnd, inView] = useInView();
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);

    const setDefault = () =>{
        return new Promise( (resolve, reject) => { 
            setLoading(true); 
            window.scrollTo(0, 0);
            setPostItems([]);
            setPage(0);
            setHasNext(true);
            resolve(); 
        });
    };
    // 게시판 페이지 들어갈 때
    useEffect(()=>{
        setDefault()
        .then(()=>setLoading(false));
    }, [ishelped]);

    // 게시글 불러오기 함수
    // 로그인 상태일 때 게시글 조회
    const loadPost = async () => {
        if(JSON.parse(sessionStorage.getItem('savedData')).isLogin){
            axios.get(`${BASE_URL}/posts?type=${type}&distance=${selectedOption}&page=${page}&amount=5`,
            {
                headers:{
                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }
            })
            .then(function(response){
                setPostItems(postItems => [...postItems, ...response.data.data]);
                setHasNext(response.data.hasNext);
                setPage((page)=>(page+1));
                setLoading(false);
            })
            .catch(function(error){
                if(error.response.status === 401){
                    ReissueToken();
                    setLoading(false);
                } 
            })
        }
        else{
            // 비로그인 상태일 때 게시글 조회
            axios.get(`${BASE_URL}/posts?type=${type}&page=${page}&amount=5`)
            .then(function(response){
                setPostItems(postItems => [...postItems, ...response.data.data]);
                setHasNext(response.data.hasNext);
                setPage((page)=>(page+1));
                setLoading(false);
            })
            .catch(function(error){
            });
        }
    }

    useEffect(()=>{
        if(!loading){
            setDefault().then( ()=> { setLoading(false); })
        }
    }, [selectedOption])    

    const setLoad = async(load) => {
        setLoading(load);
    }

    useEffect(()=>{
        if(inView) {
            const setData = async() => {
                await setLoad(true);
                loadPost();
            }
            setData();
        } 
    }, [inView])

    return(
        <Wrapper>
            <Title>{type}</Title>
            <ButtonContainer>
                {(JSON.parse(sessionStorage.getItem('savedData')).isLogin) ?<Current>{(selectedOption==="0")? "모든 게시글" : selectedOption + "km 내 게시글"}</Current>:null}
                {(JSON.parse(sessionStorage.getItem('savedData')).isLogin) ? 
                <DonerMenu onClick={() => setIsOpen(!isOpen)}><BiMenuAltRight size="55" color="#f8332f"/>{isOpen&& (<DropdownMenu>
                    {options.map((option) => (
                    <DropdownOption
                        key={option}
                        onClick={() => handleOptionClick(option)}>
                        {(option === '0') ? "전역" : `${option}km`}
                    </DropdownOption>
                    ))}
                </DropdownMenu>)}</DonerMenu> : <div></div>}
                <WriteButton onClick={handleWrite}>글쓰기</WriteButton>
            </ButtonContainer>
            
            <PostListBox>
                {(postItems.length === 0) ? <div style={{width:"100%", height:"10%", textAlign:"center", marginTop:"200px", fontSize:"35px"}}>
                    등록된 게시물이 없습니다!</div> : 
                postItems.map((item)=>{
                    return <PostItem key={uuid()} value={item} />
                })}  
                {(!loading && hasNext) && <div style={{width:"100%", height:"30px"}} ref={pageEnd}></div>}
            </PostListBox>
        </Wrapper>
    );
}

export default PostList;