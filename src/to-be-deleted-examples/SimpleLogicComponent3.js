import React, { Component } from "react";

const NAME = 'SimpleLogicComponent3';

class SimpleLogicComponent3 extends Component {
  constructor(props) {
    super(props);
    this.getTestState = this.getTestState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  state = { test: true };

  getTestState() {
    return this.state.test;
  };

  handleClick() {
    this.setState(
      (state) => ({ test: !state.test })
    );
  };

  render() {
    return (
      <div className='simpleLogicComponent3'>
        <div onClick={this.handleClick}>{`${NAME}`}</div>
      </div>)
    ;
  }
}

export default SimpleLogicComponent3;
