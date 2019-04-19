/*
    This is the attacher used to put a Collector instance into/onto a logic component.

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React from 'react';
import PropTypes from 'prop-types';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const withCollector = (Collector) => (LogicComponent) => {
    class ExtendedComponent extends LogicComponent {
        static propTypes = {
            hset: PropTypes.shape({
                name: PropTypes.string.isRequired,
                register: PropTypes.func.isRequired,
                unregister: PropTypes.func,
            }).isRequired,
        };

        constructor(props) {
            super(props);
            // console.log('extended constructor at level ', this.props.level);
            this._collector = new Collector(props.hset);
            this.hset = this.hset.bind(this);
        }

        hset(name) {
            return {
                name,
                register: this._collector.childCollectorRegister,
                unregister: this._collector.childCollectorUnregister,
            };
        }

        render() {
            // console.log('extended rende() at level ', this.props.level);
            this._collector.setChangeEventSwitchOff();
            return super.render && super.render();
        }

        componentDidMount() {
            // console.log('extended componentDidMount at level ', this.props.level);
            super.componentDidMount && super.componentDidMount();

            if (Collector.handleMap && Collector.handleMap.hfu) {
                const hfu = { hifu: {}, hefu: {} };

                Collector.handleMap.hfu.hifu &&
                Object.entries(Collector.handleMap.hfu.hifu).reduce(
                    (acc, cur) => { acc[cur[0]] = this[cur[1]]; return acc },
                    hfu.hifu
                );
                Collector.handleMap.hfu.hefu &&
                Object.entries(Collector.handleMap.hfu.hefu).reduce(
                    (acc, cur) => { acc[cur[0]] = this[cur[1]]; return acc },
                    hfu.hefu
                );

                this._collector.hfuRegister(hfu);
            }

            this._collector.setChangeEventSwitchOn();
            this._collector.changeEveneHandle();
        }

        componentDidUpdate() {
            // console.log('extended componentDidUpdate at level ', this.props.level);
            super.componentDidUpdate && super.componentDidUpdate();
            this._collector.setChangeEventSwitchOn();
            this._collector.changeEveneHandle();
        }

        componentWillUnmount() {
            const { unregister } = this.props.hset;
            // console.log('extended componentWillUnmount at level ', this.props.level);
            this._collector.hfuUnregister();
            unregister && unregister(this._collector);
            super.componentWillUnmount && super.componentWillUnmount();
        }
    }

    ExtendedComponent.propTypes = {
        hset: PropTypes.shape({
            name: PropTypes.string.isRequired,
            register: PropTypes.func.isRequired,
            unregister: PropTypes.func,
        }).isRequired,
    };
    ExtendedComponent.displayName = `${getDisplayName(LogicComponent)}`;

    const HCollector = (props) => {
        return (<ExtendedComponent {...props} />);
    };
    HCollector.displayName = `hCollect(${getDisplayName(LogicComponent)})`;

    return HCollector;
}
