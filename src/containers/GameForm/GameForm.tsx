import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './GameForm.module.scss';

export interface GameFormProps {
  numOfRows: number;
  numOfColumns: number;
  numOfMines: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const GameForm: React.SFC<GameFormProps> = props => {
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <TextField
        className={styles.numberInput}
        label="Rows"
        type="number"
        name="numOfRows"
        value={props.numOfRows}
        onChange={props.handleChange}
        inputProps={{ min: '1', max: '50' }}
        helperText="Number of rows"
      />
      <TextField
        className={styles.numberInput}
        label="Columns"
        type="number"
        name="numOfColumns"
        value={props.numOfColumns}
        onChange={props.handleChange}
        inputProps={{ min: '1', max: '50' }}
        helperText="Number of columns"
      />
      <TextField
        className={styles.numberInput}
        label="Mines"
        type="number"
        name="numOfMines"
        value={props.numOfMines}
        onChange={props.handleChange}
        inputProps={{ min: '1', max: props.numOfColumns * props.numOfRows }}
        helperText="Number of mines"
      />
      <Button variant="contained" color="primary" type="submit">
        Start
      </Button>
    </form>
  );
};

export default GameForm;
