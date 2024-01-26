import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { PiGenderMaleBold } from "react-icons/pi";
import { PiGenderFemaleBold } from "react-icons/pi";

const Wrapper = styled.div`
    width: 90%;
    height: 7%;
    border-radius: 15px;
    margin: 0px auto 30px;
    box-shadow: 0px 4px 15px -5px rgba(18, 23, 42, 0.1);
    display: flex;
    flex-direction: column;
    background-color: #f7f8fd;
    border: 1px dashed rgba(0,0,0,0.2);
`;

const Title = styled.button`
    width: 65%;
    font-weight: bold;
    font-size: 25px;
    text-align: left;
    border: none;
    background-color: #f7f8fd;
    padding: 0px;
    font-family: 'SUITE';
    margin-left: 1%;
    cursor: pointer;
`;

const UploadTime = styled.div`
    font-size: 13px;
    font-weight: 300;
    color: #868e96;
    width: 10%;
`;

const Price = styled.div`
    width: 15%;
    height: 100%;
    font-size: 20px;
    color: #868e96;
    flex: flex-end;
`;

const Category = styled.div`
    width: 9%;
    height: 100%;
    background-color: #f8332f;
    border-radius: 15px;
    color: #fff;
    font-size: 18px;
    margin-right: 1%;
    text-align: center;
    padding: 5px 0px 0px 0px;
    box-sizing: border-box;
`;

const FirstLine = styled.div`
    display: flex;
    flex: space-between;
    flex-direction: row;
    align-items: center;
    margin: 17px auto 0px auto;
    width: 95%;
`;

/* 성별, 카테고리 추가 */
// 받은 POSTID로 백엔드와 RESTAPI통신하여 해당 ID의 게시글 정보를 불러온다.(작성자성별, 제목, 글작성시간, 가격, 카테고리)
// AXIOS.머시기ㅣ머시기({props.value}) => 여기서 받은 데이터를 PostItem 리턴에 담아서 PostList component로
function PostItem(props) {

    const navigate = useNavigate();
    const gender = false;
    
    return(
        <Wrapper>
            <FirstLine>
                <Category>벌레</Category>
                {gender?<PiGenderMaleBold size="30" color="#254995"/>:<PiGenderMaleBold size="30" color="#a93957"/>}
                <Title onClick={()=>{navigate("/viewPost");}}>벌레 잡아주실 분 찾습니다</Title>
                <UploadTime>{props.value}시간 전</UploadTime>
                <Price>999,999원</Price>
            </FirstLine>
            
            
        </Wrapper>
    );
} 

export default PostItem;