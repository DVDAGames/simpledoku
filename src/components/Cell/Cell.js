import React, { Component } from 'react';

import {
  objectHasOwnValue
} from '../../utilities/utils';

class Cell extends Component {
  constructor(props) {
    super();

    this.props = props;

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }

  onKeyPress(e) {
    const otherKeys = this.props.keyBoardOtherConstants;
    const { row, col, highlightMode } = this.props;

    let { key } = e;
    let constants = this.props.keyBoardArrowConstants;

    if(otherKeys.SOLVE.indexOf(key) !== -1) {
      e.preventDefault();

      this.props.checkSolution();
    } else {
      if(key === " ") {
        e.preventDefault();

        this.props.switchHighlightMode(row, col, highlightMode);
      } else if(key === 'Unidentified') {
        key = e.which;

        constants = this.props.keyBoardWASDConstants;
      }

      if(objectHasOwnValue(constants, key)) {
        e.preventDefault();

        this.props.moveFocus(row, col, key, constants);
      } else {
        return true;
      }
    }
  }

  onChange(e) {
    const { row, col, inputValues } = this.props;

    let value;

    if(e.target.value >= inputValues.min && e.target.value <= inputValues.max) {
      value = e.target.value;
    } else {
      value = null;
    }

    this.props.setValue(row, col, value);
  }

  onFocus(e) {
    const { row, col, puzzle } = this.props;

    this.props.puzzleCheckedState(false);

    this.props.setCurrentFocus(row, col);
  }

  onRightClick(e) {
    const { row, col, highlightMode } = this.props;

    e.preventDefault();

    this.props.switchHighlightMode(row, col, highlightMode);
  }

  render() {
    const { row, col, val, highlightMode, puzzle, currentFocus } = this.props;

    const tdClassNames = ['simpledoku-cell'];
    const inputClassNames = ['simpledoku-cell-input'];

    if(parseInt(puzzle[row][col], 10) !== 0) {
      inputClassNames.push('simpledoku-cell-input--default');
    }

    if(currentFocus.row !== null && currentFocus.cell !== null) {
      switch(highlightMode) {
        case 1:
          if(row === currentFocus.row) {
            tdClassNames.push('simpledoku-cell--highlight');
          }

          break;
        case 2:
          if(col === currentFocus.col) {
            tdClassNames.push('simpledoku-cell--highlight');
          }

          break;
        case 3:
          if(row === currentFocus.row || col === currentFocus.col) {
            tdClassNames.push('simpledoku-cell--highlight');
          }

          break;
        case 4:
          const currentRow = currentFocus.row;
          const currentCol = currentFocus.col;

          const section = {};

          if(currentRow < 3) {
            section.row = 0;
          } else if(currentRow < 6) {
            section.row = 1;
          } else {
            section.row = 2;
          }

          if(currentCol < 3) {
            section.col = 0;
          } else if(currentCol < 6) {
            section.col = 1;
          } else {
            section.col = 2;
          }

          if(section.row === 0 && row > -1 && row < 3) {
            if(section.col === 0 && col > -1 && col < 3) {
              tdClassNames.push('simpledoku-cell--highlight');
            } else if(section.col === 1 && col > 2 && col < 6) {
              tdClassNames.push('simpledoku-cell--highlight');
            } else if(section.col === 2 && col > 5 && col < 9) {
              tdClassNames.push('simpledoku-cell--highlight');
            }
          } else if(section.row === 1 && row > 2 && row < 6) {
            if(section.col === 0 && col > -1 && col < 3) {
              tdClassNames.push('simpledoku-cell--highlight');
            } else if(section.col === 1 && col > 2 && col < 6) {
              tdClassNames.push('simpledoku-cell--highlight');
            } else if(section.col === 2 && col > 5 && col < 9) {
              tdClassNames.push('simpledoku-cell--highlight');
            }
          } else if(section.row === 2 && row > 5 && row < 9) {
            if(section.col === 0 && col > -1 && col < 3) {
              tdClassNames.push('simpledoku-cell--highlight');
            } else if(section.col === 1 && col > 2 && col < 6) {
              tdClassNames.push('simpledoku-cell--highlight');
            } else if(section.col === 2 && col > 5 && col < 9) {
              tdClassNames.push('simpledoku-cell--highlight');
            }
          }

          break;
        case 0:
        default:
          tdClassNames.push('simpledoku-cell--no-highlight');
      }
    }

    return (
      <td className={tdClassNames.join(' ')}>
        <input
          type="number"
          ref={`row-${row}-col-${col}-input`}
          value={(parseInt(val) === 0) ? "" : parseInt(val, 10)}
          readOnly={(parseInt(puzzle[row][col], 10) === 0) ? false : true}
          min="1"
          max="9"
          className={inputClassNames.join(' ')}
          tabIndex={(val !== 0) ? -1 : 0}
          onKeyDown={this.onKeyPress}
          onFocus={this.onFocus}
          onChange={this.onChange}
          onContextMenu={this.onRightClick}
        />
      </td>
    );
  }
};

export default Cell;
