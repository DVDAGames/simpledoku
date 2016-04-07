'use strict';

import React, { Component } from 'react';

import { Link } from 'react-router';

import BGMusic from '../BGMusic/BGMusic';

class MenuScreen extends Component {
  render() {
    return (
      <article className="simpledoku-page simpledoku-page--menu">
        <h1>Simpledoku</h1>
        <nav className="simpledoku-menu">
          <ul>
            <li>
              <Link to="/game/play">Play Game</Link>
            </li>
            <li>
              <Link to="/game/help">Instructions</Link>
            </li>
            <li>
              <Link to="/game/about">About</Link>
            </li>
          </ul>
        </nav>
        <BGMusic track="http://localhost:3333/assets/Incompetech_-_The_Lift.mp3" />
      </article>
    );
  }
};

export default MenuScreen;
