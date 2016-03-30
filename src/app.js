'use strict';

require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';

import Solver from './utilities/solver';

import {
  objectHasOwnValue,
  cloneArray
} from './utilities/utils';

const App = React.createClass({
  keyBoardArrowConstants: {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight'
  },
  keyBoardWASDConstants: {
    UP: 87, //W
    DOWN: 83, //S
    LEFT: 65, //A
    RIGHT: 68 //D
  },
  buttonArray: [
    {
      key: 'playBtn',
      action: 'startGame',
      buttonText: {
        default: 'Play',
        playing: 'New Puzzle',
        puzzleSolved: 'New Puzzle'
      },
      visibleStates: {
        default: true,
        playing: true,
        puzzleSolved: true
      }
    },
    {
      key: 'resetBtn',
      action: 'resetPuzzle',
      buttonText: 'Reset Puzzle',
      visibleStates: {
        default: false,
        playing: true,
        puzzleSolved: false
      }
    },
    {
      key: 'solveBtn',
      action: 'checkSolution',
      buttonText: 'Check Solution',
      visibleStates: {
        default: false,
        playing: true,
        puzzleSolved: false
      }
    },
    {
      key: 'hintBtn',
      action: 'getHint',
      buttonText: 'Get Hint',
      visibleStates: {
        default: false,
        playing: true,
        puzzleSolved: false
      }
    },
  ],
  startGame() {
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

    /*
    [9, 5, 3, 4, 2, 8, 7, 1, 6],
    [2, 4, 1, 6, 7, 9, 8, 3, 5],
    [7, 8, 6, 3, 5, 1, 9, 4, 2],
    [8, 3, 5, 1, 9, 6, 4, 2, 7],
    [1, 9, 4, 7, 3, 2, 5, 6, 8],
    [6, 7, 2, 8, 4, 5, 3, 9, 1],
    [3, 2, 8, 5, 1, 4, 6, 7, 9],
    [4, 6, 9, 2, 8, 7, 1, 5, 3],
    [5, 1, 7, 9, 6, 3, 2, 8, 4]
    */

    /*
    [0, 0, 3, 0, 0, 8, 0, 0, 0],
    [0, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 0, 3, 5, 0, 9, 0, 0],
    [8, 0, 5, 0, 0, 6, 0, 0, 0],
    [1, 0, 0, 7, 3, 2, 0, 0, 8],
    [0, 0, 0, 8, 0, 0, 3, 0, 1],
    [0, 0, 8, 0, 1, 4, 0, 7, 0],
    [0, 0, 0, 0, 0, 0, 0, 5, 0],
    [0, 0, 0, 9, 0, 0, 2, 0, 0]
    */

    const cells = [
      [9, 5, 3, 4, 2, 8, 7, 1, 6],
      [2, 0, 1, 6, 7, 9, 8, 3, 5],
      [7, 8, 6, 3, 5, 1, 9, 4, 2],
      [8, 3, 5, 1, 9, 6, 4, 2, 7],
      [1, 9, 4, 7, 3, 2, 5, 6, 8],
      [6, 7, 2, 8, 4, 5, 3, 9, 1],
      [3, 2, 8, 5, 1, 4, 6, 7, 9],
      [4, 6, 9, 2, 8, 7, 1, 5, 3],
      [5, 1, 7, 9, 6, 3, 2, 8, 4]
    ];

    const puzzle = cloneArray(cells);

    const currentFocus = {
      row: null,
      col: null
    };

    const playing = true;

    this.setState({ cells, puzzle, currentFocus, playing });
  },
  checkSolution() {
    const puzzleChecked = true;
    const puzzleSolved = new Solver(this.state.cells).checkSolution();
    let playing = true;

    if(puzzleSolved) {
      playing = false;
    }

    this.setState({ puzzleSolved, playing, puzzleChecked });
  },
  puzzleCheckedState(puzzleChecked) {
    this.setState({ puzzleChecked });
  },
  resetPuzzle() {
    const cells = cloneArray(this.state.puzzle);

    const puzzleChecked = false;

    this.setState({ cells, puzzleChecked });
  },
  getHint() {
    console.log('Give user hint');
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
  moveFocus(row, col, direction, constants) {
    const cells = this.state.cells;

    switch(direction) {
      case constants.UP:
        if(row > 0) {
          this.setCurrentFocus(row - 1, col, true);
        }

        break;

      case constants.DOWN:
        if(row < cells.length - 1) {
          this.setCurrentFocus(row + 1, col, true);
        }

        break;

      case constants.RIGHT:
        if(col < cells[0].length - 1) {
          this.setCurrentFocus(row, col + 1, true);
        }

        break;

      case constants.LEFT:
        if(col > 0) {
          this.setCurrentFocus(row, col - 1, true);
        }

        break;

      default:
        return false;
    }
  },
  setValue(row, col, val) {
    const cells = this.state.cells;

    cells[row][col] = parseInt(val, 10);

    this.setState({ cells });
  },
  onKeyPress(e) {
    let { key } = e;
    let constants = this.keyBoardArrowConstants;

    if(this.state.puzzleChecked) {
      this.setState({ puzzleChecked: false });
    }

    if(key === 'Unidentified') {
      key = e.which;
      constants = this.keyBoardWASDConstants;
    }

    if(objectHasOwnValue(constants, key)) {
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
      puzzle: [],
      currentFocus: {},
      puzzleSolved: false,
      playing: false,
      puzzleChecked: false
    };
  },
  render() {
    const buttons = this.buttonArray.map((button) => {
      let { key, action, buttonText, visibleStates } = button;

      const visibleStatesArray = _.keys(visibleStates);

      let displayButton = false;

      if(this.state.puzzleSolved && buttonText.hasOwnProperty('puzzleSolved')) {
        buttonText = buttonText.puzzleSolved;
      } else if(this.state.playing && buttonText.hasOwnProperty('playing')) {
        buttonText = buttonText.playing;
      } else if(buttonText.hasOwnProperty('default')) {
        buttonText = buttonText.default;
      }

      if(visibleStatesArray.length) {
        displayButton = visibleStatesArray.some((key) => {
          if(key === 'default') {
            return visibleStates[key];
          }

          if(this.state[key] && visibleStates[key]) {
            return true;
          }

          return false;
        });
      }

      if(displayButton) {
        return <GameButton key={key} ref={key} action={this[action]} buttonText={buttonText} />
      }
    });

    return (
      <div className="simpledoku-game"  onKeyDown={this.onKeyPress}>
        <h1>Simpledoku</h1>
        <Game ref="game" rows={this.state.cells} puzzle={this.state.puzzle} buildRow={this.buildRow} moveFocus={this.moveFocus} setCurrentFocus={this.setCurrentFocus} keyBoardArrowConstants={this.keyBoardArrowConstants} keyBoardWASDConstants={this.keyBoardWASDConstants} currentFocus={this.state.currentFocus} setValue={this.setValue} puzzleSolved={this.state.puzzleSolved} puzzleChecked={this.state.puzzleChecked} puzzleCheckedState={this.puzzleCheckedState}/>

        { buttons }

      </div>
    );
  }
});

const GameButton = React.createClass({
  render() {
    const { key, action, buttonText } = this.props;

    return (
      <button className="simpledoku-button" key={key} onClick={action}>{buttonText}</button>
    );
  }
});

const Game = React.createClass({
  render() {
    const rows = this.props.rows.map((cells, row) => {
      return (
        <Row key={`row-${row}`} ref={`row-${row}`} cols={cells} row={row} puzzle={this.props.puzzle} moveFocus={this.props.moveFocus} setCurrentFocus={this.props.setCurrentFocus} keyBoardArrowConstants={this.props.keyBoardArrowConstants} keyBoardWASDConstants={this.props.keyBoardWASDConstants} currentFocus={this.props.currentFocus} setValue={this.props.setValue} puzzleCheckedState={this.props.puzzleCheckedState} />
      );
    });

    let classes = ['simpledoku-grid'];

    if(this.props.puzzleChecked && !this.props.puzzleSolved) {
      classes.push('simpledoku-grid--failed');
    } else if(this.props.puzzleSolved) {
      classes.push('simpledoku-grid--solved');
    }

    return (
      <section className={classes.join(' ')}>
        <table cellPadding="0" cellSpacing="0" className="simpledoku-grid-table">
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
      return <Cell key={`row-${this.props.row}-col-${col}`} ref={`row-${this.props.row}-col-${col}`} val={val} puzzle={this.props.puzzle} row={this.props.row} col={col} moveFocus={this.props.moveFocus} setCurrentFocus={this.props.setCurrentFocus} keyBoardArrowConstants={this.props.keyBoardArrowConstants} keyBoardWASDConstants={this.props.keyBoardWASDConstants} currentFocus={this.props.currentFocus} setValue={this.props.setValue} puzzleCheckedState={this.props.puzzleCheckedState} />
    });

    return (
      <tr className="simpledoku-row">
        { cells }
      </tr>
    );
  }
});

