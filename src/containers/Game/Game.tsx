import * as React from 'react';
import MinesweeperGrid from '../MinesweeperGrid';

export interface GameProps {}

export interface GameState {
  numOfRows: number;
  numOfColumns: number;
  numOfMines: number;
  gameDifficulty: string;
  [key: string]: any;
}

class Game extends React.Component<GameProps, GameState> {
  state = {
    numOfRows: 5,
    numOfColumns: 5,
    numOfMines: 5,
    gameRows: 5,
    gameColumns: 5,
    gameMines: 5,
    gameDifficulty: 'easy',
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      gameRows: this.state.numOfRows,
      gameColumns: this.state.numOfColumns,
      gameMines: this.state.numOfMines,
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, event.target.name);
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="rows">Number of rows:</label>
          <input
            onChange={this.handleChange}
            id="rows"
            type="number"
            min="0"
            max="50"
            name="numOfRows"
            value={this.state.numOfRows}
          />
          <label htmlFor="columns">Number of columns:</label>
          <input
            onChange={this.handleChange}
            id="columns"
            type="number"
            min="0"
            max="50"
            name="numOfColumns"
            value={this.state.numOfColumns}
          />
          <label htmlFor="mines">Number of mines:</label>
          <input
            onChange={this.handleChange}
            id="mines"
            type="number"
            min="0"
            max={this.state.numOfColumns * this.state.numOfRows}
            name="numOfMines"
            value={this.state.numOfMines}
          />
          <input type="submit" value="Submit" />
        </form>
        <MinesweeperGrid
          numOfRows={this.state.gameRows}
          numOfColumns={this.state.gameColumns}
          numOfMines={this.state.gameMines}
        ></MinesweeperGrid>
      </>
    );
  }
}

export default Game;
