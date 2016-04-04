'use strict';

import React, { Component } from 'react';

class GameButton extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    const { key, action, buttonText, type, disableButton } = this.props;

    return (
      <input type={type} className="simpledoku-button" key={key} onClick={action.bind(this)} value={buttonText} disabled={disableButton} />
    );
  }
};

export default GameButton;
