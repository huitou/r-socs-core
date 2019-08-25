/*
  Sample Collector.

  Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.
  Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import Collector from '../collector/Collector';

export default class CollectorSimple extends Collector {
    static handleMap = {
        hfu: {
            hifu: { value: 'getTestState' },
            hefu: { click: 'handleClick' },
        },
    };
}