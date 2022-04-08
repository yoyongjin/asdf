import React, { useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { Input } from 'components/atoms';
import useInputForm from 'hooks/useInputForm';
import { Colors } from 'utils/color';

import constants, { COMPANY_TYPE } from 'utils/constants';
import { BranchItem, TeamItem } from 'types/organization';
import { DynamicJSON } from 'types/common';
import {
  HandleAddBranch,
  HandleAddTeam,
  HandleModifyBranch,
  HandleModifyTeam,
  HandleRemoveBranch,
  HandleRemoveTeam,
} from 'hooks/useOrganization';

const StyledWrapper = styled.div`
  /* Display */
  width: 200px;
  height: 100%;
  border-right: 1px solid
    ${constants.COMPANY === COMPANY_TYPE.DBLIFE
      ? Colors.green1
      : COMPANY_TYPE.LINA
      ? Colors.blue1
      : Colors.blue3};

  /* Other */
  overflow: auto;
`;

const StyledBranch = styled.div`
  /* Display */
  padding-bottom: 10px;
`;

const StyledTeam = styled.div`
  /* Display */
  padding-bottom: 10px;
`;

let isCtrl = false;

function Organization({
  branchId,
  handleAddBranch,
  handleAddTeam,
  handleModifyBranch,
  handleModifyTeam,
  handleRemoveBranch,
  handleRemoveTeam,
  index,
  organizationDataList,
}: OrganizationProps) {
  const { form, onChangeInput, setSpecificValue } = useInputForm<DynamicJSON>(
    {},
  );
  const inputRef = useRef<HTMLInputElement[]>([]) as React.MutableRefObject<
    HTMLInputElement[]
  >;

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 17) {
      isCtrl = true;
    }
  };

  const onKeyEvent = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement>,
      branchId: number,
      name: string,
      value: string,
      organizationData: BranchItem | TeamItem,
    ) => {
      switch (e.keyCode) {
        case 9:
        case 13:
          if (!value || value.trim() === '') return;

          if (name.indexOf('branch') > -1) {
            // 지점 추가/수정/삭제 시
            const branchData = organizationData as BranchItem;

            if (!branchData.branch_name) {
              // 지점 입력이 처음일 때
              handleAddBranch(value);
              setSpecificValue(name, '');

              return;
            } else {
              handleModifyBranch!(branchData.id, value);
            }
          } else if (name.indexOf('team') > -1) {
            // 팀 추가/수정/삭제 시
            const teamData = organizationData as TeamItem;

            if (!teamData.team_name) {
              // 팀 입력이 처음일 때
              handleAddTeam(teamData.branch_id, teamData.id, value);
              setSpecificValue(name, '');

              return;
            } else {
              handleModifyTeam!(teamData.id, value, branchId);
            }
          }
          break;
        case 8:
          if (!value || value.trim() === '') {
            if (name.indexOf('branch') > -1) {
              const branchData = organizationData as BranchItem;

              if (!branchData.branch_name) {
                // 서버에 없는 데이터(팀명 입력 부분)
                return;
              }

              if (isCtrl) {
                // ctrl + a 후 delete 했을 경우
                isCtrl = false;
                return;
              }

              if (form[name] === undefined) {
                return;
              }

              handleRemoveBranch(branchData.id);
            } else if (name.indexOf('team') > -1) {
              const teamData = organizationData as TeamItem;

              if (!teamData.team_name) {
                // 서버에 없는 데이터(팀명 입력 부분)
                return;
              }

              if (isCtrl) {
                // ctrl + a 후 delete 했을 경우
                isCtrl = false;
                return;
              }

              if (form[name] === undefined) {
                return;
              }
              handleRemoveTeam(branchId, teamData.id);
            }
          }
          break;
        default:
          break;
      }
    },
    [
      form,
      handleAddBranch,
      handleAddTeam,
      handleModifyBranch,
      handleModifyTeam,
      handleRemoveBranch,
      handleRemoveTeam,
      setSpecificValue,
    ],
  );

  useEffect(() => {
    if (!branchId) {
      inputRef.current[0]?.focus();
    } else if (!branchId && index === 0) {
      inputRef.current[organizationDataList.length - 1]?.focus();
    }
  }, [inputRef, index, organizationDataList, branchId]);

  return (
    <StyledWrapper>
      {organizationDataList.map((value, i) => {
        const branchData = value as BranchItem;
        const teamData = value as TeamItem;

        if (branchData.branch_name !== undefined) {
          // 해당 정보가 지점인 경우
          return (
            <StyledBranch key={`styled-branch-${branchData.branch_name}`}>
              <Input
                key={`input-branch-${branchData.branch_name}`}
                borderColor={
                  constants.COMPANY === COMPANY_TYPE.DBLIFE
                    ? Colors.green1
                    : constants.COMPANY === COMPANY_TYPE.LINA
                    ? Colors.blue1
                    : Colors.blue3
                }
                borderRadius={20}
                borderWidth={2}
                fontFamily="NanumBarunGothic"
                fontSize={14}
                fontWeight={700}
                height={4}
                innerRef={(ref) => (inputRef.current[i] = ref)}
                name={`branch${branchData.id}`}
                placeholder="지점명 입력"
                textAlign={1}
                type="search"
                value={
                  form[`branch${branchData.id}`] ||
                  form[`branch${branchData.id}`] === ''
                    ? form[`branch${branchData.id}`]
                    : branchData.branch_name
                }
                width={18}
                onChange={onChangeInput}
                onKeyDown={(e) => {
                  const name = `branch${branchData.id}`;

                  onKeyEvent(
                    e,
                    branchId,
                    name,
                    form[name],
                    organizationDataList[i],
                  );
                }}
              />
            </StyledBranch>
          );
        } else if (teamData.team_name !== undefined) {
          return (
            <StyledTeam
              key={`styled-team-${teamData.team_name}-${teamData.id}`}
            >
              <Input
                key={`input-team-${teamData.team_name}-${teamData.id}`}
                type="search"
                borderColor={Colors.gray2}
                borderWidth={2}
                fontFamily="NanumBarunGothic"
                fontSize={14}
                fontWeight={700}
                height={4}
                innerRef={(ref) => (inputRef.current[i] = ref)}
                name={`${teamData.branch_id}-team${teamData.id}`}
                placeholder="팀명 입력"
                textAlign={1}
                value={
                  form[`${teamData.branch_id}-team${teamData.id}`] ||
                  form[`${teamData.branch_id}-team${teamData.id}`] === ''
                    ? form[`${teamData.branch_id}-team${teamData.id}`]
                    : teamData.team_name
                }
                width={18}
                onChange={onChangeInput}
                onKeyUp={onKeyUp}
                onKeyDown={(e) => {
                  const name = `${teamData.branch_id}-team${teamData.id}`;

                  onKeyEvent(
                    e,
                    branchId,
                    name,
                    form[name],
                    organizationDataList[i],
                  );
                }}
              />
            </StyledTeam>
          );
        }
      })}
    </StyledWrapper>
  );
}

interface OrganizationProps {
  branchId: number;
  handleAddBranch: HandleAddBranch;
  handleAddTeam: HandleAddTeam;
  handleModifyBranch: HandleModifyBranch;
  handleModifyTeam: HandleModifyTeam;
  handleRemoveBranch: HandleRemoveBranch;
  handleRemoveTeam: HandleRemoveTeam;
  index: number;
  organizationDataList: Array<BranchItem | TeamItem>;
}

Organization.defaultProps = {};

export default Organization;
