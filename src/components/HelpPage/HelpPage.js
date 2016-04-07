import React, { Component } from 'react';

import BackButton from '../BackButton/BackButton';

class HelpPage extends Component {
  render() {
    return(
      <article className="simpledoku-page simpledoku-page--help">
        <BackButton history={this.props.history} />
        <h2>Simpledoku Instructions</h2>
        <ul>
          <li>Use the <strong>arrow keys</strong>, <strong>WASD</strong>, or your <strong>mouse</strong> to move around the puzzle board.</li>
          <li>Use the <strong>space bar</strong> or <strong>right-click</strong> to change the current highlight mode. There are five modes.</li>
          <li>You can use the <strong>Hint</strong> button to have the puzzle reveal one randm number of the solution.</li>
          <li>You only have <strong>7 hints</strong> per puzzle.</li>
        </ul>
      </article>
    );
  }
};

export default HelpPage;
