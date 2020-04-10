/*
	MapModel test.

	Copyright (C) 2019-2020 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
import React from "react";
import { mount } from 'enzyme';

import { connectMap } from '../connect';
import { MapModel } from './MapModel';

import SimpleLogic from '../test-helpers/SimpleLogic';

// Define a root collector and a root hset for testing:
const changeEventHandle = () => {};
let rootCollector;
const register = (collectorInstance) => {
	rootCollector = collectorInstance;
	return changeEventHandle;
};
const name = 'RootCollector';
const rootHset = { name, register };

// Define a map of SimpleLogic for testing:
const map = { simple1: SimpleLogic, simple2: SimpleLogic };
const propsMap = { simple1: () => ({}), simple2: (props, name) => ({ ...props, initial: props.initials[name] }) }
const ownProps = { initials: { simple1: 0, simple2: 1 } };

// Mount directly MapModel for testing:
describe('MapModel,', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<div><MapModel hset={rootHset} map={map} {...ownProps} /></div>);
	});

	it('when mounted without propsMap, has mapped children', () => {
		expect(wrapper.find('hCollect(SimpleLogicComponent)').length).toBe(2);
		expect(wrapper.find('SimpleLogicComponent').length).toBe(2);
	});

	describe('when mounted without propsMap,', () => {
		it('mapped model 1 have proper props', () => {
			const { hset, ...rest } = wrapper.find('hCollect(SimpleLogicComponent)').at(0).props();
			expect(rest).toEqual({ ...ownProps, mapKey: 'simple1' });
		});
		it('mapped model 2 have proper props', () => {
			const { hset, ...rest } = wrapper.find('hCollect(SimpleLogicComponent)').at(1).props();
			expect(rest).toEqual({ ...ownProps, mapKey: 'simple2' });
		});

		it('mapped model component 1 have proper props', () => {
			const { hset, ...rest } = wrapper.find('SimpleLogicComponent').at(0).props();
			expect(rest).toEqual({ ...ownProps, mapKey: 'simple1' });
		});
		it('mapped model component 2 have proper props', () => {
			const { hset, ...rest } = wrapper.find('SimpleLogicComponent').at(1).props();
			expect(rest).toEqual({ ...ownProps, mapKey: 'simple2' });
		});
	});
});

describe('MapModel,', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<div><MapModel hset={rootHset} map={map} propsMap={propsMap} {...ownProps} /></div>);
	});

	it('when mounted with propsMap, has mapped children', () => {
		expect(wrapper.find('hCollect(SimpleLogicComponent)').length).toBe(2);
		expect(wrapper.find('SimpleLogicComponent').length).toBe(2);
	});

	describe('when mounted with propsMap,', () => {
		it('mapped model 1 have proper props', () => {
			const { hset, ...rest } = wrapper.find('hCollect(SimpleLogicComponent)').at(0).props();
			expect(rest).toEqual({ mapKey: 'simple1' });
		});
		it('mapped model 2 have proper props', () => {
			const { hset, ...rest } = wrapper.find('hCollect(SimpleLogicComponent)').at(1).props();
			expect(rest).toEqual({ ...ownProps, mapKey: 'simple2', initial: 1 });
		});

		it('mapped model component 1 have proper props', () => {
			const { hset, ...rest } = wrapper.find('SimpleLogicComponent').at(0).props();
			expect(rest).toEqual({ mapKey: 'simple1' });
		});
		it('mapped model component 2 have proper props', () => {
			const { hset, ...rest } = wrapper.find('SimpleLogicComponent').at(1).props();
			expect(rest).toEqual({ ...ownProps, mapKey: 'simple2', initial: 1 });
		});
	});
});


// Mount MapModel through connect for testing:
describe('MapModel used through connectMap', () => {
	describe('provides expected injected props to the target component', () => {
		let wrapper;
		const TargetComponent = () => (<div />);

		beforeEach(() => {
			const ConnectedTargetComponent = connectMap(map, 'mapped')(TargetComponent);
			wrapper = mount(<ConnectedTargetComponent />);
		});

		it('from the 1st model', async () => {
			expect(wrapper.find(TargetComponent).props().mapped.simple1.hifu.value).toBe(true);

			wrapper.find(TargetComponent).props().mapped.simple1.hefu.click();
			wrapper.find(TargetComponent).update();
			expect(wrapper.find(TargetComponent).props().mapped.simple1.hifu.value).toBe(false);
		});

		it('from the 2nd model', async () => {
			expect(wrapper.find(TargetComponent).props().mapped.simple2.hifu.value).toBe(true);

			wrapper.find(TargetComponent).props().mapped.simple2.hefu.click();
			wrapper.find(TargetComponent).update();
			expect(wrapper.find(TargetComponent).props().mapped.simple2.hifu.value).toBe(false);
		});
	});

	it('provides expected own props to the target component', () => {
		const TargetComponent = () => (<div />);
		const ConnectedTargetComponent = connectMap(map, 'mapped')(TargetComponent);
		const wrapper = mount(<ConnectedTargetComponent {...ownProps} />);

		const { mapped, ...rest } = wrapper.find(TargetComponent).props();
		expect(rest).toEqual(ownProps);
	});

	it('provides expected own props to the target component without propsMap effect', () => {
		const TargetComponent = () => (<div />);
		const ConnectedTargetComponent = connectMap(map, 'mapped', propsMap)(TargetComponent);
		const wrapper = mount(<ConnectedTargetComponent {...ownProps} />);

		const { mapped, ...rest } = wrapper.find(TargetComponent).props();
		expect(rest).toEqual(ownProps);
	});
});
