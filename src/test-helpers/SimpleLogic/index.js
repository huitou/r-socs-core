/*
	Test helper SimpleLogic.

	Copyright (C) 2019 Riverside Software Engineering Ltd. All rights reserved.

	Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
import { withCollector } from '../../collector';
import SimpleLogicComponent from './SimpleLogicComponent';
import SimpleLogicCollector from './SimpleLogicCollector';

export default withCollector(SimpleLogicCollector)(SimpleLogicComponent);
