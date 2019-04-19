/*
    CompositeLogicComponent

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React, { Component } from "react";
import PropTypes from 'prop-types';

import Collector from "../Collector";
import { withCollector } from "../withCollector";

const NAME = 'LogicComponent';

class LogicComponent extends Component {
    static propTypes = {
        level: PropTypes.number,
    };
    static defaultProps = {
        level: 0,
    };

    state = { test: true };

    handleClick = () => {
        this.setState(
            (state) => ({ test: !state.test })
        );
    };

    render() {
        const { level } = this.props;
        // console.log('orginal rende() at level ', level);
        const Nested = withCollector(Collector)(LogicComponent);

        return (
            <div>
                <div className={ level ? `test-level${level}` : 'test'} onClick={this.handleClick}>
                    {`${NAME}-Level-${level}`}
                </div>
                { level ? <Nested hset={this.hset(`Nested-${NAME}`)} level={ level - 1 } /> : null }
            </div>
        );
    }
}

export default LogicComponent;
