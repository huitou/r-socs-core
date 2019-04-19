/*
  Testing for Collector.

  Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.
  Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import Collector from './Collector';

const NAME = 'TestCollector';
const parentChangeEventHandleMock = jest.fn();
const parentRegisterMock = jest.fn().mockReturnValue(parentChangeEventHandleMock);

describe('Collector', () => {
    describe('instance, when properly instantiated with an object parameter,', () => {
        
        let collectorInstance
        beforeEach(() => {
            collectorInstance = new Collector({ name: NAME, register: parentRegisterMock });
        })
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('has _name assuming the value name passed in the parameter', () => {
            expect(collectorInstance._name).toBe(NAME);
        });

        it('has called register once to register itself', () => {
            expect(parentRegisterMock).toHaveBeenCalledTimes(1);
            expect(parentRegisterMock).toHaveBeenCalledWith(collectorInstance);
        });

        it('has _changeEventHandle assuming the value returned by register', () => {
            expect(collectorInstance._changeEventHandle).toBe(parentChangeEventHandleMock);
        });

        it('has _isChangeEventSwitchOn assuming the value true', () => {
            expect(collectorInstance._isChangeEventSwitchOn).toBe(true);
        });

        it('has _childCollectors assuming the value {}', () => {
            expect(collectorInstance._childCollectors).toEqual({});
        });
    });

});