/*
    It collects a map of models as its children.

    Copyright (c) 2019 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';

import Collector, { withCollector } from '../collector/index';

class MapModelComponent extends Component {
    static propTypes = {
        hprops: object,
        map: object,        // TODO: be more specific.
    };

    mappedNodes = () => {
        const { hprops, map } = this.props;

        return Object.entries(map).map(([name, Model]) => {
            return (<Model key={name} {...hprops} hset={this.hset(name)} />);
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
