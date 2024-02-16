import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";
import { setLocation, setProfileImg, setLogin, setMemberId } from "../../member/redux/modules/login";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Button = styled.button`
    width: 45%;
    height: 100%;
    background-color: #f8332f;
    font-size: 15px;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-family: 'SUITE';
    margin-right: 5px;
    cursor: pointer;
`;

const DisableButton = styled.button`
    width: 45%;
    height: 100%;
    background-color: #EB9F9C;
    font-size: 15px;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-family: 'SUITE';
    margin-right: 5px;
    cursor: pointer;
`;

const ButtonList = styled.div`
    width: 13%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 4%;
    align-items: center;

    &.request {
        flex-direction: row;
        width: 70%;
        height: 50%;
        margin: 0;
    }

    &.user {
        height: 120%;
        width: 70%;
        margin-top: 1.5%;
        align-items: flex-start;
    }
`;

function Button(props) {

    const contact = props.value;
    //대기중 && true -> 수락 대기중 && false -> 수락 진행중 && true -> 진행 외 전부 null

    const [buttonText, setButtonText] = useState("");
    const [buttonNull, setButtonNull] = useState(false);

    useEffect(() => {
        buttonChoice(contact.status, contact.isActive);
    }, [contact.status, contact.isActive]);
    
    const buttonChoice = (status, isActive) => {
        if (status==="대기중") {
            setButtonText("의뢰 수락");
            return;
        }
        else if (status==="진행중") {
            if (isActive) {
                setButtonText("의뢰 취소");
                return;
            }
        }
        setButtonNull(true);
    }

    return (
        <ButtonList className="request">           
            {(!contact.isActive && !buttonNull)?<DisableButton disabled="disabled">{buttonText}</DisableButton>:<Button>{buttonText}</Button>}
            {(contact.status==="진행중" && contact.isActive)?<Button>의뢰 완료</Button>:null}
        </ButtonList>
    );

}

export default Button;