/*
	Collector - This is a generic class which may be used directly for hoisting child handles or
	used as base class for concrete Collector classes.

	Copyright (C) 2018-2020 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
const getHandleNode = (inputNode) => {
	const outputNode = { hifu: {}, hefu: {} };
	inputNode.hfu && inputNode.hfu.hifu && Object
		.entries(inputNode.hfu.hifu)
		.reduce((acc, cur) => { acc[cur[0]] = cur[1]; return acc; }, outputNode.hifu);
	inputNode.hfu && inputNode.hfu.hefu && Object
		.entries(inputNode.hfu.hefu)
		.reduce((acc, cur) => { acc[cur[0]] = cur[1]; return acc; }, outputNode.hefu);
	inputNode._childCollectors && Object
		.entries(inputNode._childCollectors)
		.reduce((acc, cur) => { acc[cur[0]] = getHandleNode(cur[1]); return acc; }, outputNode);
	return outputNode;
}

const getValueAndHandleNode = (inputNode) => {
	const outputNode = { hifu: {}, hefu: {} };
	inputNode.hfu && inputNode.hfu.hifu && Object
		.entries(inputNode.hfu.hifu)
		.reduce((acc, cur) => { acc[cur[0]] = cur[1](); return acc; }, outputNode.hifu);
	inputNode.hfu && inputNode.hfu.hefu && Object
		.entries(inputNode.hfu.hefu)
		.reduce((acc, cur) => { acc[cur[0]] = cur[1]; return acc; }, outputNode.hefu);
	inputNode._childCollectors && Object
		.entries(inputNode._childCollectors)
		.reduce((acc, cur) => { acc[cur[0]] = getValueAndHandleNode(cur[1]); return acc; }, outputNode);
	return outputNode;
}

class Collector {
	/*
		Constructor expects a configuration object of the following shape:
		{ register: (Collector) => () => any, name: string }
	*/
	constructor({ name, register }) {
		this._name = name;
		// using the received register function to register itself and obtain the change event handle.
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

	getName() { return this._name; }
	setChangeEventSwitchOn() { this._isChangeEventSwitchOn = true; }
	setChangeEventSwitchOff() { this._isChangeEventSwitchOn = false; }

	changeEveneHandle() { this._isChangeEventSwitchOn && this._changeEventHandle() }
	handleTree() { return getHandleNode(this); }
	valueAndHandleTree() { return getValueAndHandleNode(this); }

	hfuRegister(hfu) { this.hfu = hfu; };
	hfuUnregister() { this.hfu = undefined; };

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
		};
		return this.changeEveneHandle;
	};
	childCollectorUnregister(childCollector) {
		this._childCollectors[childCollector.getName()] = undefined;
		return childCollector;
	};
}

/*
  Mandatory declaration, overridable.
*/
Collector.handleMap = {
  hfu: {
	hifu: { /* getXxx: 'getXxx', xxx: 'getXxx' */ },
	hefu: { /* setAaa: 'setBbb' */ },
  },
};

export default Collector;
