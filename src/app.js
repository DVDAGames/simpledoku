require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { objectHasOwnValue } from './utils/utils';

const App = React.createClass({
  keyBoardArrowConstants: {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight'
  },
  startGame() {

    /*
    var easyPuzzle = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    */

    /*
    const cells = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ];
    */

    const cells = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    const currentFocus = {
      row: null,
      col: null
    };

    this.setState({ cells, currentFocus });
  },
  setCurrentFocus(row = this.state.currentFocus.row, col = this.state.currentFocus.col, focus = false) {
    if(typeof row !== 'undefined' && typeof col !== 'undefined') {
      if(this.state.currentFocus.row !== row || this.state.currentFocus.col !== col) {
        this.setState({ currentFocus: { row, col }});
      }

      if(focus) {
        const rowStr = `row-${row}`;
        const colStr = `col-${col}`;
        const cellStr = `${rowStr}-${colStr}`;
        const inputStr = `${cellStr}-input`;

        const inputRef = this.refs.game.refs[rowStr].refs[cellStr].refs[inputStr];

        inputRef.focus();
      }
    }
  },
  moveFocus(row, col, direction) {
    const cells = this.state.cells;

    switch(direction) {
      case this.keyBoardArrowConstants.UP:
        if(row > 0) {
          this.setCurrentFocus(row - 1, col, true);
        }

        break;

      case this.keyBoardArrowConstants.DOWN:
        if(row < cells.length - 1) {
          this.setCurrentFocus(row + 1, col, true);
        }

        break;

      case this.keyBoardArrowConstants.RIGHT:
        if(col < cells[0].length - 1) {
          this.setCurrentFocus(row, col + 1, true);
        }

        break;

      case this.keyBoardArrowConstants.LEFT:
        if(col > 0) {
          this.setCurrentFocus(row, col - 1, true);
        }

        break;

      default:
        return false;
    }
  },
  onKeyPress(e) {
    const { key } = e;

    if(objectHasOwnValue(this.keyBoardArrowConstants, key)) {
      const { row, col } = this.state.currentFocus;

      if(row === null && col === null) {
        e.preventDefault();

        this.setCurrentFocus(0, 0, true);
      }
    } else {
      return true;
    }
  },
  getInitialState() {
    return {
      cells: [],
      currentFocus: {}
    };
  },
  render() {
    return (
      <div onKeyDown={this.onKeyPress}>
        <h1>Simpledoku</h1>
        <Game ref="game" rows={this.state.cells} buildRow={this.buildRow} moveFocus={this.moveFocus} setCurrentFocus={this.setCurrentFocus} keyBoardArrowConstants={this.keyBoardArrowConstants} currentFocus={this.state.currentFocus} />
        <button onClick={this.startGame}>Play</button>
      </div>
    );
  }
});

const Game = React.createClass({
  render() {
    const rows = this.props.rows.map((cells, row) => {
      return (
        <Row key={`row-${row}`} ref={`row-${row}`} cols={cells} row={row} moveFocus={this.props.moveFocus} setCurrentFocus={this.props.setCurrentFocus} keyBoardArrowConstants={this.props.keyBoardArrowConstants} currentFocus={this.props.currentFocus} />
      );
    });

    return (
      <section className="simpledoku-game">
        <table cellPadding="0" cellSpacing="0" className="simpledoku-grid">
          <tbody>
            {rows}
          </tbody>
        </table>
      </section>
    );
  }
});

const Row = React.createClass({
  render() {
    const cells = this.props.cols.map((val, col) =>{
      return <Cell key={`row-${this.props.row}-col-${col}`} ref={`row-${this.props.row}-col-${col}`} val={val} row={this.props.row} col={col} moveFocus={this.props.moveFocus} setCurrentFocus={this.props.setCurrentFocus} keyBoardArrowConstants={this.props.keyBoardArrowConstants} currentFocus={this.props.currentFocus} />
    });

    return (
      <tr>
        { cells }
      </tr>
    );
  }
});

const Cell = React.createClass({
  onKeyPress(e) {
    const { key } = e;

    if(objectHasOwnValue(this.props.keyBoardArrowConstants, key)) {
      e.preventDefault();

      const { row, col } = this.props;

      this.props.moveFocus(row, col, key);
    } else {
      return true;
    }
  },
  onFocus(e) {
    const { row, col } = this.props;

    this.props.setCurrentFocus(row, col);
  },
  render() {
    const focus = this.props.currentFocus;

    return (
      <td className="simpledoku-cell">
        <input
          type="number"
          ref={`row-${this.props.row}-col-${this.props.col}-input`}
          defaultValue={(this.props.val === 0) ? null : this.props.val}
          readOnly={(this.props.val === 0) ? false : true}
          min="1"
          max="9"
          tabIndex={(this.props.val !== 0) ? -1 : 0}
          onKeyDown={this.onKeyPress}
          onFocus={this.onFocus}
        />
      </td>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('main'));
