import { useState } from 'react';
import Home from './components/Home.jsx';
import Quiz from './components/Quiz.jsx';

const games = [
  {
    id: 'days-of-month',
    title: 'Japanese Days of the Month',
    description: 'Practice days 1 to 31 in Japanese.',
    dataUrl: '/src/data/days-of-month.json',
    icon: '📅',
  },
  {
    id: 'months',
    title: 'Japanese Months',
    description: 'Practice the months of the year in Japanese.',
    dataUrl: '/src/data/months.json',
    icon: '🇯🇵',
  },
  {
    id: 'weekdays',
    title: 'Japanese Weekdays',
    description: 'Practice the days of the week in Japanese.',
    dataUrl: '/src/data/weekdays.json',
    icon: '🌸',
  },
];

const dataFiles = import.meta.glob('./data/*.json', {
  query: '?url',
  import: 'default',
  eager: true,
});

function resolveDataUrl(dataUrl) {
  const localPath = dataUrl.replace('/src/', './');
  return dataFiles[localPath] || dataUrl;
}

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  function startGame(game) {
    setSelectedGame({
      ...game,
      dataUrl: resolveDataUrl(game.dataUrl),
    });
  }

  function returnHome() {
    setSelectedGame(null);
  }

  return (
    <main className="app-shell">
      {selectedGame ? (
        <Quiz game={selectedGame} onBack={returnHome} />
      ) : (
        <Home games={games} onStartGame={startGame} />
      )}
    </main>
  );
}
