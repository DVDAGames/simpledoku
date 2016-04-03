'use strict';

import React, { Component } from 'react';
import _ from 'lodash';

import Grid from '../Grid/Grid';
import GameButton from '../Game-Button/Game-Button';

import Solver from '../../utilities/solver';

import {
  objectHasOwnValue,
  cloneArray
} from '../../utilities/utils';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: [],
      puzzle: [],
      currentFocus: {},
      puzzleSolved: false,
      playing: false,
      puzzleChecked: false,
      highlightMode: 0
    };

    this.keyBoardArrowConstants = {
      UP: 'ArrowUp',
      DOWN: 'ArrowDown',
      LEFT: 'ArrowLeft',
      RIGHT: 'ArrowRight'
    };

    this.keyBoardWASDConstants = {
      UP: 87, //W
      DOWN: 83, //S
      LEFT: 65, //A
      RIGHT: 68 //D
    };

    this.keyBoardOtherConstants = {
      SOLVE: ['Enter'],
      VALID_VALUE: [49, 50, 51, 52, 53, 54, 55, 56, 57]
    };

    this.inputValues = {
      min: 1,
      max: 9
    };

    this.buttonArray = [
      {
        key: 'playBtn',
        type: 'button',
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
        type: 'reset',
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
        type: 'submit',
        action: 'onSubmit',
        buttonText: 'Check Solution',
        visibleStates: {
          default: false,
          playing: true,
          puzzleSolved: false
        }
      },
      {
        key: 'hintBtn',
        type: 'button',
        action: 'getHint',
        buttonText: 'Get Hint',
        visibleStates: {
          default: false,
          playing: true,
          puzzleSolved: false
        }
      }
    ];

    this.highlightModes = [
      'none',
      'row',
      'col',
      'section'
    ];

    this.startGame = this.startGame.bind(this);
    this.checkSolution = this.checkSolution.bind(this);
    this.puzzleCheckedState = this.puzzleCheckedState.bind(this);
    this.resetPuzzle = this.resetPuzzle.bind(this);
    this.getHint = this.getHint.bind(this);
    this.setCurrentFocus = this.setCurrentFocus.bind(this);
    this.moveFocus = this.moveFocus.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.resetFocus = this.resetFocus.bind(this);
    this.switchHighlightMode = this.switchHighlightMode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

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

    const generator = new Solver();

    const cells = generator.createSolution();

    /*const cells = [
      [9, 5, 3, 4, 2, 8, 7, 1, 6],
      [2, 0, 1, 6, 7, 9, 8, 3, 5],
      [7, 8, 6, 3, 5, 1, 9, 4, 2],
      [8, 3, 5, 1, 9, 6, 4, 2, 7],
      [1, 9, 4, 7, 3, 2, 5, 6, 8],
      [6, 7, 2, 8, 4, 5, 3, 9, 1],
      [3, 2, 8, 5, 1, 4, 6, 7, 9],
      [4, 6, 9, 2, 8, 7, 1, 5, 3],
      [5, 1, 7, 9, 6, 3, 2, 8, 4]
    ];*/

    const puzzle = cloneArray(cells);

    const currentFocus = {
      row: null,
      col: null
    };

    const playing = true;
    const puzzleSolved = false;
    const puzzleChecked = false;

    this.setState({ cells, puzzle, currentFocus, playing, puzzleSolved, puzzleChecked });
  }

  onSubmit(e) {
    e.preventDefault();

    this.checkSolution();
  }

  checkSolution() {
    const puzzleChecked = true;
    const puzzleSolved = new Solver(this.state.cells).checkSolution();
    let playing = true;

    if(puzzleSolved) {
      playing = false;
    } else {
      this.resetFocus();
    }

    this.setState({ puzzleSolved, playing, puzzleChecked });
  }

  puzzleCheckedState(puzzleChecked) {
    this.setState({ puzzleChecked });
  }

  resetPuzzle() {
    const cells = cloneArray(this.state.puzzle);

    const puzzleChecked = false;

    this.setState({ cells, puzzleChecked });

    this.resetFocus();
  }

  getHint() {
    console.log('Give user hint');

    this.resetFocus();
  }

  switchHighlightMode(row, col, currentMode = this.state.highlightMode) {
    let highlightMode;
    let highlights;

    if(currentMode + 1 < this.highlightModes.length) {
      highlightMode = currentMode + 1;
    } else {
      highlightMode = 0;
    }

    this.setState({ highlightMode });
  }

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
  }

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
  }

  resetFocus() {
    const row = this.state.currentFocus.row || 0;
    const col = this.state.currentFocus.col || 0;

    const rowStr = `row-${row}`;
    const colStr = `col-${col}`;
    const cellStr = `${rowStr}-${colStr}`;
    const inputStr = `${cellStr}-input`;

    const inputRef = this.refs.game.refs[rowStr].refs[cellStr].refs[inputStr];

    inputRef.focus();
  }

  setValue(row, col, val) {
    const cells = this.state.cells;

    cells[row][col] = (val === "") ? 0 : parseInt(val, 10);

    this.setState({ cells });
  }

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

    console.log(key);

    if(objectHasOwnValue(constants, key)) {
      const { row, col } = this.state.currentFocus;

      if(row === null && col === null) {
        e.preventDefault();

        this.setCurrentFocus(0, 0, true);
      }
    } else {
      return true;
    }
  }

  render() {
    const buttons = this.buttonArray.map((button) => {
      let { key, action, buttonText, visibleStates, type } = button;

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
        return <GameButton key={key} ref={key} action={this[action]} buttonText={buttonText} type={type} />
      }
    });

    return (
      <div className="simpledoku-game"  onKeyDown={this.onKeyPress}>
        <h1>Simpledoku</h1>
        <form autoComplete="off" noValidate onSubmit={this.onSubmit}>
          <Grid ref="game" { ...this.state } startGame={this.startGame} onKeyPress={this.onKeyPress} setValue={this.setValue} resetFocus={this.resetFocus} moveFocus={this.moveFocus} setCurrentFocus={this.setCurrentFocus} switchHighlightMode={this.switchHighlightMode} getHint={this.getHint} resetPuzzle={this.resetPuzzle} puzzleCheckedState={this.puzzleCheckedState} checkSolution={this.checkSolution} highlightModes={this.highlightModes} keyBoardWASDConstants={this.keyBoardWASDConstants} keyBoardArrowConstants={this.keyBoardArrowConstants} keyBoardOtherConstants={this.keyBoardOtherConstants} inputValues={this.inputValues} />

          { buttons }

        </form>
      </div>
    );
  }
};

export default Game;
