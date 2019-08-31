/*
	MapModel - It collects a map of Models as its children.

	Copyright (C) 2019 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
import React, { Component, Fragment } from 'react';
import { objectOf, elementType } from 'prop-types';

import Collector, { withCollector } from '../collector/index';

class MapModelComponent extends Component {
	static propTypes = {
		map: objectOf(elementType).isRequired,
	};

	mappedNodes = () => {
		const { map, hset, ...rest } = this.props;

		return Object.entries(map).map(([name, Model]) => {
			return (<Model key={name} {...rest} hset={this.hset(name)} />);
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
