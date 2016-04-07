'use strict';

import React, { Component } from 'react';

const audioSrc = 'http://localhost:3333/assets/Incompetech_-_The_Lift.mp3';

class LoadingScreen extends Component {
  componentDidMount() {
    const audio = document.createElement('audio');

    //preload menu BG music
    audio.oncanplaythrough = () => {
      this.props.history.push('/game/menu');
    };

    audio.src = audioSrc;
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
