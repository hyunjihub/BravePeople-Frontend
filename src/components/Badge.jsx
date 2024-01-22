import React from "react";
import dong from '../ui/dummy/dongmedal.png';
import eun from '../ui/dummy/eunmedal.png';
import geum from '../ui/dummy/geummedal.png';
import styled from "styled-components";

const Medal = styled.img`
    width: 130%;
`;

function Badge(props) {

    const {value} = props;

    const renderBadge = () => {

        if(value<10) {
            return dong;
        }
        else if (10<=value && value<20) {
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