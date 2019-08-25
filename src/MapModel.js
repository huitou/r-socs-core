/*
    It connects a map of model components to a target component and inject provided values and handles.

    Copyright (c) 2019 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';

import Collector from './Collector';
import { withCollector } from "./withCollector";

class MapModelComponent extends Component {
    static propTypes = {
        hprops: object,
        map: object,
    };

    mappedNodes = () => {
        const { hprops, map } = this.props;

        return Object.entries(map).map(([name, Model]) => {
            <Model {...hprops} hset={this.hset(name)} />
        });
    };

    render() {
        <Fragment>
            {this.mappedNodes()}
        </Fragment>
    }
}

export const MapModel = withCollector(Collector)(MapModelComponent);
