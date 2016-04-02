'use strict';

import React, { Component } from 'react';

import Cell from '../Cell/Cell';

class Row extends Component {
  constructor(props) {
    super();

    this.props = props;
  }

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
};

export default Row;
