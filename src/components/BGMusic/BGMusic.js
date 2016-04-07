import React, { Component } from 'react';

class BGMusic extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  componentDidMount() {
    this.refs.bgMusic.volume = 0.5;
  }

  render() {
    return (
      <audio ref="bgMusic" src={this.props.track} autoPlay loop volume="0.5" />
    );
  }
}

export default BGMusic;
