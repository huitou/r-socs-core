'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));

/*
  This is a generic Collector class which may be
  used directly for hoisting child handles or
  used as base class for concrete Collector classes.

  Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.
  Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
const getHandleNode = inputNode => {
  const outputNode = {
    hifu: {},
    hefu: {}
  };
  inputNode.hfu && inputNode.hfu.hifu && Object.entries(inputNode.hfu.hifu).reduce((acc, cur) => {
    acc[cur[0]] = cur[1];
    return acc;
  }, outputNode.hifu);
  inputNode.hfu && inputNode.hfu.hefu && Object.entries(inputNode.hfu.hefu).reduce((acc, cur) => {
    acc[cur[0]] = cur[1];
    return acc;
  }, outputNode.hefu);
  inputNode._childCollectors && Object.entries(inputNode._childCollectors).reduce((acc, cur) => {
    acc[cur[0]] = getHandleNode(cur[1]);
    return acc;
  }, outputNode);
  return outputNode;
};

const getValueAndHandleNode = inputNode => {
  const outputNode = {
    hifu: {},
    hefu: {}
  };
  inputNode.hfu && inputNode.hfu.hifu && Object.entries(inputNode.hfu.hifu).reduce((acc, cur) => {
    acc[cur[0]] = cur[1]();
    return acc;
  }, outputNode.hifu);
  inputNode.hfu && inputNode.hfu.hefu && Object.entries(inputNode.hfu.hefu).reduce((acc, cur) => {
    acc[cur[0]] = cur[1];
    return acc;
  }, outputNode.hefu);
  inputNode._childCollectors && Object.entries(inputNode._childCollectors).reduce((acc, cur) => {
    acc[cur[0]] = getValueAndHandleNode(cur[1]);
    return acc;
  }, outputNode);
  return outputNode;
};

class Collector {
  /*
    Mandatory declaration, overridable.
  */
  // static handleMap = {
  //   hfu: {
  //     hifu: { /* getXxx: 'getXxx', xxx: 'getXxx' */ },
  //     hefu: { /* setAaa: 'setBbb' */ },
  //   },
  // };

  /*
    Constructor expects a configuration object of the following shape:
      { register: (Collector) => () => any, name: string }
  */
  constructor({
    name,
    register
  }) {
    this._name = name;
    this._changeEventHandle = register(this);
    this._isChangeEventSwitchOn = true;
    this._childCollectors = {};
    this.getName = this.getName.bind(this);
    this.setChangeEventSwitchOn = this.setChangeEventSwitchOn.bind(this);
    this.setChangeEventSwitchOff = this.setChangeEventSwitchOff.bind(this);
    this.changeEveneHandle = this.changeEveneHandle.bind(this);
    this.hfuRegister = this.hfuRegister.bind(this);
    this.hfuUnregister = this.hfuUnregister.bind(this);
    this.childCollectorRegister = this.childCollectorRegister.bind(this);
    this.childCollectorUnregister = this.childCollectorUnregister.bind(this);
    this.handleTree = this.handleTree.bind(this);
    this.valueAndHandleTree = this.valueAndHandleTree.bind(this);
    this.counter = 0;
  }

  getName() {
    return this._name;
  }

  setChangeEventSwitchOn() {
    this._isChangeEventSwitchOn = true;
  }

  setChangeEventSwitchOff() {
    this._isChangeEventSwitchOn = false;
  }

  changeEveneHandle() {
    if (this._isChangeEventSwitchOn) {
      this._changeEventHandle();
    }
  }

  hfuRegister(hfu) {
    this.hfu = hfu;
  }

  hfuUnregister() {
    this.hfu = undefined;
  }

  childCollectorRegister(childCollector) {
    if (this._childCollectors[childCollector.getName()]) {
      if (this.counter === 0) {
        this.counter++;
        setTimeout(() => this.childCollectorRegister(childCollector), 0);
      } else {
        // eslint-disable-next-line
        throw 'Name of child collector is NOT unique.';
      }
    } else {
      this._childCollectors[childCollector.getName()] = childCollector;
      this.counter = 0;
    }
    return this.changeEveneHandle;
  }

  childCollectorUnregister(childCollector) {
    this._childCollectors[childCollector.getName()] = undefined;
    return childCollector;
  }

  handleTree() {
    return getHandleNode(this);
  }

  valueAndHandleTree() {
    return getValueAndHandleNode(this);
  }

}
/*
  Mandatory declaration, overridable.
*/


