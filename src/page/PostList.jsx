import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostItem from "../components/PostItem";

const data = {
    title: "파이팅!",
    price: "10000",
    gender: "woman",
    time: "2024-01-11 18:05:54"
}

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
    font-family: 'SUITE-Regular';
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

function PostList(props) {
    const [ postItems, setPostItems ] = useState([]);
    const [ num, setNum ] = useState(0);
    const { ishelped } = useParams();
    let type = ishelped === "helping" ? "원정대" : "의뢰인";
    
    useEffect(()=>{
        setPostItems([]);
        setNum(0);
    }, [type]);

    return(
        <Wrapper>
            <Title>{type}</Title>
            <button onClick={()=>{setPostItems([...postItems, num]); setNum(num + 1);}}>데이터 추가</button>
            <PostListBox>
                {(postItems.length === 0) ? <div style={{width:"100%", height:"10%", textAlign:"center", fontSize:"25px"}}>등록된 게시물이 없습니다!</div> : 
                postItems.map((item, index)=>{
                    return <PostItem key={index} value={item} />
                })}  
            </PostListBox>
        </Wrapper>
    );
}

export default PostList;