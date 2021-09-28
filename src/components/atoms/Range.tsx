import React from 'react';
import styled from 'styled-components';

const StyledInputRange = styled.input<StyledRangeProps>`
  /* Initialized */
  border: none;
  outline: none;

  width: ${(props) => props.width}px;
`;

function Range({
  disabled,
  name,
  value,
  step,
  min,
  max,
  onChange,
  ...rest
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
      {...rest}
    />
  );
}

interface StyledRangeProps {
  width: number;
}

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
  width: 100,
};

export default React.memo(Range);
