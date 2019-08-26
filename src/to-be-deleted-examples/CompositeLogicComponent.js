/*
    CompositeLogicComponent

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React, { Component } from "react";

import {
    CollectedSimpleLogicComponent1,
    /* CollectedSimpleLogicComponent2 // This choice requires static binding hence too rigid. */
} from './CollectedLogicComponents'

// This choice makes only one CollectedSimpleLogicComponent2 hence no unnecessary unmounting.
import CollectorWrapper from './CollectorWrapper';
import SimpleLogicComponent2 from './SimpleLogicComponent2';
const CollectedSimpleLogicComponent2 = CollectorWrapper(SimpleLogicComponent2);

const NAME = 'CompositeLogicComponent';

class CompositeLogicComponent extends Component {
    state = { test: true };

    handleClick = () => {
        this.setState(
        (state) => ({ test: !state.test })
        );
    };

    render() {
        return (
        <div className='compositeLogicComponent'>
            <div onClick={this.handleClick}>{`${NAME}`}</div>
            <CollectedSimpleLogicComponent1 hset={this.hset('Child-1')} />
            <CollectedSimpleLogicComponent2 hset={this.hset('Child-2')} />
        </div>)
        ;
    }
}

export default CompositeLogicComponent;
