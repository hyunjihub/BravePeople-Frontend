import React from "react";
import dong from '../resources/img/dongmedal.png';
import eun from '../resources/img/eunmedal.png';
import geum from '../resources/img/geummedal.png';
import styled from "styled-components";

const Medal = styled.img`
    width: 130%;
`;

function Badge(props) {

    const renderBadge = () => {

        if(props.value<10) {
            return dong;
        }
        else if (props.value<20) {
            return eun;
        }
        else {
            return geum;
        }
    };

    return(
        <Medal src={renderBadge()} alt="Medal" />
    );
}

export default Badge;