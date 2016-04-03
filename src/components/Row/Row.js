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
      return <Cell key={`row-${this.props.row}-col-${col}`} ref={`row-${this.props.row}-col-${col}`} col={col} val={val} { ...this.props} />
    });

    return (
      <tr className="simpledoku-row">
        { cells }
      </tr>
    );
  }
};

export default Row;
