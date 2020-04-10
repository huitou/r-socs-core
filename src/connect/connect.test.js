/*
	connect test.

	Copyright (C) 2018-2020 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
import React from "react";
import { mount } from "enzyme";

import SimpleLogic from '../test-helpers/SimpleLogic';
import { connect } from './connect';

const NAME = 'Test';
const TargetComponent = () => (<div />);
const ownProps = { whatever: {} };

describe("connect function", () => {
	describe("when called with a logic model class and a name parameters", () => {
		it("returns an HOC", () => {
			const wrapperFunction = connect(SimpleLogic, NAME);
			expect(typeof wrapperFunction).toBe('function');
		});
	});

	describe("when the returned HOC is called with a target component", () => {
		it("returns a component", () => {
			const ReturnedComponent = connect(SimpleLogic, NAME)(TargetComponent);
			expect(typeof ReturnedComponent).toBe('function');
		});
	});

	describe("when the returned component is mounted with any props", () => {
		let ReturnedComponent, enzymeWrapper;
		beforeEach(() => {
			ReturnedComponent = connect(SimpleLogic, NAME)(TargetComponent);
			enzymeWrapper = mount(<ReturnedComponent {...ownProps} />);
		});
		afterEach(() => {
			jest.clearAllMocks();
		});

		it("the target component receives both injected props and own props.", () => {
			expect(enzymeWrapper.find('TargetComponent').props()[NAME].hefu.click).toBeDefined();
			expect(enzymeWrapper.find('TargetComponent').props()[NAME].hifu).toEqual({ value: true });
			const { Test, ...rest } = enzymeWrapper.find('TargetComponent').props();
			expect(rest).toEqual(ownProps);
		});

		it("the logic model receives own props.", () => {
			const { hset, ...rest } = enzymeWrapper.find(SimpleLogic).props();
			expect(rest).toEqual(ownProps);
		});

		it("the props injected into target component are functioning as expected.", () => {
			expect(enzymeWrapper.find('TargetComponent').props()[NAME].hifu).toEqual({ value: true });

			enzymeWrapper.find('TargetComponent').props()[NAME].hefu.click();
			enzymeWrapper.find('TargetComponent').update();
			expect(enzymeWrapper.find('TargetComponent').props()[NAME].hifu).toEqual({ value: false });

			enzymeWrapper.find('TargetComponent').props()[NAME].hefu.click();
			enzymeWrapper.find('TargetComponent').update();
			expect(enzymeWrapper.find('TargetComponent').props()[NAME].hifu).toEqual({ value: true });
		});

		it("renders the logic model and component, the target component with some wrappers", () => {
			expect(enzymeWrapper.find('hCollect(SimpleLogicComponent)').length).toBe(1);	// Logic model (collected logic component):
			expect(enzymeWrapper.find('SimpleLogicComponent').length).toBe(1);				// Logic component:
			
			expect(enzymeWrapper.find('hConnect(hCollect(SimpleLogicComponent)-TargetComponent)').length).toBe(1);
			expect(enzymeWrapper.find('hInject(hCollect(SimpleLogicComponent)-TargetComponent)').length).toBe(1);
			expect(enzymeWrapper.find('TargetComponent').length).toBe(1);
		});
	});
});
