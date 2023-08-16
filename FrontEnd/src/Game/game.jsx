import { useEffect, useState, useRef } from 'react';
import pickachu from './images/Pickachu.png';
import butterfree from './images/ButterFree.png';
import charmander from './images/Charmander.png';
import squirtle from './images/Squirtle.png';
import pidgetto from './images/Pidgetto.png';
import bulbasaur from './images/Bulbasaur.png';

import Button from '../Components/Common/Button';
import Card from './card';
import './Game.css';

const uniqueCardsArray = [
  {
    type: 'Pikachu',
    image: pickachu,
  },
  {
    type: 'ButterFree',
    image: butterfree,
  },
  {
    type: 'Charmander',
    image: charmander,
  },
  {
    type: 'Squirtle',
    image: squirtle,
  },
  {
    type: 'Pidgetto',
    image: pidgetto,
  },
  {
    type: 'Bulbasaur',
    image: bulbasaur,
  },
];

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}
export default function Game() {
  const [cards, setCards] = useState(() =>
    shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem('bestScore')) || 0
  );
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem('bestScore', highScore);
      handleRestart();
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }

    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  };

  return (
    <div className="game grow self-start flex flex-col items-start mt-10">
      <header>
        <h3 className=" underline font-bold text-2xl mb-2">Memory Game</h3>
        <div className="">
          Select two cards with same content consequtively to make them vanish
        </div>
      </header>
      <div className="container mt-10 pt-10">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>
          {localStorage.getItem('bestScore') && (
            <div className="high-score">
              <span className="bold">Best Score:</span> {bestScore}
            </div>
          )}
        </div>
        <div className="restart">
          <Button
            className="text-white"
            text="Restart"
            onClick={handleRestart}
          />
        </div>
      </footer>
    </div>
  );
}
