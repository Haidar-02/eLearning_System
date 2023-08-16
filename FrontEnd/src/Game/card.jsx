import React from 'react';

import pokeball from './images/pokeball.png';
import './card.css';

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={`card ${isFlipped && 'is-flipped'}  ${
        isInactive && 'is-inactive'
      }`}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={pokeball} alt="pokeball" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="pokeball" />
      </div>
    </div>
  );
};

export default Card;
