/*
	connect test.

	Copyright (C) 2018-2019 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
import React from "react";
import { mount } from "enzyme";

import SimpleLogic from '../test-helpers/SimpleLogic';
import { connect } from './connect';

const NAME = 'Test';
const TargetComponent = () => (<div />);

describe("connect function", () => {
	describe("when called with a LModel class and a name parameters", () => {
		it("returns a wrapper function", () => {
			const wrapperFunction = connect(SimpleLogic, NAME);
			expect(typeof wrapperFunction).toBe('function');
		});
	});

	describe("when the returned wrapper function is called", () => {
		it("returns a component", () => {
			const ReturnedComponent = connect(SimpleLogic, NAME)(TargetComponent);
			expect(typeof ReturnedComponent).toBe('function');
		});
	});

	describe("when the returned component is mounted with proper props", () => {
		let ReturnedComponent, enzymeWrapper;
		beforeEach(() => {
			ReturnedComponent = connect(SimpleLogic, NAME)(TargetComponent);
			enzymeWrapper = mount(<ReturnedComponent />);
		});
		afterEach(() => {
			jest.clearAllMocks();
		});

		it("render the logic component and a Wrapper component with the wrapped target component", () => {
			expect(enzymeWrapper.find('hInject(TargetComponent)').length).toBe(1);
			expect(enzymeWrapper.find('TargetComponent').length).toBe(1);
		});

		it("the visual component receives injected props.", () => {
			expect(enzymeWrapper.find('TargetComponent').props()[NAME].hefu.click).toBeDefined();
			expect(enzymeWrapper.find('TargetComponent').props()[NAME].hifu).toEqual({ value: true });
		});

		it("the props injected into visual component are functioning as expected.", () => {
			expect(enzymeWrapper.find('TargetComponent').props()[NAME].hifu).toEqual({ value: true });

			enzymeWrapper.find('TargetComponent').props()[NAME].hefu.click();
			enzymeWrapper.find('TargetComponent').update();
			expect(enzymeWrapper.find('TargetComponent').props()[NAME].hifu).toEqual({ value: false });

			enzymeWrapper.find('TargetComponent').props()[NAME].hefu.click();
			enzymeWrapper.find('TargetComponent').update();
			expect(enzymeWrapper.find('TargetComponent').props()[NAME].hifu).toEqual({ value: true });
		});
	});
});
