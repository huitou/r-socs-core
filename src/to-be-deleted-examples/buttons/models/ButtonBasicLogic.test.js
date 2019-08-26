/*
    Testing for ButtonBasicLogic.

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React from "react";
import { shallow } from "enzyme";

import ButtonBasicLogic from "./ButtonBasicLogic";

const onClickMock = jest.fn();

describe("ButtonBasicLogic", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe(", when mounted with enabled prop set to true,", () => {
        it("enabled() returns true and click() triggers", () => {
            const enzymeWrapper = shallow(<ButtonBasicLogic enabled={true} onClick={onClickMock} />);
            expect(enzymeWrapper.instance().enabled()).toBe(true);
            enzymeWrapper.instance().click();
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("immediately after click() triggered, enable() returns true and click() triggers again", () => {
            const enzymeWrapper = shallow(<ButtonBasicLogic enabled={true} onClick={onClickMock} />);
            enzymeWrapper.instance().click();
            expect(enzymeWrapper.instance().enabled()).toBe(true);
            enzymeWrapper.instance().click();
            expect(onClickMock).toHaveBeenCalledTimes(2);
        });
    });

    describe(", when mounted with enabled prop set to false,", () => {
        it("enabled() returns false and click() does not trigger", () => {
            const enzymeWrapper = shallow(<ButtonBasicLogic enabled={false} onClick={onClickMock} />);
            expect(enzymeWrapper.instance().enabled()).toBe(false);
            enzymeWrapper.instance().click();
            expect(onClickMock).not.toHaveBeenCalled();
        });
    });
});
