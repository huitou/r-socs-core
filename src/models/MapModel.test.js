import React, { Component } from "react";
import { mount } from 'enzyme';

import Collector, { withCollector } from '../collector';
import { connectMap } from '../connect';
import { MapModel } from './MapModel';

const waitFor = (n) => new Promise((resolve, _) => {
    setTimeout(() => resolve(n), n);
});

// Define simple logic for testing:
class SimpleLogicComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { test: true };
        this.getTestState = this.getTestState.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    getTestState() { return this.state.test; };
    handleClick() {
        console.log('handleClick invoked');
        this.setState((state) => ({ test: !state.test }));
    };
    render() { return null; }
}
class SimpleCollector extends Collector {
    static handleMap = {
        hfu: {
            hifu: { value: 'getTestState' },
            hefu: { click: 'handleClick' },
        },
    };
}
const SimpleLogic = withCollector(SimpleCollector)(SimpleLogicComponent);

// Define root collector and root hset for testing:
const changeEventHandle = () => {};
let rootCollector;
const register = (collectorInstance) => {
    rootCollector = collectorInstance;
    return changeEventHandle;
};
const name = 'RootCollector';
const rootHset = { name, register };

// Define a map of simple logic for testing:
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
        console.log(wrapper.find(TargetComponent).props().mapped.simple1);

        expect(wrapper.find(TargetComponent).props().mapped.simple1.hifu.value).toBe(true);
        wrapper.find(TargetComponent).props().mapped.simple1.hefu.click();
        // await waitFor(1000);

        expect(wrapper.find('SimpleLogicComponent').at(0).state().test).toBe(false);
        wrapper.find(TargetComponent).update();
        console.log(wrapper.find(TargetComponent).props().mapped.simple1);
        expect(wrapper.find(TargetComponent).props().mapped.simple1.hifu.value).toBe(false);
    });
});
