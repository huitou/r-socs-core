/*
    ButtonCollector - A collector of handles

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import Collector from '../../../Collector';

export default class ButtonCollector extends Collector {
    static handleMap = {
        hfu: {
            hifu: { enabled: 'enabled' },
            hefu: { click: 'click' },
        },
    };
}
