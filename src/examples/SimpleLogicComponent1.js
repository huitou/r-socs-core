import React, { Component } from "react";

const NAME = 'SimpleLogicComponent1';

class SimpleLogicComponent1 extends Component {
  state = { test: true };

  handleClick = () => {
    this.setState(
      (state) => ({ test: !state.test })
    );
  };

  render() {
    return (
      <div className='simpleLogicComponent1'>
        <div onClick={this.handleClick}>{`${NAME}`}</div>
      </div>)
    ;
  }
}

export default SimpleLogicComponent1;
