/*
    Testing for ButtonTimedEnableLogic.

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

/*
    TODO: Complete test coverage is of vital importance and tests should be carefully designed.

    Note: This fact gives evidence of the necessity to have standard components and certified with standard tests.
*/

import React from "react";
import { shallow } from "enzyme";

import ButtonTimedEnableLogic from "./ButtonTimedEnableLogic";

const onClickMock = jest.fn();
const INTERVAL = 200; // milliseconds.
const resolveInMilliseconds = (n) => {
    return new Promise(resolve => { setTimeout(() => { resolve(n); }, n); });
};

describe("ButtonTimedEnableLogic", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe(", when mounted with enabled prop set to true,", () => {
        it("enabled() returns initially true and click() triggers", () => {
            const enzymeWrapper = shallow(<ButtonTimedEnableLogic enabled={true} onClick={onClickMock} interval={INTERVAL} />);
            expect(enzymeWrapper.instance().enabled()).toBe(true);
            enzymeWrapper.instance().click();
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("immediately after click() triggered, enable() returns false and click() does not trigger again", () => {
            const enzymeWrapper = shallow(<ButtonTimedEnableLogic enabled={true} onClick={onClickMock} interval={INTERVAL} />);
            enzymeWrapper.instance().click();
            expect(onClickMock).toHaveBeenCalledTimes(1);

            expect(enzymeWrapper.instance().enabled()).toBe(false);
            enzymeWrapper.instance().click();
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("about INTERVAL milliseconds after click() triggered, enable() returns true and click() triggers again", async () => {
            const enzymeWrapper = shallow(<ButtonTimedEnableLogic enabled={true} onClick={onClickMock} interval={INTERVAL} />);
            enzymeWrapper.instance().click();
            expect(onClickMock).toHaveBeenCalledTimes(1);

            await resolveInMilliseconds(INTERVAL);

            expect(enzymeWrapper.instance().enabled()).toBe(true);
            enzymeWrapper.instance().click();
            expect(onClickMock).toHaveBeenCalledTimes(2);

            expect(enzymeWrapper.instance().enabled()).toBe(false);
            enzymeWrapper.instance().click();
            expect(onClickMock).toHaveBeenCalledTimes(2);
        });
    });

    describe(", when mounted with enabled prop set to false,", () => {
        it("enabled() returns false", () => {
            const enzymeWrapper = shallow(<ButtonTimedEnableLogic enabled={false} onClick={onClickMock} />);
            expect(enzymeWrapper.instance().enabled()).toBe(false);
        });

        it("click() does not trigger", () => {
            const enzymeWrapper = shallow(<ButtonTimedEnableLogic enabled={false} onClick={onClickMock} />);
            enzymeWrapper.instance().click();
            expect(onClickMock).not.toHaveBeenCalled();
        });
    });
});