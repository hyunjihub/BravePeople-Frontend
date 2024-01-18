import React from "react";
import styled from "styled-components";

const Title = styled.div`
    font-size: 50px;
    font-weight: 800;
    margin: 120px 0 50px;
    text-align: center;
`;

const Detail = styled.div`
    font-size: 25px;
    font-weight: 300;
    text-align: center;
`;

const Container = styled.div`
`;

function Error(props) {
    return(
        <Container>
            <Title>페이지를 찾을 수 없습니다.</Title>
            <Detail>페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다. <br />
            입력하신 주소가 정확한지 다시 확인해주세요.</Detail>
        </Container>
    );
}

export default Error;