import React, { useEffect, useState } from 'react';
import Button from '../Components/Common/Button';
const MathQuiz = () => {
  const mathQuestions = [
    {
      question: 'What is 5 + 3?',
      options: ['7', '8', '10', '6'],
      answer: '8',
    },
    {
      question: 'Which number comes after 12?',
      options: ['14', '13', '15', '11'],
      answer: '13',
    },
    {
      question:
        'If you have 3 apples and give 2 to a friend, how many apples do you have left?',
      options: ['2', '1', '3', '0'],
      answer: '1',
    },
    {
      question: 'What is 4 multiplied by 5?',
      options: ['20', '9', '16', '25'],
      answer: '20',
    },
    {
      question: 'If you count from 1 to 10, what number comes right before 7?',
      options: ['5', '6', '8', '9'],
      answer: '6',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === mathQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < mathQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
      setTimeout(() => {
        setCurrentQuestion(0);
        setShowScore(false);
      }, 3000);
    }
  };
  return (
    <div className="math-quiz">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {mathQuestions.length}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="question-section  flex flex-col gap-3">
            <div className="question-count">
              Question {currentQuestion + 1}/{mathQuestions.length}
            </div>
            <div className="question-text">
              {mathQuestions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section flex gap-4">
            {mathQuestions[currentQuestion].options.map((option, index) => (
              <Button
                text={option}
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={'text-white px-5'}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MathQuiz;

{
}
