export default function Home({ games, onStartGame }) {
  return (
    <section className="home-screen" aria-labelledby="app-title">
      <div className="home-header">
        <p className="eyebrow">Choose a Game</p>
        <h1 id="app-title">Japanese Quiz</h1>
        <p className="subtitle">Practice Japanese with quick infinite quizzes.</p>
      </div>

      <div className="game-grid">
        {games.map((game) => (
          <article className="game-card" key={game.id}>
            <div>
              <h2>{game.title}</h2>
              <p>{game.description}</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onStartGame(game)}>
              Start
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
