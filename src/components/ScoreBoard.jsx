import { useState } from 'react';

export default function ScoreBoard({ score, accuracy, showFeedback, onToggleFeedback }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <aside className="score-strip" aria-label="Score">
      <div className="score-pill">
        <span>Accuracy</span>
        <strong>{accuracy}%</strong>
      </div>
      <div className="score-pill">
        <span>Streak</span>
        <strong>{score.currentStreak}</strong>
      </div>
      <div className="score-pill">
        <span>Answered</span>
        <strong>{score.totalAnswered}</strong>
      </div>
      <button className="text-button score-details-button" type="button" onClick={() => setIsDetailsOpen(true)}>
        Details
      </button>

      {isDetailsOpen && (
        <div className="modal-backdrop" role="presentation">
          <section
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="score-details-title"
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">Quiz Status</p>
                <h2 id="score-details-title">Details</h2>
              </div>
              <button className="text-button close-button" type="button" onClick={() => setIsDetailsOpen(false)}>
                Close
              </button>
            </div>

            <dl className="score-details-list">
              <div>
                <dt>Accuracy</dt>
                <dd>{accuracy}%</dd>
              </div>
              <div>
                <dt>Correct Answers</dt>
                <dd>{score.correct}</dd>
              </div>
              <div>
                <dt>Wrong Answers</dt>
                <dd>{score.wrong}</dd>
              </div>
              <div>
                <dt>Current Streak</dt>
                <dd>{score.currentStreak}</dd>
              </div>
              <div>
                <dt>Best Streak</dt>
                <dd>{score.bestStreak}</dd>
              </div>
              <div>
                <dt>Total Answered</dt>
                <dd>{score.totalAnswered}</dd>
              </div>
            </dl>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={showFeedback}
                onChange={(event) => onToggleFeedback(event.target.checked)}
              />
              <span>
                <strong>Show answer feedback</strong>
                <small>
                  {showFeedback
                    ? 'After each answer, open the result with the explanation and a Next button.'
                    : 'After each answer, skip straight to the next question.'}
                </small>
              </span>
            </label>
          </section>
        </div>
      )}
    </aside>
  );
}
