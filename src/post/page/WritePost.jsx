import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";
import { text } from "@fortawesome/fontawesome-svg-core";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setLocation, setProfileImg, setLogin, setMemberId } from "../../member/redux/modules/login";

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
    margin: 5px 0;
    &::placeholder {
        color: #ababab;
    }
    font-family: 'SUITE';
    font-size: 15px;

    &.price {
        width: 28%;
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
    margin-bottom: 1%;
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

const CancelButton = styled.button`
    width: 7%;
    background-color: #fff;
    border: none;
    padding: 0px;
`;

const CancelLabel = styled.label`
    color: #d1180b;
    font-size: 13px;
    margin-left: 0.5%;
    margin-top: -20%;
`;

const Length = styled.label`
    font-size: 15px;
    width: 10%;
    margin-left: 90%;

    &.title {
        margin-left: 92%;
    }
`;

function WritePost(props) {

    const navigate = useNavigate();
    const { ishelped } = useParams();
    let type = ishelped === "helping" ? "원정대" : "의뢰인";

    const { postid } = useParams();
    if(postid === "-1"){
        
    }else{
        
    }

    const dispatch = useDispatch();
    const setLoc = (loc) => dispatch(setLocation(loc));
    const setId = (id) => dispatch(setMemberId(id));
    const setProfile = (pro) => dispatch(setProfileImg(pro));
    const setLog = (bool) => dispatch(setLogin(bool));

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

    //가격
    //세자리마다 콤마(,) 찍어주기 -> 백으로 전달할 때 intPrice를 넘겨줘야 함
    const [number, setNumber] = useState();
    const [price, setPrice] = useState();

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if(value.length>7) {
            Swal.fire({
                title: "가격 최대 자리수",
                text: "최대 가격은 999,999원 입니다. 가격을 다시 확인해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        } else {
            setPrice(parseInt(e.target.value.replace(/,/g, ""), 10));
            setNumber(value);
        }
        
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
        setPrice(-1);
    };

    //제목
    const [title, setTitle] = useState("");
    const handleTitle = (e) => {
        if(e.target.value.length>40) {
            Swal.fire({
                title: "제목 최대 글자수",
                text: "제목의 최대 글자수는 40자 입니다. 제목 글자수를 확인해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        else setTitle(e.target.value);
    };

    //내용
    const [content, setContent] = useState("")
    const handleContent = (e) => {
        if(e.target.value.length>2000) {
            Swal.fire({
                title: "내용 최대 글자수",
                text: "내용의 최대 글자수는 2,000자 입니다. 내용 글자수를 확인해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        else setContent(e.target.value);
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
                if(err.response.status === 401 && err.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken("토큰기한 만료로 수정이 취소되었습니다. 메인 페이지로 이동합니다.");
                } else if((err.response.status === 400 && err.response.data.errorMessage === '파일 업로드 실패')) {
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

    const handleUploadCancel = (e) => {
        setCurrentImg("");
        e.preventDefault();
    }

    //게시글 업로드
    const handleUpload = (e) => {
        if((title !== "") && (price !== undefined) && (content !== "")){
            axios.post('http://13.209.77.50:8080/posts',{
            type: type,
            category: selectedCategory,
            title: title,
            price: price,
            contents: content,
            img: currentImg
            }, {headers:{
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt')).access}`
            }})
            .then(function(response){
                alert("게시글 작성이 완료되었습니다.");
                console.log(response);
                console.log(response.data.img);
                navigate(-1);
            })
            .catch(function(err){
                console.log(err);
                if(err.response.status === 401 && err.response.data.errorMessage === "Access Token 만료"){
                    ReissueToken();
                }else if(err.response.status === 400 && err.response.data.errorMessage === "Invalid request content."){
                    Swal.fire({
                        title: "게시글 양식 오류",
                        text: "작성하지 않은 항목이 있는지, 최대 글자수를 넘어가지 않았는지 확인해주세요.",
                        icon: "error",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "확인",
                    });
                }
            })
        }else{
            console.log(title);
            console.log(price);
            console.log(content);
            Swal.fire({
                title: "작성 미기재 항목 존재",
                text: "작성하지 않은 항목이 있습니다. 다시 한 번 확인해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "확인",
            });
        }
        
    }

    //취소
    const handleCancel = (e) => {
        navigate(-1);
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
                        value={title || ""}
                        onChange={handleTitle}
                        placeholder="제목을 입력해주세요. 최대 40자"/>
                    <Length className="title">{title.length}/40</Length>
                    <PriceContainer>
                        <Input className="price"
                        name="title"
                        type="text"
                        value={number || ""}
                        onChange={handleInputChange}
                        placeholder="최대 999,999"
                        disabled={isChecked}/>
                        <Discussion className="unit">원</Discussion>
                        <CheckBox name="discussion" type="checkbox" checked={isChecked} onChange={handleCheck}/>
                        <Discussion>가격 협의</Discussion>
                    </PriceContainer>
                    <Content
                    name="content"
                    cols="30" rows="5"
                    value={content || ""}
                    onChange={handleContent}
                    placeholder="내용을 입력해주세요. 최대 2,000자"/>
                    <Length>{content.length}/2000</Length>
                    <ImageContainer>
                        <FileInput onClick={handleImg}>
                            {(currentImg === "") ? <FaCamera className="icon" size="45" color="ccc"/> : 
                            <img src={currentImg} style={{width:"100%", height:"80%"}}/>}
                        </FileInput>
                        <input type="file" ref={fileInput} onChange={handleChange} style={{ display: "none" }}/>
                        <CancelBox>
                            <CancelButton onClick={handleUploadCancel}><MdCancel size="25" color="d1180b"/></CancelButton>
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