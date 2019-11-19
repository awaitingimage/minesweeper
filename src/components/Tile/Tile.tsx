import * as React from 'react';
import styles from './Tile.module.css';

export interface TileProps {
  tileValue: number;
}

export interface TileState {
  shown: boolean;
}

class Tile extends React.Component<TileProps, TileState> {
  state = { shown: false };

  onClick = (event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
    this.setState({ shown: true });
  };
  render() {
    const style = !this.state.shown ? styles.hiddenTile : null;
    return (
      <td className={`${style}`} onClick={this.onClick}>
        {this.props.tileValue < 0 ? 'X' : this.props.tileValue}
      </td>
    );
  }
}

export default Tile;
