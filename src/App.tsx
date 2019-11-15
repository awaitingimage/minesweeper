import React from 'react';
import './App.css';
import './containers/MinesweeperGrid';
import MinesweeperGrid from './containers/MinesweeperGrid';

const App: React.FC = () => {
  return (
    <div className="App">
      <MinesweeperGrid numOfRows={7} numOfColumns={5} numOfMines={5}></MinesweeperGrid>
    </div>
  );
};

export default App;
