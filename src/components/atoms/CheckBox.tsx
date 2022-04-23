import React from 'react';
import styled from 'styled-components';

import { TonChangeCheckBox } from 'hooks/useInputForm';

const StyledCheckBox = styled.input``;

function CheckBox({ disabled, isChecked, name, onChange }: ICheckBox) {
  return (
    <StyledCheckBox
      checked={isChecked}
      disabled={disabled}
      name={name}
      onChange={onChange}
      type="checkbox"
    />
  );
}

interface ICheckBox {
  disabled: boolean;
  isChecked: boolean; // 체크 여부
  name?: string; // 이름
  onChange?: TonChangeCheckBox;
}

CheckBox.defaultProps = {
  disabled: false,
  isChecked: true,
};

export default CheckBox;
