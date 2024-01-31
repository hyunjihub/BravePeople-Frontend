import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router";
import { PiGenderMaleBold } from "react-icons/pi";
import { PiGenderFemaleBold } from "react-icons/pi";

const Wrapper = styled.div`
    width: 42%;
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
    font-weight: 800;
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

function PostItem(props) {

    const navigate = useNavigate();

    const handleView = (e) => {
        navigate(`/viewpost/${props.value.postId}`);
    }

    //글자수 over시 ...처리
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };
    
    return(
        <Wrapper>
            <FirstLine>
                <Category>{props.value.category}</Category>
                {(props.value.gender === "남성")?<PiGenderMaleBold size="30" color="#254995"/>:<PiGenderFemaleBold size="30" color="#a93957"/>}
                <Title onClick={handleView}>{truncate(props.value.title, 18)}</Title>
                <UploadTime>{props.value.createdAt}</UploadTime>
                <Price>{(props.value.price!=="-1")? props.value.price+"원":"가격협의"}</Price>
            </FirstLine>
            
            
        </Wrapper>
    );
} 

export default PostItem;