import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostItem from "../components/PostItem";
import { BiMenuAltRight } from "react-icons/bi";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

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

/* 무한스크롤 구현해야 함 */
const PostListBox = styled.div`
    width: 100%;
    height: 95%;
    overflow-y: scroll;
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
    margin-right: 6%;
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    width: 100%;
    height: 6%;
    display: flex;
    justify-content: flex-end;
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
    top: 32%;
    left: 62%;
    z-index: 99;
    border: 1px solid #d1d1d1;
    border-radius: 10px;
    font-weight: 500;
    background-color: #fff;
    padding: 0.5% 1% 0.5% 0.8%;
    box-sizing: border-box;
    box-shadow: 0px 0px 3px 1px rgba(190, 190, 190, 0.3);
`;

const DropdownOption = styled.li`
    margin : 0% 5% 17% 0%;
    font-size: 17px;
`;


function PostList(props) {

    const navigate = useNavigate();
    const [ postItems, setPostItems ] = useState([]);
    const { ishelped } = useParams();
    let type = ishelped === "helping" ? "원정대" : "의뢰인";

    // redux

    const { isLog } = useSelector((state)=>({
        isLog: state.login.isLogin
    }));

    //드롭다운 메뉴 구현
    const options = ['2', '5', '10', '0'];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('2');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleWrite = (e) => {
        navigate("./writepost/-1");
        e.preventDefault();
    }

    // 게시글 데이터 불러오기 api
    // 포스트 개수
    const [postLength, setPostLength] = useState(0);

    useEffect(()=>{
        // 로그인 상태일 때 게시글 조회
        if(JSON.parse(sessionStorage.getItem('savedData')).isLogin && isLog){
            axios.get(`http://13.209.77.50:8080/posts?type=${type}&distance=${selectedOption}&page=0&amount=5`,
            {
                headers:{
                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
                }
            })
            .then(function(response){
                setPostLength(response.data.data.length);
                setPostItems(response.data.data);
            })
            .catch(function(error){
                if(error.response.status === 401 && error.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken();   
                } 
            })
        }
        // 비로그인 상태일 때 게시글 조회
        else if(!JSON.parse(sessionStorage.getItem('savedData')).isLogin && !isLog){
            axios.get(`http://13.209.77.50:8080/posts?type=${type}&page=0&amount=2`)
        .then(function(response){
            setPostLength(response.data.data.length);
            setPostItems(response.data.data);
        })
        .catch(function(error){
            console.log(error);
        })
        }   
    }, [ishelped]);

    const testFunc = () => {
        console.log(selectedOption);
    }

    // postItem에 들어갈 데이터 - postId, category, gender, title, createdAt, price
    return(
        <Wrapper>
            <div><button onClick={testFunc}>testButton</button></div>
            <Title>{type}</Title>
            <ButtonContainer>
                <DonerMenu onClick={() => setIsOpen(!isOpen)}><BiMenuAltRight size="55" color="#f8332f"/></DonerMenu>
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
                {(postLength === 0) ? <div style={{width:"100%", height:"10%", textAlign:"center", fontSize:"25px", marginTop:"200px", fontSize:"35px"}}>
                    등록된 게시물이 없습니다!</div> : 
                postItems.map((item)=>{
                    return <PostItem key={item.postId} value={item} />
                })}  
            </PostListBox>
        </Wrapper>
    );
}

export default PostList;