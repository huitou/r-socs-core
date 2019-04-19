/*
    It connects a model component to a target component and inject provided values and handles.

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React from 'react';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const connect = (ModelComponent, name) => (TargetComponent) => {
    class HInjector extends React.Component {
        render() {
            const collector = this.props.getCollector();
            return collector
                ? <TargetComponent {...this.props} getCollector={undefined} {...collector.valueAndHandleTree()} />
                : null;
        }
    }
    HInjector.displayName = `hInject(${getDisplayName(TargetComponent)})`;

    const HConnect = (props) => {
        const root = {
            collector: undefined,
            ref: React.createRef(),
        };

        const changeEventHandle = () => {
            root.ref.current && root.ref.current.forceUpdate();
        };

        const register = (collectorInstance) => {
            root.collector = collectorInstance;
            return changeEventHandle;
        };

        const hset = { name, register };
        const getCollector = () => root.collector;

        return (
            <React.Fragment>
                <HInjector {...props} ref={root.ref} getCollector={getCollector} hprops={undefined} />
                <ModelComponent {...props.hprops} hset={hset} />
            </React.Fragment>
        );
    };
    HConnect.displayName = `hConnect(${getDisplayName(TargetComponent)})`;

    return HConnect;
};