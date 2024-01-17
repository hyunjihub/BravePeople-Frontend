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
        color: #777;

        &:hover {
            color: #000;
        }
    `;

function HeaderButton(props){

    return(
        <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
    );
}

export default HeaderButton;