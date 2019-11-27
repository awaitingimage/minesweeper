import * as React from 'react';
import styles from './MinesweeperGrid.module.css';
import Tile, { iTile } from '../../components/Tile';

export interface MinesweeperGridProps {
  numOfRows: number;
  numOfColumns: number;
  numOfMines: number;
}

export interface MinesweeperGridState {
  grid: iTile[][];
  currentMines: number[][];
  numOfLoops: number;
  gameFinished: boolean;
}

class MinesweeperGrid extends React.Component<MinesweeperGridProps, MinesweeperGridState> {
  state = { grid: [] as iTile[][], currentMines: [] as number[][], numOfLoops: 0, gameFinished: false };

  generateGrid = () => {
    let grid = [];
    let numOfLoops = this.state.numOfLoops;
    for (let rowIndex = 0; rowIndex < this.props.numOfRows; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex < this.props.numOfColumns; colIndex++) {
        row.push({ x: colIndex, y: rowIndex, value: 0, hidden: true, mine: false, flagged: false });
        numOfLoops++;
      }
      grid.push(row);
    }
    this.setState({ grid, numOfLoops }, this.generateMines);
  };

  generateMines = () => {
    let currentMines: number[][] = [];

    while (currentMines.length < this.props.numOfMines) {
      let newCoordinate = this.generateRandomCoordinate(this.props.numOfRows, this.props.numOfColumns);
      let includesMine = currentMines.filter(coordinate => newCoordinate.toString() === coordinate.toString());

      if (includesMine.length < 1) {
        currentMines.push(newCoordinate);
      }
    }
    this.setState({ currentMines }, this.populateMines);
  };

  populateMines = () => {
    let grid = this.cloneGrid();
    this.state.currentMines.forEach(coordinates => {
      grid[coordinates[0]][coordinates[1]].mine = true;
    });
    this.setState({ grid }, this.generateClues);
  };

  generateClues = () => {
    let grid = this.cloneGrid();
    this.state.currentMines.forEach(coordinates => {
      grid = this.checkNeighbours(grid, coordinates[0], coordinates[1], this.incrementNeighbour);
    });
    this.setState({ grid });
  };

  cloneGrid = () => {
    // look into immutability helpers https://reactjs.org/docs/update.html
    return this.state.grid.map(arr =>
      arr.map(obj => {
        return { ...obj };
      }),
    );
  };

  checkNeighbours = (grid: iTile[][], rowIndex: number, colIndex: number, callback: any) => {
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        this.setState(state => {
          return { numOfLoops: state.numOfLoops + 1 };
        });
        let yIndex = rowIndex + y;
        let xIndex = colIndex + x;
        let samePosition = xIndex === rowIndex && yIndex === colIndex;
        if (
          xIndex >= 0 &&
          xIndex < this.props.numOfColumns &&
          yIndex >= 0 &&
          yIndex < this.props.numOfRows &&
          !samePosition
        ) {
          grid = callback(grid, yIndex, xIndex);
        }
      }
    }
    return grid;
  };

  incrementNeighbour = (grid: iTile[][], yIndex: number, xIndex: number) => {
    if (!grid[yIndex][xIndex].mine) {
      grid[yIndex][xIndex].value++;
    }
    return grid;
  };

  revealNeighbour = (grid: iTile[][], yIndex: number, xIndex: number) => {
    let neighbourTile = grid[yIndex][xIndex];
    if (neighbourTile.value >= 0 && neighbourTile.hidden && !neighbourTile.mine) {
      neighbourTile.hidden = false;
      grid[yIndex][xIndex] = neighbourTile;
      if (neighbourTile.value === 0) grid = this.checkNeighbours(grid, yIndex, xIndex, this.revealNeighbour);
    }
    return grid;
  };

  generateRandomCoordinate = (colMax: number, rowMax: number): number[] => {
    let y = Math.floor(Math.random() * rowMax);
    let x = Math.floor(Math.random() * colMax);
    return [x, y];
  };

  componentDidMount() {
    this.generateGrid();
  }

  componentDidUpdate(prevProps: MinesweeperGridProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      console.log('regenerate grid');
      this.generateGrid();
    }
  }

  tileClicked = (tile: iTile, explosion = false, checkNeighbours = false) => {
    if (explosion) console.log('dead');
    let grid = this.cloneGrid();
    grid[tile.y][tile.x] = tile;
    if (checkNeighbours) {
      grid = this.checkNeighbours(grid, tile.y, tile.x, this.revealNeighbour);
    }
    this.setState({ grid });
  };

  render() {
    return (
      <table className={styles.grid}>
        <tbody>
          {this.state.grid.map((row, rowIndex) => {
            return (
              <tr key={`${this.props.numOfColumns}-${this.props.numOfRows}-${rowIndex}`}>
                {row.map((tile, colIndex) => (
                  <Tile
                    key={`${this.props.numOfColumns}-${this.props.numOfRows}-${rowIndex}-${colIndex}`}
                    tileData={tile}
                    onClick={this.tileClicked}
                  />
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
