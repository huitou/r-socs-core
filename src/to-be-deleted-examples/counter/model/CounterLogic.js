/*
    CounterLogic - A pure logic component

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import { Component } from "react";

export default class CounterLogic extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.value = this.value.bind(this);
        this.click = this.click.bind(this);
    }

    value() {
        return this.state.count;
    }

    click() {
        this.setState(
            (state) => ({
                count: state.count === Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : state.count + 1,
            })
        );
    };

    render() {
        return null;
    }
}
