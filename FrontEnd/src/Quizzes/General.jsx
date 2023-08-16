import React, { useEffect, useState } from 'react';
const General = () => {
  const questions = [
    {
      question: 'What is the tallest animal in the world?',
      options: ['Elephant', 'Giraffe', 'Lion', 'Penguin'],
      answer: 'Giraffe',
    },
    {
      question: 'Which color is made by mixing red and blue together?',
      options: ['Green', 'Orange', 'Purple', 'Yellow'],
      answer: 'Purple',
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      options: ['Jupiter', 'Mars', 'Saturn', 'Venus'],
      answer: 'Mars',
    },
    {
      question:
        'What is the process called when a liquid turns into a gas, such as when water becomes water vapor?',
      options: ['Freezing', 'Condensation', 'Evaporation', 'Melting'],
      answer: 'Evaporation',
    },
    {
      question:
        'What do we call the process by which a caterpillar turns into a butterfly?',
      options: ['Jumping', 'Flying', 'Swimming', 'Metamorphosis'],
      answer: 'Metamorphosis',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <div>
          <div className="question-section">
            <div className="question-count">
              Question {currentQuestion + 1}/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
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

export default General;
