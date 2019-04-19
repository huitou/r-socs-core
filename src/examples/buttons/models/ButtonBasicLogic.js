/*
    ButtonBasicLogic - A pure logic component

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/


/*

    Logically a button has only two handles: enabled and click.
    It has only one rule: it triggers when it is enabled otherwise not.

*/
import { Component } from "react";
import PropTypes from 'prop-types';

export default class ButtonBasicLogic extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        enabled: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.enabled = this.enabled.bind(this);
        this.click = this.click.bind(this);
    }

    enabled() {
        return this.props.enabled;
    }

    click() {
        if (this.enabled()) {
            this.props.onClick();
        }
    };

    render() {
        return null;
    }
}
