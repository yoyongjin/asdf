import React from 'react';
import styled from 'styled-components';

import { TonChangeCheckBox } from 'hooks/useInputForm';

const StyledCheckBox = styled.input``;

function CheckBox({ isChecked, name, onChange }: ICheckBox) {
  return (
    <StyledCheckBox
      checked={isChecked}
      name={name}
      onChange={onChange}
      type="checkbox"
    />
  );
}

interface ICheckBox {
  isChecked: boolean; // 체크 여부
  name?: string; // 이름
  onChange?: TonChangeCheckBox;
}

CheckBox.defaultProps = {
  isChecked: true,
};

export default CheckBox;
