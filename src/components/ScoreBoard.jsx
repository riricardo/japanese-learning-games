export default function ScoreBoard({ score, accuracy }) {
  return (
    <aside className="score-board" aria-label="Score">
      <h2>Score</h2>
      <dl>
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
    </aside>
  );
}
