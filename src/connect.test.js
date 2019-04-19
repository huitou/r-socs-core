/*
    Testing for Connector.

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React, { Component } from "react";
import PropTypes from 'prop-types';
import { shallow, mount } from "enzyme";

import { CollectedSimpleLogicComponent3 } from './examples/CollectedLogicComponents';
import { connect } from './connect';

class VisualComponent extends Component {
    static propTypes = {
        hifu: PropTypes.shape({
            value: PropTypes.bool.isRequired,
        }).isRequired,
        hefu: PropTypes.shape({
            click: PropTypes.func.isRequired,
        }).isRequired,
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
        this.props.hefu.click();
    };

    render() {
        return (
            <div className='test' onClick={this.handleClick}>
                {'' + this.props.hifu.value}
            </div>
        );
    }
}

const NAME = 'Test';

describe("connect function", () => {
    describe("when called with a LModel class and a name parameters", () => {
        it("returns a wrapper function", () => {
            const wrapperFunction = connect(CollectedSimpleLogicComponent3, NAME);
            expect(typeof wrapperFunction).toBe('function');
        });
    });

    describe("when the returned wrapper function is called", () => {
        it("returns a function component", () => {
            const FunctionComponent = connect(CollectedSimpleLogicComponent3, NAME)(VisualComponent);
            expect(typeof FunctionComponent).toBe('function');
        });
    });

    describe("when the function component is mounted with proper props", () => {
        let FunctionComponent, enzymeWrapper;
        beforeEach(() => {
            FunctionComponent = connect(CollectedSimpleLogicComponent3, NAME)(VisualComponent);
            enzymeWrapper = mount(<FunctionComponent />);
        });
        afterEach(() => {
            jest.clearAllMocks();
        });

        it("render the logic component and a Wrapper component with the wrapped visual component", () => {
            expect(enzymeWrapper.find('.simpleLogicComponent3').length).toBe(1);
            expect(enzymeWrapper.find('hInject(VisualComponent)').length).toBe(1);
            expect(enzymeWrapper.find('VisualComponent').length).toBe(1);
        });

        it("the visual component receives injected props.", () => {
            expect(enzymeWrapper.find('VisualComponent').props().hefu.click).toBeDefined();
            expect(enzymeWrapper.find('VisualComponent').props().hifu).toEqual({ value: true });
        });

        it("the visual component invokes an injected prop and receives new values on another.", () => {
            expect(enzymeWrapper.find('.test').text()).toBe('true');
            enzymeWrapper.find('.test').simulate('click');
            expect(enzymeWrapper.find('.test').text()).toBe('false');
        });
    });
});
