import React, { Component } from 'react';

const shell = window.require('electron').shell;

class ExternalLink extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.openUrl = this.openUrl.bind(this);
  }

  openUrl(e) {
    e.preventDefault();

    shell.openExternal(this.props.url);
  }

  render() {
    return(
      <a href={this.props.url} target="_blank" onClick={this.openUrl}>{this.props.anchor}</a>
    );
  }
}

export default ExternalLink;
