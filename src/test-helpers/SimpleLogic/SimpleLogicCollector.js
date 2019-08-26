/*
	Test helper collector.

	Copyright (C) 2018-2019 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
import Collector from '../../collector';

class SimpleLogicCollector extends Collector {
	static handleMap = {
		hfu: {
			hifu: { value: 'getTestState' },
			hefu: { click: 'handleClick' },
		},
	};
}

export default SimpleLogicCollector;
