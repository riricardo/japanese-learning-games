export default function QuestionCard({
  question,
  answerOptions,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
}) {
  const hasAnswered = Boolean(selectedAnswer);
  const selectedCorrectly = selectedAnswer?.isCorrect;

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
            disabled={hasAnswered}
            onClick={() => onSelectAnswer(option)}
          >
            {option.text}
          </button>
        ))}
      </div>

      {hasAnswered && (
        <div className="feedback-panel" aria-live="polite">
          <p className={selectedCorrectly ? 'feedback-title correct-text' : 'feedback-title wrong-text'}>
            {selectedCorrectly ? 'Correct' : 'Incorrect'}
          </p>
          {selectedAnswer.rationale && <p>{selectedAnswer.rationale}</p>}
          {question.hint && (
            <p>
              <strong>Hint:</strong> {question.hint}
            </p>
          )}
          <button className="primary-button next-button" type="button" onClick={onNextQuestion}>
            Next Question
          </button>
        </div>
      )}
    </article>
  );
}
