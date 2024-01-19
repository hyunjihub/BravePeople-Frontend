import React, { useState } from "react";
import styled from "styled-components";
import profile from '../ui/dummy/profile.png';
import { useNavigate } from "react-router";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

const Container = styled.div`
    width: 1200px;
    height: 700px;
    margin: 100px auto;
    display: flex;
    flex-direction: row;
`;

const Profile = styled.div`
    width: 30%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Board = styled.div`
    width: 70%;
    height: 100%
    background-color: #fff;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
`;

const ProfileButton = styled.button`
    width: 60%;
    height: 30%;
    background-image : url(${profile});
    background-size: cover;
    no-repeat: none;
    border-radius: 999px;
    overflow: hidden;
    margin: 10% 20% 3%;
    border: none;

    &:hover {
        filter: brightness(80%);
    }
`;

const Nickname = styled.div`
    font-weight: 700;
    color: #000;
    text-align: center;
    font-size: 38px;
    margin-right: 5px;
`;

const Introduce = styled.div`
    font-weight: 200;
    color: #777;
    font-size: 15px;
    text-align: center;
    margin-bottom: 5%;
`;

const Modify = styled.button`
    font-weight: 300;
    color: #333;
    font-size: 15px;
    text-align: center;
    border: none;
    background-color: #fff;
    font-family: 'SUITE';

    &:hover {
        color: #000;
        font-weigh: 400;
    }
`;

const Rating = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5%;
`;

const Badge = styled.div`
    width: 20%;
    height: 12%;
    background-color: #000;
    color: #fff;
    margin-bottom: 15%;
`;

const SettingButton = styled.button`
    width: 10%;
    height: 5%;
    padding: 0px;
    border: none;
    background-color: #fff;
    margin-top: 13%;
`;

const Myself = styled.div`
    display: flex;
    flex-direction: row;
`;

const Box = styled.div`
    width: 80%;
    height: 40%;
    border-radius: 15px;
    margin: 30px auto;
    box-shadow: 0px 4px 15px -5px rgba(18, 23, 42, 0.1);
    display: flex;
    flex-direction: column;
    background-color: #f7f8fd;
`;


/* 상태변경 누를시 본인이 아닌 상대페이지를 보는 기준 재클릭시 본인페이지 */
function MyPage(props) {
    const [myself, setMySelf] = useState(true);
    const navigate = useNavigate();

    const handleMyself = () => {
        if(myself) {
            setMySelf(false);
        }
        else {
            setMySelf(true);
        }
    };

    return(
        <Container>
            <button onClick={handleMyself}>상태 변경</button>
            <Profile>
                <ProfileButton></ProfileButton>
                <Myself>
                    <Nickname>원정대원</Nickname>
                    {myself?<SettingButton><IoSettings size="23" color="#808080"/></SettingButton>:null}
                </Myself>
                <Introduce>안녕하세요! 잘 부탁드려요!</Introduce>
                <Rating>
                    <FaStar size="40" color="#ffb400" /> 
                    <FaStar size="40" color="#ffb400" />
                    <FaStar size="40" color="#ffb400" />
                    <FaStarHalfAlt size="40" color="#ffb400" /> 
                    <FaRegStar size="40" color="#ffb400" /> 
                </Rating>
                <Badge>뱃지 들어갈 위치</Badge>
                {myself?<Modify onClick={()=>navigate("/authentication")}>비밀번호 재설정</Modify>:null}
            </Profile>

            <Board>
                <Box>내가 쓴 글</Box>
                <Box>후기</Box>
            </Board>
        </Container>
    );
}

export default MyPage;