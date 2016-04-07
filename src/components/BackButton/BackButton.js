import React, { Component } from 'react';

class BackButton extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <a href="#" className="simpledoku-back-button" onClick={this.props.history.goBack}>Back</a>
    );
  }
}

export default BackButton;
