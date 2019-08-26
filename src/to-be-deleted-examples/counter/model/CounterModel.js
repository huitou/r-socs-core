/*
    CounterModel - A pure model component

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import { withCollector } from '../../../withCollector';
import CounterCollector from './CounterCollector';
import CounterLogic from './CounterLogic';

export default withCollector(CounterCollector)(CounterLogic);