Collector.handleMap = {
  hfu: {
    hifu: {
      /* getXxx: 'getXxx', xxx: 'getXxx' */
    },
    hefu: {
      /* setAaa: 'setBbb' */
    }
  }
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withCollector = Collector => LogicComponent => {
  class ExtendedComponent extends LogicComponent {
    constructor(props) {
      super(props); // console.log('extended constructor at level ', this.props.level);

      this._collector = new Collector(props.hset);
      this.hset = this.hset.bind(this);
    }

    hset(name) {
      return {
        name,
        register: this._collector.childCollectorRegister,
        unregister: this._collector.childCollectorUnregister
      };
    }

    render() {
      // console.log('extended rende() at level ', this.props.level);
      this._collector.setChangeEventSwitchOff();

      return super.render && super.render();
    }

    componentDidMount() {
      // console.log('extended componentDidMount at level ', this.props.level);
      super.componentDidMount && super.componentDidMount();

      if (Collector.handleMap && Collector.handleMap.hfu) {
        const hfu = {
          hifu: {},
          hefu: {}
        };
        Collector.handleMap.hfu.hifu && Object.entries(Collector.handleMap.hfu.hifu).reduce((acc, cur) => {
          acc[cur[0]] = this[cur[1]];
          return acc;
        }, hfu.hifu);
        Collector.handleMap.hfu.hefu && Object.entries(Collector.handleMap.hfu.hefu).reduce((acc, cur) => {
          acc[cur[0]] = this[cur[1]];
          return acc;
        }, hfu.hefu);

        this._collector.hfuRegister(hfu);
      }

      this._collector.setChangeEventSwitchOn();

      this._collector.changeEveneHandle();
    }

    componentDidUpdate() {
      // console.log('extended componentDidUpdate at level ', this.props.level);
      super.componentDidUpdate && super.componentDidUpdate();

      this._collector.setChangeEventSwitchOn();

      this._collector.changeEveneHandle();
    }

    componentWillUnmount() {
      const {
        unregister
      } = this.props.hset; // console.log('extended componentWillUnmount at level ', this.props.level);

      this._collector.hfuUnregister();

      unregister && unregister(this._collector);
      super.componentWillUnmount && super.componentWillUnmount();
    }

  }

  _defineProperty(ExtendedComponent, "propTypes", {
    hset: PropTypes.shape({
      name: PropTypes.string.isRequired,
      register: PropTypes.func.isRequired,
      unregister: PropTypes.func
    }).isRequired
  });

  ExtendedComponent.propTypes = {
    hset: PropTypes.shape({
      name: PropTypes.string.isRequired,
      register: PropTypes.func.isRequired,
      unregister: PropTypes.func
    }).isRequired
  };
  ExtendedComponent.displayName = `${getDisplayName(LogicComponent)}`;

  const HCollector = props => {
    return React.createElement(ExtendedComponent, props);
  };

  HCollector.displayName = `hCollect(${getDisplayName(LogicComponent)})`;
  return HCollector;
};

function getDisplayName$1(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const connect = (ModelComponent, name) => TargetComponent => {
  class HInjector extends React.Component {
    render() {
      const {
        getCollector,
        ...rest
      } = this.props;
      const collector = getCollector();
      return collector ? React.createElement(TargetComponent, _extends({}, rest, {
        [name]: collector.valueAndHandleTree()
      })) : null;
    }

  }

  HInjector.displayName = `hInject(${getDisplayName$1(TargetComponent)})`;

  const HConnect = ({
    hprops,
    ...rest
  }) => {
    const root = {
      collector: undefined,
      ref: React.createRef()
    };

    const changeEventHandle = () => {
      root.ref.current && root.ref.current.forceUpdate();
    };

    const register = collectorInstance => {
      root.collector = collectorInstance;
      return changeEventHandle;
    };

    const hset = {
      name,
      register
    };

    const getCollector = () => root.collector;

    return React.createElement(React.Fragment, null, React.createElement(HInjector, _extends({
      hprops: hprops
    }, rest, {
      ref: root.ref,
      getCollector: getCollector
    })), React.createElement(ModelComponent, _extends({}, hprops, {
      hset: hset
    })));
  };

  HConnect.displayName = `hConnect(${getDisplayName$1(TargetComponent)})`;
  return HConnect;
};

exports.Collector = Collector;
exports.connect = connect;
exports.withCollector = withCollector;
