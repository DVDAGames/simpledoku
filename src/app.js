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
    <Route path="/game" component={Game}>
      <Route path="help" component={Help} />
    </Route>
  </Router>
), document.getElementById('main'));
