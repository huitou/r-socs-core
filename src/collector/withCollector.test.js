/*
    Testing for Collector Attacher.

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React, { Component } from "react";
import PropTypes from 'prop-types';
import { shallow, mount } from "enzyme";

import Collector from "./Collector";
import { withCollector } from "./withCollector";

let rootCollector;
const NAME = 'TestCollector';
const parentChangeEventHandleMock = jest.fn();
const parentRegisterMock = jest.fn((collectorInstance) => {
    rootCollector = collectorInstance;
    return parentChangeEventHandleMock;
});
const rootHset = {
    name: NAME,
    register: parentRegisterMock,
}

const LEVEL = 1;
class LogicComponent extends Component {
    static propTypes = {
        level: PropTypes.number,
    };
    static defaultProps = {
        level: 0,
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
    };

    render() {
        const { level } = this.props;
        // console.log('orginal rende() at level ', level);
        const Nested = withCollector(Collector)(LogicComponent);

        return (
            <div className={ level ? `test-level${level}` : 'test'} onClick={this.handleClick}>
                { level ? <Nested hset={this.hset(`Nested-${NAME}`)} level={ level - 1 } /> : null }
            </div>
        );
    }
}

describe("withCollector function", () => {
    describe("when called with a Collector class parameter", () => {
        it("returns a wrapper function", () => {
            const wrapperFunction = withCollector(Collector);
            expect(typeof wrapperFunction).toBe('function');
        });
    });

    describe("when the returned wrapper function is called", () => {
        it("returns a function component", () => {
            const FunctionComponent = withCollector(Collector)(LogicComponent);
            expect(typeof FunctionComponent).toBe('function');
        });
    });

    describe("when the function component is mounted with proper props", () => {
        let FunctionComponent, enzymeWrapper, enzymeWrapper_ExtendedComponent;
        beforeEach(() => {
            rootCollector = undefined;
            FunctionComponent = withCollector(Collector)(LogicComponent);
            enzymeWrapper = mount(<FunctionComponent hset={rootHset} level={LEVEL} />);
            enzymeWrapper_ExtendedComponent = enzymeWrapper.find('LogicComponent');
        });
        afterEach(() => {
            jest.clearAllMocks();
        });

        it("render an extended component with the wrapped model component content", () => {
            expect(enzymeWrapper_ExtendedComponent.length).toBe(LEVEL + 1);
            expect(enzymeWrapper.find('.test').length).toBe(1);
        });

        it("render an extended component passing collector prop", () => {
            expect(enzymeWrapper_ExtendedComponent.length).toBe(LEVEL + 1);
            expect(enzymeWrapper_ExtendedComponent.first().prop('collector')).not.toBeDefined();
            expect(enzymeWrapper_ExtendedComponent.first().prop('hset')).toBeDefined();
        });

        it("parentRegister is called", () => {
            expect(parentRegisterMock).toHaveBeenCalled();
        });

        it("the collector's _changeEventHandle is registered", () => {
            expect(rootCollector._changeEventHandle).toBeDefined();
        });

        it("the wrapped model component's hfu is registered in collector", () => {
            expect(rootCollector.hfu).toBeDefined();
        });

        it("the parent's change event handle has benn called once", () => {
            expect(parentChangeEventHandleMock).toHaveBeenCalledTimes(1);
        });

        it("the parent's change event handle has benn called once when state changes", () => {
            expect(parentChangeEventHandleMock).toHaveBeenCalledTimes(1);
            enzymeWrapper.find('.test').simulate('click');
            expect(parentChangeEventHandleMock).toHaveBeenCalledTimes(2);
        });
    });

    describe("when the function component is unmounted", () => {
        it("collector's hfu is unregistered", () => {
            rootCollector = undefined;
            const FunctionComponent = withCollector(Collector)(LogicComponent);
            const enzymeWrapper = mount(<FunctionComponent hset={rootHset} level={LEVEL} />);
            enzymeWrapper.unmount();

            expect(rootCollector.hfu).not.toBeDefined();
        });
    });
});