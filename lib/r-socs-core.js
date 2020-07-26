'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = require('prop-types');
var PropTypes__default = _interopDefault(PropTypes);

/*
	Collector - This is a generic class which may be used directly for hoisting child handles or
	used as base class for concrete Collector classes.

	Copyright (C) 2018-2020 Riverside Software Engineering Ltd. All rights reserved.

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
  	Constructor expects a configuration object of the following shape:
  	{ name: string, register: (collector: Collector) => () => any}
  */
  constructor({
    name,
    register
  }) {
    this._name = name; // using the received register function to register itself and obtain the change event handle.

    this._changeEventHandle = register(this);
    this._isChangeEventSwitchOn = true;
    this._childCollectors = {};
    this.getName = this.getName.bind(this);
    this.setChangeEventSwitchOn = this.setChangeEventSwitchOn.bind(this);
    this.setChangeEventSwitchOff = this.setChangeEventSwitchOff.bind(this);
    this.changeEveneHandle = this.changeEveneHandle.bind(this);
    this.handleTree = this.handleTree.bind(this);
    this.valueAndHandleTree = this.valueAndHandleTree.bind(this);
    this.hfuRegister = this.hfuRegister.bind(this);
    this.hfuUnregister = this.hfuUnregister.bind(this);
    this.childCollectorRegister = this.childCollectorRegister.bind(this);
    this.childCollectorUnregister = this.childCollectorUnregister.bind(this);
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
    this._isChangeEventSwitchOn && this._changeEventHandle();
  }

  handleTree() {
    return getHandleNode(this);
  }

  valueAndHandleTree() {
    return getValueAndHandleNode(this);
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
      super(props);
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
      this._collector.setChangeEventSwitchOff();

      return super.render && super.render();
    }

    componentDidMount() {
      super.componentDidMount && super.componentDidMount();

      if (Collector.handleMap && Collector.handleMap.hfu) {
        const hfu = {
          hifu: {},
          hefu: {}
        };
        Collector.handleMap.hfu.hifu && Object.entries(Collector.handleMap.hfu.hifu).reduce((acc, [key, val]) => {
          acc[key] = this[val];
          return acc;
        }, hfu.hifu);
        Collector.handleMap.hfu.hefu && Object.entries(Collector.handleMap.hfu.hefu).reduce((acc, [key, val]) => {
          acc[key] = this[val];
          return acc;
        }, hfu.hefu);

        this._collector.hfuRegister(hfu);
      }

      this._collector.setChangeEventSwitchOn();

      this._collector.changeEveneHandle();
    }

    componentDidUpdate() {
      super.componentDidUpdate && super.componentDidUpdate();

      this._collector.setChangeEventSwitchOn();

      this._collector.changeEveneHandle();
    }

    componentWillUnmount() {
      const {
        unregister
      } = this.props.hset;

      this._collector.hfuUnregister();

      unregister && unregister(this._collector);
      super.componentWillUnmount && super.componentWillUnmount();
    }

  }

  _defineProperty(ExtendedComponent, "propTypes", {
    hset: PropTypes__default.shape({
      name: PropTypes__default.string.isRequired,
      register: PropTypes__default.func.isRequired,
      unregister: PropTypes__default.func
    }).isRequired
  });

  ExtendedComponent.displayName = `${getDisplayName(LogicComponent)}`;

  const HCollector = props => {
    return React__default.createElement(ExtendedComponent, props);
  };

  HCollector.displayName = `hCollect(${getDisplayName(LogicComponent)})`;
  return HCollector;
};

/*
	collector Directory.

	Copyright (C) 2020 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

function getDisplayName$1(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function unitMap(props) {
  return { ...props
  };
}
const connect = (Model, name, propsMap = unitMap) => TargetComponent => {
  class HInjector extends React__default.Component {
    render() {
      const {
        getCollector,
        ...rest
      } = this.props;
      const collector = getCollector();
      return collector ? React__default.createElement(TargetComponent, _extends({}, rest, {
        [collector.getName()]: collector.valueAndHandleTree()
      })) : null;
    }

  }

  HInjector.displayName = `hInject(${getDisplayName$1(Model)}-${getDisplayName$1(TargetComponent)})`;

  class HConnect extends React__default.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "root", {
        collector: undefined,
        ref: React__default.createRef()
      });

      _defineProperty(this, "changeEventHandle", () => {
        this.root.ref.current && this.root.ref.current.forceUpdate();
      });

      _defineProperty(this, "register", collectorInstance => {
        this.root.collector = collectorInstance;
        return this.changeEventHandle;
      });

      _defineProperty(this, "getCollector", () => this.root.collector);
    }

    render() {
      const hset = {
        name,
        register: this.register
      };
      return React__default.createElement(React__default.Fragment, null, React__default.createElement(HInjector, _extends({}, this.props, {
        ref: this.root.ref,
        getCollector: this.getCollector
      })), React__default.createElement(Model, _extends({}, propsMap(this.props), {
        hset: hset
      })));
    }

  }
  HConnect.displayName = `hConnect(${getDisplayName$1(Model)}-${getDisplayName$1(TargetComponent)})`;
  return HConnect;
};

class MapModelComponent extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "mappedNodes", () => {
      const {
        map,
        propsMap,
        hset,
        ...rest
      } = this.props;
      return Object.entries(map).map(([name, Model]) => {
        const props = propsMap && propsMap[name] ? propsMap[name](rest, name) : rest;
        return React__default.createElement(Model, _extends({
          key: name,
          mapKey: name
        }, props, {
          hset: this.hset(name)
        }));
      });
    });
  }

  render() {
    return React__default.createElement(React.Fragment, null, this.mappedNodes());
  }

}

_defineProperty(MapModelComponent, "propTypes", {
  map: PropTypes.objectOf(PropTypes.elementType).isRequired,
  propsMap: PropTypes.objectOf(PropTypes.func)
});

const MapModel = withCollector(Collector)(MapModelComponent);

const connectMap = (modelMap, name, propsMap) => {
  const CompositeModel = props => React__default.createElement(MapModel, _extends({}, props, {
    map: modelMap,
    propsMap: propsMap
  }));

  return connect(CompositeModel, name);
};

exports.Collector = Collector;
exports.connect = connect;
exports.connectMap = connectMap;
exports.withCollector = withCollector;
