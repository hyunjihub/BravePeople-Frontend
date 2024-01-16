import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
    width: 90%;
    height: 10%;
    border-radius: 15px;
    margin: 30px auto;
    box-shadow: 0px 4px 15px -5px rgba(18, 23, 42, 0.1);
    display: flex;
    flex-direction: column;
    background-color: #f7f8fd;
`;

const Title = styled.button`
    font-weight: bold;
    font-size: 25px;
    margin: 20px 0 0 30px;
    text-align: left;
    border: none;
    background-color: #f7f8fd;
    padding: 0px;
    font-family: 'SUITE-Regular';
`;

const UploadTime = styled.div`
    font-size: 13px;
    font-weight: 300;
    color: #868e96;
    margin: 3px 0 0px 30px;
`;

/* 성별, 카테고리 추가 */

function PostItem(props) {

    const navigate = useNavigate();
    return(
        <Wrapper>
            <Title onClick={()=>{navigate("/viewPost");}}>벌레 잡아주실 분 찾습니다</Title>
            <UploadTime>1시간 전</UploadTime>
        </Wrapper>
    );
} 

export default PostItem;