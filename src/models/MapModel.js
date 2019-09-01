/*
	MapModel - It collects a map of Models as its children.

	Copyright (C) 2019 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
import React, { Component, Fragment } from 'react';
import { objectOf, elementType, func } from 'prop-types';

import Collector, { withCollector } from '../collector/index';

class MapModelComponent extends Component {
	static propTypes = {
		map: objectOf(elementType).isRequired,
		propsMap: objectOf(func)
	};

	mappedNodes = () => {
		const { map, propsMap, hset, ...rest } = this.props;

		return Object.entries(map).map(([name, Model]) => {
			const props = (propsMap && propsMap[name])
				? propsMap[name](rest, name)
				: rest;
			return (<Model key={name} mapKey={name} {...props} hset={this.hset(name)} />);
		});
	};

	render() {
		return (
			<Fragment>
				{this.mappedNodes()}
			</Fragment>
		);
	}
}

export const MapModel = withCollector(Collector)(MapModelComponent);
