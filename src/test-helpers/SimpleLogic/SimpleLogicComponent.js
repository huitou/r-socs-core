/*
	Test helper component.

	Copyright (C) 2018-2019 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
import React, { Component } from 'react';

class SimpleLogicComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { test: true };
		this.getTestState = this.getTestState.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	getTestState() { return this.state.test; };
	handleClick() {
		this.setState((state) => ({ test: !state.test }));
	};
	render() { return null; }
}

export default SimpleLogicComponent;
