import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";
import { text } from "@fortawesome/fontawesome-svg-core";

import axios from "axios";

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

const Container = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction : row;
`;

const Category = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const CategoryTxt = styled.div`
    font-weight: 600;
    font-size: 20px;
    margin: 10% auto 40%;

    &.content {
        margin-bottom : 250%;
    }
`;

const Form = styled.div`
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    width: 12%;
    height: 100%;
    border-radius: 18px;
    background-color: #f8332f;
    color: #fff;
    border: none;
    font-family: 'SUITE';
    font-size: 16px;
    cursor: pointer;
    margin: 0px 2%;
`;

const ButtonContainer = styled.div`
    width: 100%;
    height: 4%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2%;
`;

const Input = styled.input`
    display: block;
    border: 1px solid #d1d1d1;
    width: 100%;
    height: 6%;
    box-sizing: border-box;
    padding: 10px 15px;
    margin: 10px 0;
    &::placeholder {
        color: #ababab;
    }
    font-family: 'SUITE';
    font-size: 15px;

    &.price {
        width: 25%;
        height: 50%;
        margin-top: 4.5%;
    }

    &:disabled {
        background-color: #ddd;
    }
`;

const Content = styled.textarea`
    height: 40%;
    display: block;
    border: 1px solid #d1d1d1;
    width: 100%;
    hegiht: 10%;
    box-sizing: border-box;
    padding: 16px 24px;
    margin-top: 3%;
    font-family: 'SUITE';
    resize: none;
    font-size: 15px;

    &::placeholder {
        color: #ababab;
    }
`;

const FileInput = styled.button`
    border: 1px solid #d1d1d1;
    width: 25%;
    height: 67%;
    margin-top: 3%;
    background-color: #fff;
`;

const CheckBox = styled.input`
    width: 5%;
    height: 23%;
    margin-top: 7.7%;
    cursor: pointer;

    &:checked {
        accent-color: #f8332f;
    }
`;

const PriceContainer = styled.div`
    width: 100%;
    height: 9%;
    display: flex;
    flex-direction: row;
`;

const Discussion = styled.div`
    font-size: 15px;
    color: #ababab;
    margin-top: 7.5%;
    margin-left: -1%;

    &.unit {
        margin-left: 1%;
        color: #000;
        font-weight: 600;
        font-size: 16px;
    }
`;

const RadioBox = styled.div`
    width: 100%;
    height: 7.5%;
    display: flex;
    flex-directiom: row;
    margin-top: 2%;
`;

const RadioButton = styled.input`
    width : 20px;
    height: 20px;

    accent-color: #f8332f;
    margin-right: 5px;
    cursor: pointer;
`;

const RadioLabel = styled.label`
    font-family: 'SUITE';
    font-size: 17px;
    margin-right: 10px;
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    flex-directiom: row;
`;

const CancelBox = styled.div`
    width: 70%;
    height: 8%;
    margin: 23% 0 0 0.5%;
`;

const CancelLabel = styled.label`
    color: #d1180b;
    font-size: 13px;
    margin-left: 0.5%;
    margin-top: -20%;
