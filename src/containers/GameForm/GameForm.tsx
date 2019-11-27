import * as React from 'react';

export interface GameFormProps {
  numOfRows: number;
  numOfColumns: number;
  numOfMines: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface GameFormState {}

class GameForm extends React.Component<GameFormProps, GameFormState> {
  //state = { :  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label htmlFor="rows">Number of rows:</label>
        <input
          onChange={this.props.handleChange}
          id="rows"
          type="number"
          min="0"
          max="50"
          name="numOfRows"
          value={this.props.numOfRows}
        />
        <label htmlFor="columns">Number of columns:</label>
        <input
          onChange={this.props.handleChange}
          id="columns"
          type="number"
          min="0"
          max="50"
          name="numOfColumns"
          value={this.props.numOfColumns}
        />
        <label htmlFor="mines">Number of mines:</label>
        <input
          onChange={this.props.handleChange}
          id="mines"
          type="number"
          min="0"
          max={this.props.numOfColumns * this.props.numOfRows}
          name="numOfMines"
          value={this.props.numOfMines}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default GameForm;
