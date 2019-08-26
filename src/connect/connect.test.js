/*
	connect test.

	Copyright (C) 2018-2019 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { mount } from "enzyme";

import SimpleLogic from '../test-helpers/SimpleLogic';
import { connect } from './connect';

const NAME = 'Test';

class VisualComponent extends Component {
	static propTypes = {
		[NAME]: PropTypes.shape({
			hifu: PropTypes.shape({
				value: PropTypes.bool.isRequired,
			}).isRequired,
			hefu: PropTypes.shape({
				click: PropTypes.func.isRequired,
			}).isRequired,
		})
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	state = { test: true };

	handleClick() {
		this.setState(
			(state) => ({ test: !state.test })
		);
		this.props[NAME].hefu.click();
	};

	render() {
		return (
			<div className='test' onClick={this.handleClick}>
				{'' + this.props[NAME].hifu.value}
			</div>
		);
	}
}

describe("connect function", () => {
	describe("when called with a LModel class and a name parameters", () => {
		it("returns a wrapper function", () => {
			const wrapperFunction = connect(SimpleLogic, NAME);
			expect(typeof wrapperFunction).toBe('function');
		});
	});

	describe("when the returned wrapper function is called", () => {
		it("returns a function component", () => {
			const FunctionComponent = connect(SimpleLogic, NAME)(VisualComponent);
			expect(typeof FunctionComponent).toBe('function');
		});
	});

	describe("when the function component is mounted with proper props", () => {
		let FunctionComponent, enzymeWrapper;
		beforeEach(() => {
			FunctionComponent = connect(SimpleLogic, NAME)(VisualComponent);
			enzymeWrapper = mount(<FunctionComponent />);
		});
		afterEach(() => {
			jest.clearAllMocks();
		});

		it("render the logic component and a Wrapper component with the wrapped visual component", () => {
			expect(enzymeWrapper.find('hInject(VisualComponent)').length).toBe(1);
			expect(enzymeWrapper.find('VisualComponent').length).toBe(1);
		});

		it("the visual component receives injected props.", () => {
			expect(enzymeWrapper.find('VisualComponent').props()[NAME].hefu.click).toBeDefined();
			expect(enzymeWrapper.find('VisualComponent').props()[NAME].hifu).toEqual({ value: true });
		});

		it("the visual component invokes an injected prop and receives new values on another.", () => {
			expect(enzymeWrapper.find('.test').text()).toBe('true');
			enzymeWrapper.find('.test').simulate('click');
			expect(enzymeWrapper.find('.test').text()).toBe('false');
		});
	});
});