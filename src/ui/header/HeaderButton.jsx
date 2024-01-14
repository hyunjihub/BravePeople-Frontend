import styled from "styled-components";


const StyledButton = styled.button`
        font-family: 'SUITE-Regular';
        width : 100px;
        height : 30px;
        float : right;
        font-size: medium;
        border: none;
        text-align: center;
        cursor: pointer;
        background-color: #fff;
        color: #333;
    `;

function Button(props){

    return(
        <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
    );
}

export default Button;