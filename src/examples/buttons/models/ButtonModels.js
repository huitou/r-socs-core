/*
    ButtonModel - A pure model component

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import { withCollector } from '../../../withCollector';
import ButtonCollector from './ButtonCollector';
import ButtonBasicLogic from './ButtonBasicLogic';
import ButtonTimedEnableLogic from './ButtonTimedEnableLogic';

export default withCollector(ButtonCollector)(ButtonBasicLogic);
export const TimedEnableButtonModel = withCollector(ButtonCollector)(ButtonTimedEnableLogic);
