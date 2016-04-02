'use strict';

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
  }

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
  }

  onChange(e) {
    const { row, col } = this.props;

    this.props.setValue(row, col, e.target.value);
  }

  onFocus(e) {
    const { row, col } = this.props;

    this.props.puzzleCheckedState(false);

    this.props.setCurrentFocus(row, col);
  }

  render() {
    const focus = this.props.currentFocus;

    return (
      <td className="simpledoku-cell">
        <input
          type="number"
          ref={`row-${this.props.row}-col-${this.props.col}-input`}
          value={(parseInt(this.props.val) === 0) ? "" : parseInt(this.props.val, 10)}
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
};

export default Cell;
