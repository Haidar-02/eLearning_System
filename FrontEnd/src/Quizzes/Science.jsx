import React, { useState } from 'react';

const ScienceQuiz = () => {
  const scienceQuestions = [
    {
      question: "Which of these is a planet known as the 'Red Planet'?",
      options: ['Earth', 'Mars', 'Venus', 'Saturn'],
      answer: 'Mars',
    },
    {
      question:
        'What is the process by which a caterpillar turns into a butterfly called?',
      options: ['Evolution', 'Metamorphosis', 'Photosynthesis', 'Fermentation'],
      answer: 'Metamorphosis',
    },
    {
      question: "What is the Earth's largest natural satellite?",
      options: ['Sun', 'Moon', 'Mars', 'Jupiter'],
      answer: 'Moon',
    },
    {
      question:
        'What do we call the thin layer of gas that surrounds the Earth and makes it suitable for living organisms?',
      options: ['Atmosphere', 'Ozone', 'Stratosphere', 'Hydrosphere'],
      answer: 'Atmosphere',
    },
    {
      question: 'Which of these is a primary color of light?',
      options: ['Green', 'Orange', 'Purple', 'Red'],
      answer: 'Red',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === scienceQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < scienceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="science-quiz">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {scienceQuestions.length}
        </div>
      ) : (
        <div>
          <div className="question-section">
            <div className="question-count">
              Question {currentQuestion + 1}/{scienceQuestions.length}
            </div>
            <div className="question-text">
              {scienceQuestions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            {scienceQuestions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScienceQuiz;
