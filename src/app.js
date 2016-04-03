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

import LoadingScreen from './components/Loading-Screen/Loading-Screen';
import HelpPage from './components/Help-Page/Help-Page';
import Game from './components/Game/Game';
import Generator from './components/Generator/Generator';

render((
  <Router history={browserHistory}>
    <Route path="/" component={LoadingScreen} />
    <Route path="/game" component={Game} />
    <Route path="/game/help" component={HelpPage} />
    <Route path="/game/generator" component={Generator} />
  </Router>
), document.getElementById('main'));
