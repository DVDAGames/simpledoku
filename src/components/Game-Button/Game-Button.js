'use strict';

import React, { Component } from 'react';

class GameButton extends Component {
  constructor(props) {
    super();

    this.props = props;
  }

  render() {
    const { key, action, buttonText } = this.props;

    return (
      <button className="simpledoku-button" key={key} onClick={action.bind(this)}>{buttonText}</button>
    );
  }
};

export default GameButton;
