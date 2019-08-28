import * as React from "react";
import { cx } from "emotion";
import shortid from "shortid";
import {
  segmentedControlButton,
  segmentedControlButtonActive,
  staticKeyboardFocusClassname
} from "../style";
import { visuallyHidden, display } from "../../shared/styles/styleUtils";
import FocusStyleManager from "../../shared/components/FocusStyleManager";

export interface SegmentedControlButtonProps {
  /**
   * Unique identifier used for the input button
   */
  id?: string;
  /**
   * Whether the button has been selected
   */
  isActive?: boolean;
  /**
   * The name passed to the input. Shared by all inputs in the segmented control
   */
  name?: string;
  /**
   * Callback for when a user makes a selection. Use the `onSelect` prop on the `SegmentedControl` instead, unless there is some extenuating circumstance.
   */
  onChange?: (e: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * The value of the input
   */
  value: string;
}

const SegmentedControlButton: React.SFC<
  SegmentedControlButtonProps
> = props => {
  const { id = shortid.generate(), isActive, onChange, name, value } = props;
  return (
    <React.Fragment>
      {/*
        tslint:disable react-a11y-role-has-required-aria-props
        This rule is asking for a `aria-checked` attribute on the input element.
        We're already setting `checked`, so this is redundant and unnecessary.
      */}
      <FocusStyleManager focusEnabledClass={staticKeyboardFocusClassname}>
        <label
          className={cx(display("inline-block"), segmentedControlButton, {
            [segmentedControlButtonActive]: props.isActive
          })}
          data-cy="segmentedControlButton"
          htmlFor={id}
        >
          <input
            className={visuallyHidden}
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={isActive}
            onChange={onChange}
          />
          {props.children}
        </label>
      </FocusStyleManager>
    </React.Fragment>
  );
};

export default SegmentedControlButton;