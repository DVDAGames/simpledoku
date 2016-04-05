
import React, { Component } from 'react';

class HintCounter extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <div className="simpledoku-hint-counter">
        <label>Hints</label>: { this.props.maxHints - this.props.hintsUsed }
      </div>
    );
  }
}

export default HintCounter;
