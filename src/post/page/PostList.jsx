import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostItem from "../components/PostItem";
import { BiMenuAltRight } from "react-icons/bi";
import { useNavigate } from "react-router";

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
`;


function PostList(props) {

    const navigate = useNavigate();
    const [ postItems, setPostItems ] = useState([]);
    const [ num, setNum ] = useState(0);
    const { ishelped } = useParams();
    let type = ishelped === "helping" ? "원정대" : "의뢰인";
    
    useEffect(()=>{
        setPostItems([]);
        setNum(0);
    }, [type]);

    const handleWrite = (e) => {
        navigate("./writepost");
        e.preventDefault();
    }

    return(
        <Wrapper>
            <button onClick={()=>{setPostItems([...postItems, num]); setNum(num + 1);}}>데이터 추가</button>
            <Title>{type}</Title>
            <ButtonContainer>
                <DonerMenu ><BiMenuAltRight size="55" color="#f8332f"/></DonerMenu>
                <WriteButton onClick={handleWrite}>글쓰기</WriteButton>
            </ButtonContainer>
            
            <PostListBox>
                {(postItems.length === 0) ? <div style={{width:"100%", height:"10%", textAlign:"center", fontSize:"25px", marginTop:"200px", fontSize:"35px"}}>등록된 게시물이 없습니다!</div> : 
                postItems.map((item, index)=>{
                    return <PostItem key={index} value={item} />
                })}  
            </PostListBox>
        </Wrapper>
    );
}

export default PostList;