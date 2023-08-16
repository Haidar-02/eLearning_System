import React, { useState } from 'react';
import General from '../../Quizzes/General';
import ScienceQuiz from '../../Quizzes/Science';
import MathQuiz from '../../Quizzes/Math';
import Button from '../Common/Button';
import Game from '../../Game/game';

const Interactive = () => {
  const [selected, setSelected] = useState();
  const [show, setShow] = useState();

  return (
    <div>
      <div className="Quizzes underline font-bold text-2xl mb-5">Quizzes</div>

      <div className="general flex flex-col gap-10 ">
        <div className="border p-5 rounded-2xl">
          <General />
        </div>
        <div className="border p-5 rounded-2xl">
          <MathQuiz />
        </div>
        <div className="border p-5 rounded-2xl">
          <ScienceQuiz />
        </div>
      </div>
      <Game />
    </div>
  );
};

export default Interactive;
