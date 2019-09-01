/*
	connectMap - It connects a map of model components to a target component and inject provided values and handles.

	Copyright (C) 2019 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
import React from 'react';

import { connect } from './connect';
import { MapModel } from '../models/index';

export const connectMap = (modelMap, name, propsMap) => {
	const CompositeModel = (props) => (
		<MapModel { ...props } map={modelMap} propsMap={propsMap} />
	)
	return connect(CompositeModel, name);
}
