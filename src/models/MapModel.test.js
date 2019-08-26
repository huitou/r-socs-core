/*
	MapModel test.

	Copyright (C) 2019 Riverside Software Engineering Ltd. All rights reserved.

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

// Mount directly MapModel for testing:
describe('MapModel,', () => {
	it('when mounted, has mapped children', () => {
		const wrapper = mount(<div><MapModel hset={rootHset} hprops={{}} map={map} /></div>)
		expect(wrapper.find(SimpleLogic).length).toBe(2);
	});
});

// Mount MapModel through connect for testing:
describe('MapModel used through connectMap', () => {
	it('provides expected props to the target component', async () => {
		const TargetComponent = (props) => (<div />);
		const ConnectedTargetComponent = connectMap(map, 'mapped')(TargetComponent);
		const wrapper = mount(<ConnectedTargetComponent hprops={{}} />);

		expect(wrapper.find(TargetComponent).length).toBe(1);
		expect(wrapper.find('SimpleLogicComponent').at(0).state().test).toBe(true);
		expect(wrapper.find(TargetComponent).props().mapped.simple1.hifu.value).toBe(true);

		wrapper.find(TargetComponent).props().mapped.simple1.hefu.click();
		expect(wrapper.find('SimpleLogicComponent').at(0).state().test).toBe(false);
		wrapper.find(TargetComponent).update();
		expect(wrapper.find(TargetComponent).props().mapped.simple1.hifu.value).toBe(false);
	});
});
