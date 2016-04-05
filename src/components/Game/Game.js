import React, { Component } from 'react';
import { random, keys } from 'lodash';
import axios from 'axios';

import Grid from '../Grid/Grid';
import GameButton from '../Game-Button/Game-Button';
import HintCounter from '../Hint-Counter/Hint-Counter';

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
      solution: [],
      currentFocus: {},
      puzzleSolved: false,
      playing: false,
      puzzleChecked: false,
      highlightMode: 0,
      gaveUp: false,
      hintsUsed: 0,
      maxHints: 7,
      solvedPuzzles: [],
      puzzleID: null,
      totalPuzzles: null
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
          default: 'New',
          playing: 'New',
          puzzleSolved: 'New'
        },
        visibleStates: {
          default: false,
          playing: true,
          puzzleSolved: true
        }
      },
      {
        key: 'resetBtn',
        type: 'reset',
        action: 'resetPuzzle',
        buttonText: 'Reset',
        visibleStates: {
          default: false,
          playing: true,
          puzzleSolved: false
        }
      },
      {
        key: 'forfeitBtn',
        type: 'button',
        action: 'giveUp',
        buttonText: 'Give Up',
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
        buttonText: 'Check',
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
        buttonText: 'Hint',
        disable: [
          {
            check: 'hintsUsed',
            against: 'maxHints'
          }
        ],
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
      'cross',
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
    this.giveUp = this.giveUp.bind(this);

    this.startGame();
  }

  startGame() {
    const { puzzleID, solvedPuzzles, totalPuzzles, puzzleSolved } = this.state;

    const solvedPuzzleArray = cloneArray(solvedPuzzles);

    if(totalPuzzles) {
      if(solvedPuzzleArray.indexOf(puzzleID) === -1 && !puzzleSolved) {
        solvedPuzzleArray.push(puzzleID);
      }
    }

    const puzzleString = solvedPuzzleArray.join(',');

    axios.get(
      'http://localhost:3333/puzzle',
      {
        params: {
          solved: puzzleString
        }
      })
      .then((response) => {
        const totalPuzzles = response.data.totalPuzzles;
        const cells = response.data.puzzle;
        const solution = response.data.solution;
        const puzzle = cloneArray(cells);
        const puzzleID = response.data.id;

        const currentFocus = {
          row: null,
          col: null
        };

        const playing = true;
        const gaveUp = false;
        const puzzleSolved = false;
        const puzzleChecked = false;
        const hintsUsed = 0;
        const maxHints = 7;

        this.setState({ cells, puzzle, solution, currentFocus, playing, gaveUp, hintsUsed, maxHints, puzzleSolved, puzzleChecked, puzzleID, totalPuzzles });

        this.resetFocus();
      })
      .catch((response) => {
        window.alert('You\'ve solved all the puzzles in this version of the game. We\'ll have more soon!');
      })
    ;
  }

  giveUp(e) {
    let { cells, solution, puzzleID, solvedPuzzles } = this.state;

    const gaveUp = true;
    const puzzleSolved = true;
    solvedPuzzles.push(puzzleID);

    cells = solution;

    this.setState({ cells, gaveUp, puzzleSolved, solvedPuzzles });
  }

  onSubmit(e) {
    e.preventDefault();

    this.checkSolution();
  }

  checkSolution() {
    const { solvedPuzzles, puzzleID } = this.state;
    const puzzleChecked = true;
    const puzzleSolved = new Solver(this.state.cells).checkSolution();
    let playing = true;

    if(puzzleSolved) {
      solvedPuzzles.push(puzzleID);
      playing = false;
    } else {
      this.resetFocus();
    }

    this.setState({ puzzleSolved, playing, puzzleChecked, solvedPuzzles });
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

  generateHint(cells) {
    let cell = {};
    cell.row = random(0, cells.length - 1);
    cell.col = random(0, cells[cell.row].length - 1);

    while(cells[cell.row][cell.col] !== 0) {
      cell = this.generateHint(cells);
    }

    return cell;
  }

  getHint() {
    let { solution, cells, puzzle, hintsUsed, maxHints, currentFocus } = this.state;

    if(hintsUsed < maxHints) {
      currentFocus = this.generateHint(cells);

      cells[currentFocus.row][currentFocus.col] = solution[currentFocus.row][currentFocus.col];
      puzzle[currentFocus.row][currentFocus.col] = solution[currentFocus.row][currentFocus.col];

      hintsUsed = hintsUsed + 1;

      this.setState({ cells, puzzle, hintsUsed });

      this.setCurrentFocus(currentFocus.row, currentFocus.col, true);
    } else {
      alert('All hints used.');
    }
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
      let { key, action, buttonText, visibleStates, type, disable } = button;

      const visibleStatesArray = keys(visibleStates);

      let displayButton = false;
      let disableButton = false;

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

      if(disable) {
        disableButton = disable.some((parameters) => {
          if(this.state[parameters.check] === this.state[parameters.against]) {
            return true;
          }
        });
      }

      if(displayButton) {
        return <GameButton key={key} ref={key} action={this[action]} buttonText={buttonText} type={type} disableButton={disableButton} />
      }
    });

    return (
      <div className="simpledoku-game" onKeyDown={this.onKeyPress}>
        <h1>Simpledoku</h1>
        <form autoComplete="off" noValidate onSubmit={this.onSubmit}>
          <Grid ref="game" { ...this.state } startGame={this.startGame} onKeyPress={this.onKeyPress} setValue={this.setValue} resetFocus={this.resetFocus} moveFocus={this.moveFocus} setCurrentFocus={this.setCurrentFocus} switchHighlightMode={this.switchHighlightMode} getHint={this.getHint} resetPuzzle={this.resetPuzzle} puzzleCheckedState={this.puzzleCheckedState} checkSolution={this.checkSolution} highlightModes={this.highlightModes} keyBoardWASDConstants={this.keyBoardWASDConstants} keyBoardArrowConstants={this.keyBoardArrowConstants} keyBoardOtherConstants={this.keyBoardOtherConstants} inputValues={this.inputValues} />
          <div className="simpledoku-game-buttons">
            { buttons }
          </div>
        </form>
        <HintCounter hintsUsed={this.state.hintsUsed} maxHints={this.state.maxHints} />
      </div>
    );
  }
};

export default Game;
