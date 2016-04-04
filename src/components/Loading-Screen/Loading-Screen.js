'use strict';

import React, { Component } from 'react';

class LoadingScreen extends Component {
  componentDidMount() {
    setTimeout(
      function() {
        this.props.history.push('/game/menu');
      }.bind(this),
      5000
    );
  }

  render() {
    return (
      <section className="simpledoku-loading">
        <h1>Simpledoku</h1>
      </section>
    );
  }
};

export default LoadingScreen;
