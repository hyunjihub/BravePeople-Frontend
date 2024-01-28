import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";


function Rating(props) {

    const renderRating = () => {
        const stars = [];
        const round = Math.floor(props.value); // 정수
        const hasHalf = props.value % 1 !== 0; // 0.5의 경우
    
        for (let i = 0; i < 5; i++) {
          if (i < round) {
            stars.push(<FaStar color="#ffbe04" size={props.size} key={i} />);
          } else if (i === round && hasHalf) {
            stars.push(<FaStarHalfAlt color="#ffbe04" size={props.size} key={i} />);
          } else {
            stars.push(<FaRegStar color="#ffbe04" size={props.size} key={i} />);
          }
        }
        return stars;
    };

    return(
        <div>
            {renderRating()}
        </div>
        
    );
}

export default Rating;