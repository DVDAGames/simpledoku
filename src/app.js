'use strict';

require('./app.scss');

import React, { Component } from 'react';

import {
  render
} from 'react-dom';

import {
  Router,
  Route,
  Link,
  browserHistory
} from 'react-router';

import Game from './components/Game/Game';
import Generator from './components/Generator/Generator';

class App extends Component {
  render() {
    return (
      <section className="simpledoku-app-container">
        <h1>Simpledoku</h1>
      </section>
    );
  }
}

class Help extends Component {
  constructor() {
    super();

    this.state = {
      testing: true,
      message: 'Game help goes here'
    };
  }

  render() {
    return (
      <div className="help-page">
        { this.state.testing ? <p>{this.state.message}</p> : null }
      </div>
    );
  }
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/game" component={Game} />
    <Route path="/game/help" component={Help} />
    <Route path="/game/generator" component={Generator} />
  </Router>
), document.getElementById('main'));
