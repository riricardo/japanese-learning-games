import { useEffect, useMemo, useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import { shuffle } from '../utils/shuffle.js';

const initialScore = {
  correct: 0,
  wrong: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalAnswered: 0,
};

function pickQuestion(questions, previousQuestion) {
  if (questions.length <= 1) {
    return questions[0];
  }

  let nextQuestion = questions[Math.floor(Math.random() * questions.length)];

  while (nextQuestion === previousQuestion) {
    nextQuestion = questions[Math.floor(Math.random() * questions.length)];
  }

  return nextQuestion;
}

export default function Quiz({ game, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(initialScore);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const accuracy = useMemo(() => {
    if (score.totalAnswered === 0) {
      return 0;
    }

    return Math.round((score.correct / score.totalAnswered) * 100);
  }, [score.correct, score.totalAnswered]);

  useEffect(() => {
    let isActive = true;

    async function loadQuestions() {
      try {
        setStatus('loading');
        setError('');

        const response = await fetch(game.dataUrl);

        if (!response.ok) {
          throw new Error('Quiz data could not be loaded.');
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Quiz data must be a non-empty array.');
        }

        if (isActive) {
          const firstQuestion = pickQuestion(data, null);
          setQuestions(data);
          setCurrentQuestion(firstQuestion);
          setAnswerOptions(shuffle(firstQuestion.answerOptions || []));
          setStatus('ready');
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message);
          setStatus('error');
        }
      }
    }

    loadQuestions();

    return () => {
      isActive = false;
    };
  }, [game.dataUrl]);

  function handleAnswer(answer) {
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(answer);
    setScore((currentScore) => {
      const nextCorrect = currentScore.correct + (answer.isCorrect ? 1 : 0);
      const nextWrong = currentScore.wrong + (answer.isCorrect ? 0 : 1);
      const nextCurrentStreak = answer.isCorrect ? currentScore.currentStreak + 1 : 0;

      return {
        correct: nextCorrect,
        wrong: nextWrong,
        currentStreak: nextCurrentStreak,
        bestStreak: Math.max(currentScore.bestStreak, nextCurrentStreak),
        totalAnswered: currentScore.totalAnswered + 1,
      };
    });
  }

  function showNextQuestion() {
    const nextQuestion = pickQuestion(questions, currentQuestion);
    setCurrentQuestion(nextQuestion);
    setAnswerOptions(shuffle(nextQuestion.answerOptions || []));
    setSelectedAnswer(null);
  }

  return (
    <section className="quiz-screen" aria-labelledby="quiz-title">
      <header className="quiz-topbar">
        <button className="text-button" type="button" onClick={onBack}>
          Back to Home
        </button>
        <div>
          <p className="eyebrow">Infinite Practice Mode</p>
          <h1 id="quiz-title">{game.title}</h1>
        </div>
      </header>

      {status === 'loading' && <p className="notice">Loading quiz...</p>}

      {status === 'error' && (
        <div className="notice error-message" role="alert">
          {error}
        </div>
      )}

      {status === 'ready' && currentQuestion && (
        <div className="quiz-layout">
          <QuestionCard
            question={currentQuestion}
            answerOptions={answerOptions}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleAnswer}
            onNextQuestion={showNextQuestion}
          />
          <ScoreBoard score={score} accuracy={accuracy} />
        </div>
      )}
    </section>
  );
}
