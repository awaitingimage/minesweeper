import * as React from 'react';
import MinesweeperGrid from '../MinesweeperGrid';
import GameForm from '../../components/GameForm';

export interface GameProps {}

export interface GameState {
  numOfRows: number;
  numOfColumns: number;
  numOfMines: number;
  gameDifficulty: string;
  gameNumber: number;
  [key: string]: any;
}

class Game extends React.Component<GameProps, GameState> {
  state = {
    numOfRows: 6,
    numOfColumns: 6,
    numOfMines: 10,
    gameRows: 6,
    gameColumns: 6,
    gameMines: 10,
    gameNumber: 1,
    gameDifficulty: 'easy',
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      gameRows: this.state.numOfRows,
      gameColumns: this.state.numOfColumns,
      gameMines: this.state.numOfMines,
      gameNumber: this.state.gameNumber + 1,
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, event.target.name);
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  };

  render() {
    return (
      <>
        <GameForm
          numOfRows={this.state.numOfRows}
          numOfColumns={this.state.numOfColumns}
          numOfMines={this.state.numOfMines}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <MinesweeperGrid
          gameNumber={this.state.gameNumber}
          numOfRows={this.state.gameRows}
          numOfColumns={this.state.gameColumns}
          numOfMines={this.state.gameMines}
        ></MinesweeperGrid>
      </>
    );
  }
}

export default Game;
