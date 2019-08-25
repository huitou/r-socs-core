/*
    It connects a map of model components to a target component and inject provided values and handles.

    Copyright (c) 2019 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React from 'react';

import { connect } from './connect';
import { MapModel } from './MapModel';

export const connectMap = (map, name) => {
    const CompositeModel = () => ({ hprops }) => (
        <MapModel { ...hprops } map={map} />
    )
    connect(CompositeModel, name);
}
