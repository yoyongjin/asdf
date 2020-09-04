import React, { useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { Input } from 'components/atoms';
import { BranchInfo, TeamInfo } from 'modules/types/branch';
import useInputForm from 'hooks/useInputForm';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  width: 13.75rem;
  height: 100%;
  text-align: center;
  border-right: 1px solid ${COLORS.green};

  /* Other */
  overflow: auto;
`;

const StyledBranch = styled.div`
  /* Display */
  padding-bottom: 1rem;
`;

const StyledTeam = styled.div`
  /* Display */
  padding-bottom: 1rem;
`;

let isCtrl = false;

function Organization({
  index,
  branch,
  branchId,
  handleAddBranch,
  handleAddTeam,
  handleUpdateTeam,
  handleUpdateBranch,
  handleDeleteTeam,
  handleDeleteBranch,
}: OrganizationProps) {
  const { form, onChangeInput, setKeyValue } = useInputForm<Dic>({});
  const inputRef = useRef<HTMLInputElement[]>([]) as React.MutableRefObject<
    HTMLInputElement[]
  >;

  useEffect(() => {
    if (!branchId) {
      inputRef.current[0].focus();
    } else if (index === 0) {
      inputRef.current[branch!.length - 1].focus();
    }
  }, [inputRef, index, branch, branchId]);

  const onKeyEvent = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number,
      value: string,
      name: string,
      branch: Array<BranchInfo | TeamInfo>,
      branchId: number,
    ) => {
      switch (e.keyCode) {
        case 9:
        case 13:
          if (!value || value.trim() === '') return;

          if (name.indexOf('branch') > -1) {
            const branchIf = branch[index] as BranchInfo;
            if (!branchIf.branch_name) {
              // 지점 입력이 처음일 때
              handleAddBranch!(value);
              setKeyValue(name, '');
              return;
            } else {
              handleUpdateBranch!(branchIf.id, value);
            }
          } else if (name.indexOf('team') > -1) {
            const teamIf = branch[index] as TeamInfo;
            if (!teamIf.team_name) {
              // 팀 입력이 처음일 때
              handleAddTeam!(value, teamIf.branch_id, teamIf.id);
              setKeyValue(name, '');
              return;
            } else {
              handleUpdateTeam!(teamIf.id, value, branchId);
            }
          }
          break;
        case 8:
          if (!value || value.trim() === '') {
            if (name.indexOf('branch') > -1) {
              const branchIf = branch[index] as BranchInfo;

              if (!branchIf.branch_name) {
                // 서버에 없는 데이터(팀명 입력 부분)
                return;
              }

              if (isCtrl) {
                // ctrl + a 후 delete 했을 경우
                isCtrl = false;
                return;
              }

              if(form[name] === undefined){
                return;
              }

              handleDeleteBranch!(branchIf.id);
            } else if (name.indexOf('team') > -1) {
              const teamIf = branch[index] as TeamInfo;
              console.log(teamIf);

              if (!teamIf.team_name) {
                // 서버에 없는 데이터(팀명 입력 부분)
                return;
              }

              if (isCtrl) {
                // ctrl + a 후 delete 했을 경우
                isCtrl = false;
                return;
              }

              if(form[name] === undefined){
                return;
              }
              handleDeleteTeam!(branchId, teamIf.id);
            }
          }
          break;
        default:
          break;
      }
    },
    [
      handleAddBranch,
      handleAddTeam,
      handleUpdateBranch,
      handleUpdateTeam,
      setKeyValue,
      handleDeleteTeam,
      handleDeleteBranch,
      form,
    ],
  );

  const onKeyUp = useCallback((e) => {
    if (e.keyCode === 17) {
      isCtrl = true;
    }
  }, []);
  return (
    <StyledWrapper>
      {branch!.length < 1
        ? null
        : branch?.map((value, i) => {
            const branchIf = value as BranchInfo;
            const teamIf = value as TeamInfo;
            if (branchIf.branch_name !== undefined) {
              return (
                <StyledBranch key={`styled-branch-${branchIf.branch_name}`}>
                  <Input
                    key={`input-branch-${branchIf.branch_name}`}
                    innerRef={(ref) => (inputRef.current[i] = ref)}
                    name={`branch${branchIf.id}`}
                    type={'search'}
                    value={
                      form[`branch${branchIf.id}`] ||
                      form[`branch${branchIf.id}`] === ''
                        ? form[`branch${branchIf.id}`]
                        : branchIf.branch_name
                    }
                    placeholder={'지점명 입력'}
                    width={11.25}
                    height={2.5}
                    borderWidth={2.5}
                    borderRadius={20}
                    borderColor={COLORS.green}
                    textAlign={1}
                    fontSize={0.87}
                    fontWeight={800}
                    onChange={onChangeInput}
                    onKeyDown={(e) =>
                      onKeyEvent(
                        e,
                        i,
                        form[`branch${branchIf.id}`],
                        `branch${branchIf.id}`,
                        branch,
                        branchId!,
                      )
                    }
                  />
                </StyledBranch>
              );
            } else if (teamIf.team_name !== undefined) {
              return (
                <StyledTeam
                  key={`styled-team-${teamIf.team_name}-${teamIf.id}`}
                >
                  <Input
                    key={`input-team-${teamIf.team_name}-${teamIf.id}`}
                    innerRef={(ref) => (inputRef.current[i] = ref)}
                    name={`${teamIf.branch_id}-team${teamIf.id}`}
                    type={'search'}
                    value={
                      form[`${teamIf.branch_id}-team${teamIf.id}`] ||
                      form[`${teamIf.branch_id}-team${teamIf.id}`] === ''
                        ? form[`${teamIf.branch_id}-team${teamIf.id}`]
                        : teamIf.team_name
                    }
                    placeholder={'팀명 입력'}
                    width={11.25}
                    height={2}
                    borderWidth={2.5}
                    borderColor={COLORS.light_gray2}
                    textAlign={1}
                    fontSize={0.87}
                    fontWeight={800}
                    onChange={onChangeInput}
                    onKeyUp={onKeyUp}
                    onKeyDown={(e) =>
                      onKeyEvent(
                        e,
                        i,
                        form[`${teamIf.branch_id}-team${teamIf.id}`],
                        `${teamIf.branch_id}-team${teamIf.id}`,
                        branch,
                        branchId!,
                      )
                    }
                  />
                </StyledTeam>
              );
            }
          })}
    </StyledWrapper>
  );
}

interface OrganizationProps {
  index: number;
  branch?: Array<BranchInfo | TeamInfo>;
  branchId?: number;
  handleAddBranch?: (name: string) => void;
  handleAddTeam?: (name: string, branchId: number, teamId: number) => void;
  handleUpdateTeam?: (id: number, name: string, branchId: number) => void;
  handleUpdateBranch?: (id: number, name: string) => void;
  handleDeleteTeam?: (branchId: number, teamId: number) => void;
  handleDeleteBranch?: (id: number) => void;
}

interface Dic {
  [key: string]: string;
}

Organization.defaultProps = {};

export default Organization;
