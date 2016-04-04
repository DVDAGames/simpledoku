'use strict';

import React, { Component } from 'react';

class AboutPage extends Component {
  render() {
    return (
      <article className="simpledoku-page simpledoku-page--about">
        <h1>About Simpledoku</h1>
        <p>Simpledoku is an exploration of using React and Electron to build a simple desktop game</p>
        <p>It currently has a limited number of puzzles, but future updates should move it towards a much larger number of puzzles.</p>
      </article>
    );
  }
};

export default AboutPage;
