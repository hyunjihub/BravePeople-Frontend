import React from "react";
import styled from "styled-components";
import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";

const RatingContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const StarsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: #D8D9DA;
  overflow: hidden;
`;

const StarsForeground = styled.div`
  position: relative;
  color: #ffbe04;
`;


function Rating(props) {
  const renderRating = () => {
    const stars = [];
    const round = Math.floor(props.value);
    const hasHalf = props.value % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < round) {
        stars.push(<FaStar className="filled" size={props.size} key={i} />);
      } else if (i === round && hasHalf) {
        stars.push(<FaStarHalf className="half" size={props.size} key={i} />);
      } else {
        stars.push(<FaRegStar className="empty" opacity={0} size={props.size} key={i} />);
      }
    }
    return stars;
  };

  return (
    <RatingContainer>
      <StarsBackground>
        <FaStar className="star-icon filled" size={props.size} />
        <FaStar className="star-icon filled" size={props.size} />
        <FaStar className="star-icon filled" size={props.size} />
        <FaStar className="star-icon filled" size={props.size} />
        <FaStar className="star-icon filled" size={props.size} />
      </StarsBackground>
      <StarsForeground>
        {renderRating()}
      </StarsForeground>
    </RatingContainer>
  );
}

export default Rating;