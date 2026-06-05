export default function QuestionCard({
  question,
  answerOptions,
  selectedAnswer,
  onSelectAnswer,
  isLocked = false,
  revealCorrectAnswer = true,
}) {
  const hasAnswered = Boolean(selectedAnswer);

  function getAnswerClass(option) {
    if (!hasAnswered) {
      return 'answer-button';
    }

    if (option === selectedAnswer) {
      return option.isCorrect ? 'answer-button correct-answer' : 'answer-button wrong-answer';
    }

    if (revealCorrectAnswer && option.isCorrect) {
      return 'answer-button correct-answer';
    }

    return 'answer-button muted-answer';
  }

  return (
    <article className="question-card">
      <h2>{question.question}</h2>

      <div className="answer-grid">
        {answerOptions.map((option) => (
          <button
            className={getAnswerClass(option)}
            type="button"
            key={option.text}
            disabled={hasAnswered || isLocked}
            onClick={() => onSelectAnswer(option)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </article>
  );
}
