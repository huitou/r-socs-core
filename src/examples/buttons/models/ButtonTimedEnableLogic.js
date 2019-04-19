/*
    ButtonTimedEnableLogic - A pure logic component

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/


/*

    This button has only two handles: enabled and click.
    It has two rules:
        1) it triggers when it is enabled otherwise not.
        2) it is disabled immediately after a trigger and will be enabled only after 2 seconds.

*/
import { Component } from "react";
import PropTypes from 'prop-types';

export default class ButtonTimedEnableLogic extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        enabled: PropTypes.bool.isRequired,
        interval: PropTypes.number,
    };

    static defaultProps = {
        interval: 0,
    };

    constructor(props) {
        super(props);

        this.state = { timeEnabled: true };

        this.setTimedEnable = this.setTimedEnable.bind(this);
        this.setTimedDisable = this.setTimedDisable.bind(this);

        this.enabled = this.enabled.bind(this);
        this.click = this.click.bind(this);
    }

    setTimedEnable() {
        this.setState({ timeEnabled: true });
    }
    setTimedDisable() {
        this.setState({ timeEnabled: false });
    }

    enabled() {
        return this.props.enabled && this.state.timeEnabled;
    }

    click() {
        if (this.enabled()) {
        this.setTimedDisable();
        this.props.onClick();
        setTimeout(this.setTimedEnable, this.props.interval);
        }
    };

    render() {
        return null;
    }
}
