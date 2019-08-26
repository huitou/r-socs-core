/*
    DoubleCounterView - A pure view component

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class CounterDoubleView extends Component {
    static propTypes = {
        hifu: PropTypes.shape({
            value: PropTypes.number.isRequired,
        }).isRequired,
        hefu: PropTypes.shape({
            click: PropTypes.func.isRequired,
        }).isRequired,
    };

    render() {
        return (
            <div className='doubleViewCounter'>
                <h4>Double View Counter</h4>
                <div><label>{`Count: ${this.props.hifu.value}`}</label></div>
                <button onClick={this.props.hefu.click}>Click</button>
                <div><label>{`Count: ${this.props.hifu.value}`}</label></div>
                <button onClick={this.props.hefu.click}>Click</button>
            </div>
        );
    }
}
