/*
	Library main test.

	Copyright (C) 2019 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
import {
	Collector,
	withCollector,
	connect,
	connectMap,
} from './main';

import CollectorD from './collector/Collector';
import { withCollector as withCollectorD } from './collector/withCollector';
import { connect as connectD } from './connect/connect';
import { connectMap as connectMapD } from './connect/connectMap';

describe('Collector', () => {
	it('is exported correctly from ./collector/Collector', () => {
		expect(Collector).toBeDefined();
		expect(Collector).toBe(CollectorD);
	});
});

describe('withCollector', () => {
	it('is exported correctly from ./collector/withCollector', () => {
		expect(withCollector).toBeDefined();
		expect(withCollector).toBe(withCollectorD);
	});
});

describe('connect', () => {
	it('is exported correctly from ./connect/connect', () => {
		expect(connect).toBeDefined();
		expect(connect).toBe(connectD);
	});
});

describe('connectMap', () => {
	it('is exported correctly from ./connect/connectMap', () => {
		expect(connectMap).toBeDefined();
		expect(connectMap).toBe(connectMapD);
	});
});
