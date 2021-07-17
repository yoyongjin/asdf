import React from 'react';
import styled from 'styled-components';

import { UserProperty } from 'components/molecules';
import { Colors } from 'utils/color';
import { TableContentData } from 'components/organisms/UserView';

const StyledWrapper = styled.tr`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${Colors.gray7};
`;

function TableContent({ contents }: TableContentProps) {
  return (
    <>
      {contents.data.map((data, i) => {
        if (contents.type === 'user') {
          return (
            <StyledWrapper key={`styled-property-${i}`}>
              <UserProperty
                key={`table-property-${i}`}
                userData={data}
                options={contents.option!}
                onClickUserDataPopup={contents.click![0]}
                onClickRemoveUser={contents.click![2]}
                onClickResetPassword={contents.click![1]}
              />
            </StyledWrapper>
          );
        } else if (contents.type === 'stat') {
          return null;
        }
      })}
    </>
  );
}

interface TableContentProps {
  contents: TableContentData;
}

TableContent.defaultProps = {};

export default TableContent;
