/*
    It connects a model component to a target component and inject provided values and handles.

    Copyright (c) 2018-2019 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React from 'react';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const connect = (Model, name) => (TargetComponent) => {
    class HInjector extends React.Component {
        render() {
            const { getCollector, ...rest } = this.props;
            const collector = getCollector();

            console.log('HInjector render invoked with', collector && collector.valueAndHandleTree().simple1.hifu.value );

            return collector
                ? (<TargetComponent {...rest} {...{ [collector.getName()]: collector.valueAndHandleTree() }} />)
                : null;
        }
    }
    HInjector.displayName = `hInject(${getDisplayName(TargetComponent)})`;

    class HConnect extends React.Component {
        root = {
            collector: undefined,
            ref: React.createRef(),
        };

        changeEventHandle = () => {
            console.log('root changeEventHandle invoked and this.root.ref.current is', !!this.root.ref.current);
            this.root.ref.current && this.root.ref.current.forceUpdate();
        };

        register = (collectorInstance) => {
            this.root.collector = collectorInstance;
            return this.changeEventHandle;
        };

        getCollector = () => this.root.collector;

        render() {
            const { hprops, ...rest } = this.props;
            const hset = { name, register: this.register };

            return (
                <React.Fragment>
                    {/* hprops are passed on for eventual nested Models and they reach View at the end */}
                    <HInjector hprops={hprops} {...rest} ref={this.root.ref} getCollector={this.getCollector} />
                    {/* hprops are passed to Model to initialise it */}
                    <Model {...hprops} hset={hset} />
                </React.Fragment>
            );
        }
    };
    HConnect.displayName = `hConnect(${getDisplayName(TargetComponent)})`;

    return HConnect;
};