`;

function WritePost(props) {

    const navigate = useNavigate();
    const { ishelped } = useParams();
    let type = ishelped === "helping" ? "원정대" : "의뢰인";

    // 토큰 재발급
    const ReissueToken = (msg) => {
        axios.post("http://13.209.77.50:8080/auth/reissue",{
            accessToken: JSON.parse(sessionStorage.getItem('jwt')).access,
            refreshToken: JSON.parse(sessionStorage.getItem('jwt')).refresh
        })
        .then(function(response){
            sessionStorage.setItem('jwt',JSON.stringify({
                access: response.data.accessToken,
                refresh: response.data.refreshToken
            }))
            alert(msg);
            navigate("/main");
        })
        .catch(function(error){
            console.log(error);
        });
    }

    //가격
    //세자리마다 콤마(,) 찍어주기 -> 백으로 전달할 때 intPrice를 넘겨줘야 함
    const [number, setNumber] = useState();
    const [price, setPrice] = useState();

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setPrice(parseInt(e.target.value.replace(/,/g, ""), 10));
        setNumber(value);      
    };

    //라디오버튼(category)
    const [selectedCategory, setSelectedCategory] = useState("벌레");
    const handleRadio = (e) => {
        setSelectedCategory(e.target.value);
    };

    //체크박스(가격 협의)
    const [isChecked, setIsChecked] = useState(false);
    const handleCheck = (e) => {
        setIsChecked(e.target.checked);
    };

    //제목
    const [title, setTitle] = useState("");
    const handleTitle = (e) => {
        setTitle(e.target.value);
        console.log(title);
    };

    //내용
    const [content, setContent] = useState("")
    const handleContent = (e) => {
        setContent(e.target.value);
    };

    //이미지 업로드
    const [currentImg, setCurrentImg] = useState("");

    const handleCurrentImg = (img) => {
        setCurrentImg(img);
    }

    const fileInput = React.createRef();
    const handleImg = (e) => {
        fileInput.current.click();
    }
    const frm = new FormData();
    const handleChange = (e) => {
        const files = e.target.files;
        var reg = /(.*?)\.(jpg|jpeg|png)$/;
        if (!files[0].name.match(reg)) {
            Swal.fire({
                title: "불가능한 파일 확장자",
                text: "프로필 이미지는 jpg, jpeg, png만 사용가능합니다.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        else if (files && files.length > 0) {
            frm.append('file', files[0]);
            axios.post("http://13.209.77.50:8080/image", frm, {
                headers: {'Content-Type' : 'Multipart/form-data',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }}).then(function(response){
                handleCurrentImg(response.data.imgUrl);
            }).catch(function(err){
                if(err.response.data.status === '401 UNAUTHORIZED' && err.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken("토큰기한 만료로 수정이 취소되었습니다. 메인 페이지로 이동합니다.");
                } else if((err.response.data.status === '400 BAD_REQUEST' && err.response.data.errorMessage === '파일 업로드 실패')) {
                    Swal.fire({
                        title: "파일 업로드 오류",
                        text: "파일 업로드 오류가 발생했습니다. 다시 시도해주세요.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                } else {
                    console.log(err);
                }
            })
        }
    }

    //게시글 업로드
    const handleUpload = (e) => {
        if((title !== "") && (price !== undefined) && (content !== "")){
            axios.post('http://13.209.77.50:8080/posts',{
            type: type,
            category: selectedCategory,
            title: title,
            price: (isChecked)?-1:price,
            contents: content,
            img: currentImg
            }, {headers:{
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }})
            .then(function(response){
                alert("게시글 작성이 완료되었습니다.");
                navigate(-1);
            })
            .catch(function(err){
                console.log(err);
                if(err.response.data.status === '401 UNAUTHORIZED' && err.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken("토큰기한 만료로 수정이 취소되었습니다. 메인 페이지로 이동합니다.");
                }else if(err.response.data.status === '400 BAD_REQUEST' && err.response.data.errorMessage === "Invalid request content."){
                    alert("비어있는 입력이 있는지 확인해주세요!");
                }
            })
        }else{
            alert("비어있는 입력이 있는지 확인해주세요!");
        }
        
    }

    //취소
    const handleCancel = (e) => {
        navigate(-1);
        e.preventDefault();
    }

    //가격은 숫자로만 입력받아야 하지만, 세자리마다 콤마(,)를 넣기 위해서는 text로 받아야 함 -> 백으로 전달할 때 intPrice를 넘겨줘야 함
    return (
        <Wrapper>
            <Title>{type}</Title>
            <Container>
                <Category>
                    <CategoryTxt>카테고리</CategoryTxt>
                    <CategoryTxt>제목</CategoryTxt>
                    <CategoryTxt>가격</CategoryTxt>
                    <CategoryTxt className="content">내용</CategoryTxt>
                    <CategoryTxt>사진</CategoryTxt>
                </Category>
                <Form>
                    <RadioBox>
                        <RadioButton type="radio" value="벌레" checked={selectedCategory==="벌레"} onChange={handleRadio} />
                        <RadioLabel>벌레</RadioLabel>
                        <RadioButton type="radio" value="전화" checked={selectedCategory==="전화"} onChange={handleRadio} />
                        <RadioLabel>전화</RadioLabel>
                        <RadioButton type="radio" value="환불" checked={selectedCategory==="환불"} onChange={handleRadio} />
                        <RadioLabel>환불</RadioLabel>
                        <RadioButton type="radio" value="기타" checked={selectedCategory==="기타"} onChange={handleRadio} />
                        <RadioLabel>기타</RadioLabel>
                    </RadioBox>
                    <Input 
                        name="title"
                        type="text"
                        onChange={handleTitle}
                        placeholder="제목을 입력해주세요. 최대 20자"/>
                    <PriceContainer>
                        <Input className="price"
                        name="title"
                        type="text"
                        value={number}
                        onChange={handleInputChange}
                        placeholder="가격"
                        disabled={isChecked}/>
                        <Discussion className="unit">원</Discussion>
                        <CheckBox name="discussion" type="checkbox" checked={isChecked} onChange={handleCheck}/>
                        <Discussion>가격 협의</Discussion>
                    </PriceContainer>
                    <Content
                    name="content"
                    cols="30" rows="5"
                    onChange={handleContent}
                    placeholder="내용을 입력해주세요. 최대 2,000자"/>
                    <ImageContainer>
                        <FileInput onClick={handleImg}>
                            {(currentImg === "") ? <FaCamera className="icon" size="45" color="ccc"/> : 
                            <img src={currentImg} style={{width:"100%", height:"80%"}}/>}
                        </FileInput>
                        <input type="file" ref={fileInput} onChange={handleChange} style={{ display: "none" }}/>
                        <CancelBox>
                            <MdCancel size="25" color="d1180b"/>
                            <CancelLabel>이미지는 최대 1장까지 업로드 가능하며, X를 통해 이미지 등록을 취소할 수 있습니다.</CancelLabel>
                        </CancelBox>
                    </ImageContainer>                 
                </Form>
            </Container>
            <ButtonContainer>
                <Button onClick={handleUpload} type="submit">등록</Button>
                <Button onClick={handleCancel} type="button">취소</Button>
            </ButtonContainer>
        </Wrapper>
    )
    
}

export default WritePost;