import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';
import { Colors } from 'utils/color';

const StyledInputRange = styled.input<StyledRangeProps>`
  /* Initialized */
  border: none;
  outline: none;
`;

function Range({
  disabled,
  name,
  value,
  step,
  min,
  max,
  onChange,
}: InputRangeProps) {
  return (
    <StyledInputRange
      disabled={disabled}
      name={name}
      max={max}
      min={min}
      onChange={onChange}
      step={step}
      type="range"
      value={value}
    />
  );
}

interface StyledRangeProps {}

interface InputRangeProps extends StyledRangeProps {
  readonly disabled: boolean;
  readonly max: number;
  readonly min: number;
  readonly name: string;
  readonly step: number;
  readonly value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

Range.defaultProps = {
  disabled: false,
  value: '',
  step: 1,
  min: 0,
  max: 60,
};

export default React.memo(Range);
