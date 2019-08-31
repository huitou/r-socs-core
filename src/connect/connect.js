/*
	connect - It connects a model component to a target component and inject provided values and handles.

	Copyright (C) 2018-2019 Riverside Software Engineering Ltd. All rights reserved.

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

			return collector
				? (<TargetComponent {...rest} {...{ [collector.getName()]: collector.valueAndHandleTree() }} />)
				: null;
		}
	}
	HInjector.displayName = `hInject(${getDisplayName(Model)}-${getDisplayName(TargetComponent)})`;

	class HConnect extends React.Component {
		root = {
			collector: undefined,
			ref: React.createRef(),
		};

		changeEventHandle = () => {
			this.root.ref.current && this.root.ref.current.forceUpdate();
		};

		register = (collectorInstance) => {
			this.root.collector = collectorInstance;
			return this.changeEventHandle;
		};

		getCollector = () => this.root.collector;

		render() {
			const hset = { name, register: this.register };

			return (
				<React.Fragment>
					{/* all props are passed on and TargetComponent will decide their usage. */}
					<HInjector {...this.props} ref={this.root.ref} getCollector={this.getCollector} />
					{/* all props are passed to Model and it will decide their usage */}
					<Model {...this.props} hset={hset} />
				</React.Fragment>
			);
		}
	};
	HConnect.displayName = `hConnect(${getDisplayName(Model)}-${getDisplayName(TargetComponent)})`;

	return HConnect;
};