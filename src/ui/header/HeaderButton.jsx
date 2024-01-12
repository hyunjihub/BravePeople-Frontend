import styled from "styled-components";

const StyledButton = styled.button`
        width : 100px;
        height : 30px;
        float : right;
        margin-right: 2vw;
        margin-top: 15px;
        font-size: medium;
        border-radius: 15px;
        border: none;
        text-align: center;
        cursor: pointer;
        background-color: #fff;
        color: #333;
        border: 1px solid #333;
        &:hover {
            background: #333;
            color: #fff;
        }
    `;

function Button(props){
    return(
        <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
    );
}

export default Button;