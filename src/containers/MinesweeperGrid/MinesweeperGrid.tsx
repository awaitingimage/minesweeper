import * as React from 'react';

export interface MinesweeperGridProps {
  numOfRows: number;
  numOfColumns: number;
  numOfMines: number;
}

export interface MinesweeperGridState {
  grid: number[][];
}

class MinesweeperGrid extends React.Component<MinesweeperGridProps, MinesweeperGridState> {
  state = { grid: [] as number[][] };

  generateGrid = () => {
    let grid = [];
    for (let rowIndex = 0; rowIndex < this.props.numOfRows; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex < this.props.numOfColumns; colIndex++) {
        row.push(0);
      }
      grid.push(row);
    }
    this.setState({ grid }, this.generateMines);
  };

  generateMines = () => {
    let currentMines: number[][] = [];

    while (currentMines.length < this.props.numOfMines) {
      let newCoordinate = this.generateRandomCoordinate(this.props.numOfColumns, this.props.numOfRows);
      let includesMine = currentMines.filter(coordinate => newCoordinate.toString() === coordinate.toString());

      if (includesMine.length < 1) {
        currentMines.push(newCoordinate);
      }
    }
    //console.log(currentMines);
    this.populateMines(currentMines);
  };

  populateMines = (mineCoordinates: number[][]) => {
    let grid = this.cloneGrid();
    mineCoordinates.forEach(coordinates => {
      //console.log(coordinates);
      //grid[coordinates[0]][coordinates[1]] = -1;
      console.log(grid);
    });
    this.setState({ grid }, this.generateClues);
  };

  generateClues = () => {
    let grid = this.cloneGrid();
    grid.forEach((row, rowIndex) => {
      row.forEach((square, colIndex) => {
        if (square < 0) return;
        //this.checkNeighbours(rowIndex, colIndex);
      });
    });
  };

  cloneGrid = () => {
    return this.state.grid.map(arr => arr.slice());
  };

  checkNeighbours = (rowIndex: number, colIndex: number) => {
    let numNeighbourMines = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        let xIndex = rowIndex + x;
        let yIndex = colIndex + y;
        let samePosition = xIndex === rowIndex && yIndex === colIndex;
        if (
          xIndex >= 0 &&
          xIndex < this.props.numOfRows &&
          yIndex >= 0 &&
          yIndex < this.props.numOfColumns &&
          !samePosition
        ) {
          if (this.state.grid[xIndex][yIndex] < 0) numNeighbourMines++;
        }
      }
    }
    console.log(numNeighbourMines);
  };

  generateRandomCoordinate = (colMax: number, rowMax: number): number[] => {
    let y = Math.floor(Math.random() * rowMax);
    let x = Math.floor(Math.random() * colMax);
    return [x, y];
  };

  componentDidMount() {
    this.generateGrid();
  }

  render() {
    return (
      <table>
        <tbody>
          {this.state.grid.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((square, index) => (
                  <td key={index}>{square}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MinesweeperGrid;
