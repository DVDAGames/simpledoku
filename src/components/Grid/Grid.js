'use strict';

import React, { Component } from 'react';

import Row from '../Row/Row';

class Grid extends Component {
  constructor(props) {
    super();

    this.props = props;
  }

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
};

export default Grid;
