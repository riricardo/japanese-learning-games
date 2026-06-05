export default function Home({ games, onStartGame }) {
  return (
    <section className="home-screen" aria-labelledby="app-title">
      <div className="home-header">
        <div className="theme-icons" aria-hidden="true">
          <span className="japan-flag-icon"></span>
          <span className="sakura-icon">
            <span></span>
          </span>
        </div>
        <p className="eyebrow">Choose a Game</p>
        <h1 id="app-title">Japanese Quiz</h1>
        <p className="subtitle">Practice Japanese with quick infinite quizzes.</p>
      </div>

      <div className="game-grid">
        {games.map((game) => (
          <article className="game-card" key={game.id}>
            <div>
              <div className="game-card-heading">
                <span className={`game-icon ${game.icon}-game-icon`} aria-hidden="true">
                  <span></span>
                </span>
                <h2>{game.title}</h2>
              </div>
              <p>{game.description}</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onStartGame(game)}>
              <span>Start</span>
              <span className="button-arrow" aria-hidden="true"></span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
