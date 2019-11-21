import * as React from 'react';
import styles from './Tile.module.css';

export interface TileProps {
  tileData: interfaceTile;
  onClick: (tile: interfaceTile, explosion: boolean) => void;
}

export interface interfaceTile {
  value: number;
  hidden: boolean;
  mine: boolean;
  flagged: boolean;
  x: number;
  y: number;
}

export interface TileState {}

class Tile extends React.Component<TileProps, TileState> {
  onClick = (event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
    event.preventDefault();
    if (!this.props.tileData.hidden) return;
    let tileUpdate = { ...this.props.tileData } as interfaceTile;
    let explosion = false;
    if (event.type === 'contextmenu') {
      tileUpdate.flagged = !tileUpdate.flagged;
    } else {
      explosion = tileUpdate.mine;
      tileUpdate.hidden = false;
    }
    this.props.onClick(tileUpdate, explosion);
  };

  render() {
    const hidden = this.props.tileData.hidden ? styles.hiddenTile : null;
    let tileValue = this.props.tileData.mine ? 'X' : this.props.tileData.value;
    tileValue = this.props.tileData.hidden ? ' ' : tileValue;
    const flagged = this.props.tileData.flagged ? styles.flagged : null;
    return (
      <td className={`${styles.tile} ${hidden} ${flagged}`} onClick={this.onClick} onContextMenu={this.onClick}>
        {tileValue}
      </td>
    );
  }
}

export default Tile;
