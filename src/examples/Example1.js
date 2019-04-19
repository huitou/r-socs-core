import React from "react";
import PropTypes from 'prop-types';

import Collector from '../Collector';
import { withCollector } from '../withCollector';

import LogicComponent from './LogicComponent';

// let counter = 0;
const changeEventHandle = () => {
  // console.log(`Example1 - Change event number ${++counter}`);
  // console.log('rootCollector:', rootCollector);
};

// eslint-disable-next-line
let rootCollector;
const register = (collectorInstance) => {
  rootCollector = collectorInstance;
  return changeEventHandle;
};

const name = 'RootCollector';
const hset = {
  name,
  register,
}

const CollectedLogicComponent = withCollector(Collector)(LogicComponent);

const Example1 = (props) => (
  <div>
    <div>Example 1 - Nested Collected Component - Parent-Child.</div>
    <CollectedLogicComponent hset={hset} level={props.level}/>
  </div>
);

Example1.prototype = {
  level: PropTypes.number, 
};

export default Example1
