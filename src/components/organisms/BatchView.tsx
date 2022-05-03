import React, { useMemo } from 'react';
import styled from 'styled-components';

import { BatchItem, TitleV2 } from 'components/molecules';

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  height: 6rem;
  width: 100%;
`;

const StyledContent = styled.div`
  margin-top: 20px;
  height: calc(100% - 6rem - 100px - 20px);
  overflow-x: auto;
`;

const StyledFooter = styled.div`
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
`;

function BatchView() {
  /**
   * @description 타이틀에 들어갈 text 정보들
   */
  const titleTextData = useMemo(() => {
    const textConfig1 = {
      type: 'text',
      data: {
        text: `수동 배치`,
      },
    };

    return [textConfig1];
  }, []);

  /**
   * @description 타이틀 왼쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const titleRenderLeft = useMemo(() => {
    const renderData = [];

    renderData.push(...titleTextData);

    return {
      renderConfig: renderData,
    };
  }, [titleTextData]);

  /**
   * @description 타이틀 style 가져오기
   */
  const titleStyle = useMemo(() => {
    return {
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      leftMarginTop: 25,
    };
  }, []);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <TitleV2 renderLeft={titleRenderLeft} titleStyle={titleStyle} />
        </StyledTitle>
        <StyledContent>
          <BatchItem />
        </StyledContent>
        <StyledFooter></StyledFooter>
      </StyledWrapper>
    </>
  );
}

BatchView.defaultProps = {};

export default BatchView;