const Cell = React.createClass({
  onKeyPress(e) {
    let { key } = e;
    let constants = this.props.keyBoardArrowConstants;

    if(key === 'Unidentified') {
      key = e.which;
      constants = this.props.keyBoardWASDConstants;
    }

    if(objectHasOwnValue(constants, key)) {
      e.preventDefault();

      const { row, col } = this.props;

      this.props.moveFocus(row, col, key, constants);
    } else {
      return true;
    }
  },
  onChange(e) {
    const { row, col } = this.props;

    this.props.setValue(row, col, e.target.value);
  },
  onFocus(e) {
    const { row, col } = this.props;

    this.props.puzzleCheckedState(false);

    this.props.setCurrentFocus(row, col);
  },
  render() {
    const focus = this.props.currentFocus;

    return (
      <td className="simpledoku-cell">
        <input
          type="number"
          ref={`row-${this.props.row}-col-${this.props.col}-input`}
          value={(this.props.val === 0) ? null : this.props.val}
          readOnly={(parseInt(this.props.puzzle[this.props.row][this.props.col], 10) === 0) ? false : true}
          min="1"
          max="9"
          className={(parseInt(this.props.puzzle[this.props.row][this.props.col], 10) !== 0) ? 'simpledoku-cell-input simpledoku-cell-input--default' : 'simpledoku-cell-input'}
          tabIndex={(this.props.val !== 0) ? -1 : 0}
          onKeyDown={this.onKeyPress}
          onFocus={this.onFocus}
          onChange={this.onChange}
        />
      </td>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('main'));
