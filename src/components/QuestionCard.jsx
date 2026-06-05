export default function QuestionCard({
  question,
  answerOptions,
  selectedAnswer,
  onSelectAnswer,
  isLocked = false,
}) {
  const hasAnswered = Boolean(selectedAnswer);

  function getAnswerClass(option) {
    if (!hasAnswered) {
      return 'answer-button';
    }

    if (option.isCorrect) {
      return 'answer-button correct-answer';
    }

    if (option === selectedAnswer) {
      return 'answer-button wrong-answer';
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
