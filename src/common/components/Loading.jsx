import React from 'react';
import Spinner from '../resources/img/loading.gif';
import styled from "styled-components";

const Background = styled.div`
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: fixed;
    top: -15%;
    left: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6%;
    z-index: 999;
`;

const Image = styled.img`
    width: 5%;
`;

function Loading(props) {
    return(
        <Background>
            <Image src={Spinner} alt="로딩중"/>
        </Background>
    );
}

export default Loading;