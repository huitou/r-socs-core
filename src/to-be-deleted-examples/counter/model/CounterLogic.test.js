/*
    Testing for CounterLogic.

    Copyright (c) 2018 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import React from "react";
import { shallow } from "enzyme";

import CounterLogic from "./CounterLogic";

describe("CounterLogic", () => {
    const N = 99;

    // External behaviour testing:
    it("value() initally returns 0 and then increment by 1 on every click()", () => {
        const enzymeWrapper = shallow(<CounterLogic />);
        expect(enzymeWrapper.instance().value()).toBe(0);

        enzymeWrapper.instance().click();
        expect(enzymeWrapper.instance().value()).toBe(1);

        enzymeWrapper.instance().click();
        expect(enzymeWrapper.instance().value()).toBe(2);

        let i = 0;
        do { i += 1; enzymeWrapper.instance().click(); } while (i < N);
        expect(enzymeWrapper.instance().value()).toBe(N + 2);
    });

    // Limits testing:
    it("state.count has the limit of Number.MAX_SAFE_INTEGER", () => {
        const enzymeWrapper = shallow(<CounterLogic />);
        enzymeWrapper.setState({ count: Number.MAX_SAFE_INTEGER});
        enzymeWrapper.instance().click();
        expect(enzymeWrapper.instance().value()).toBe(Number.MAX_SAFE_INTEGER);
    });

    // Internal behaviour testing:
    it("state.count set to 0 and then increment by 1 on every click()", () => {
        const enzymeWrapper = shallow(<CounterLogic />);
        expect(enzymeWrapper.state().count).toBe(0);

        enzymeWrapper.instance().click();
        expect(enzymeWrapper.state().count).toBe(1);

        enzymeWrapper.setState({ count: N});
        enzymeWrapper.instance().click();
        expect(enzymeWrapper.state().count).toBe(N + 1);
        expect(enzymeWrapper.instance().value()).toBe(N + 1);
    });
});