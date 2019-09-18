import React from "react";
import { mount } from "enzyme";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";
import toJson from "enzyme-to-json";

import { ToggleBox } from "..";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("ToggleBox", () => {
  it("renders default", () => {
    const component = mount(
      <ToggleBox value="default" id="default">
        default
      </ToggleBox>
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders active", () => {
    const component = mount(
      <ToggleBox isActive={true} value="active" id="active">
        isActive
      </ToggleBox>
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders disabled", () => {
    const component = mount(
      <ToggleBox disabled={true} value="disabled" id="disabled">
        disabled
      </ToggleBox>
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("calls onChange prop when the input is changed", () => {
    const onChangeFn = jest.fn();
    const component = mount(
      <ToggleBox value="default" id="default" onChange={onChangeFn}>
        default
      </ToggleBox>
    );

    const toggleBoxInput = component.find("input");

    expect(onChangeFn).not.toHaveBeenCalled();
    toggleBoxInput.simulate("change", { target: { checked: true } });
    expect(onChangeFn).toHaveBeenCalled();
  });
});