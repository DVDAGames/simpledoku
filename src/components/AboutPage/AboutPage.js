import React, { Component } from 'react';

import BackButton from '../BackButton/BackButton';
import ExternalLink from '../ExternalLink/ExternalLink';

class AboutPage extends Component {
  render() {
    return (
      <article className="simpledoku-page simpledoku-page--about">
        <BackButton history={this.props.history} />
        <h1>About Simpledoku</h1>
        <p>Simpledoku is an exploration of using React and Electron to build a simple desktop game</p>
        <p>It currently has a limited number of puzzles, but future updates should move it towards a much larger number of puzzles.</p>
        <h3>Credits</h3>
          <ul>
            <li><strong>Menu Music</strong>: <ExternalLink url="https://www.youtube.com/watch?v=HNyT5c_awhM&feature=youtu.be" anchor="The Lift" /> by Kevin MacLeod (<ExternalLink url="http://incompetech.com" anchor="incompetech.com" />)(c) 2016 Licensed under a Creative Commons <ExternalLink url="http://creativecommons.org/licenses/by/3.0/" anchor="Attribution (3.0)" /> license.</li>
            <li><strong>In-Game Background Music</strong>: <ExternalLink url="http://dig.ccmixter.org/files/Quarkstar/53319" anchor="Intuition" /> by Quarkstar (c) 2016 Licensed under a Creative Commons <ExternalLink url="http://creativecommons.org/licenses/by-nc/3.0/" anchor="Attribution Noncommercial  (3.0)" /> license. </li>
          </ul>
      </article>
    );
  }
};

export default AboutPage;
