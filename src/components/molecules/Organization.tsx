import React, { useState, useRef, useCallback } from 'react';
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
  border-right: 0.08rem solid ${COLORS.green};
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

function Organization({
  branch,
  branchId,
  handleAddBranch,
  handleAddTeam,
}: // onChange,
OrganizationProps) {
  const { form, onChange } = useInputForm<Dic>({});
  const [tempList, setTempList] = useState<Array<BranchInfo | TeamInfo>>(
    branch!,
  ); // 리덕스에서 받아와서 렌더링하게되면 전체 뷰가 렌더링되기 때문에 이런 방식 사용
  const inputRef = useRef<HTMLInputElement[]>([]) as React.MutableRefObject<
    HTMLInputElement[]
  >;

  const onKeyEvent = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    value: string,
    name: string,
  ) => {
    if (e.keyCode === 13) {
      if (index + 1 === tempList.length) {
        setTempList((list) =>
          list.concat({
            branch_id: branchId!,
            id: index + 1,
            team_name: '',
          }),
        );
      } else {
        inputRef.current[index + 1].focus();
      }

      if (value) {
        console.log(index, value, name);
        if (name.indexOf('branch') > -1) {
          const branchIf = tempList[index] as BranchInfo;
          if (!branchIf.branch_name) {
            // 지점 입력이 처음일 때
            handleAddBranch!(value);
            return;
          }
        } else if (name.indexOf('team') > -1) {
          const teamIf = tempList[index] as TeamInfo;
          if (!teamIf.team_name) {
            // 팀 입력이 처음일 때
            handleAddTeam!(value, teamIf.branch_id);
            return;
          }
        }
      }
    }
  };
  
  console.log('Lendering Organization');
  return (
    <StyledWrapper>
      {tempList.length < 1
        ? null
        : tempList?.map((value, i) => {
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
                    borderWidth={0.1}
                    borderRadius={1.25}
                    borderColor={COLORS.light_gray2}
                    textAlign={1}
                    // onChange={(e) => onChange!(e, branchIf.id)}
                    onChange={onChange}
                    onKeyUp={(e) =>
                      onKeyEvent(
                        e,
                        i,
                        form[`branch${branchIf.id}`],
                        `branch${branchIf.id}`,
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
                    borderWidth={0.1}
                    borderRadius={1}
                    borderColor={COLORS.light_gray2}
                    textAlign={1}
                    // onChange={(e) => onChange!(e, teamIf.id)}
                    onChange={onChange}
                    onKeyUp={(e) =>
                      onKeyEvent(
                        e,
                        i,
                        form[`${teamIf.branch_id}-team${teamIf.id}`],
                        `${teamIf.branch_id}-team-${teamIf.id}`,
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
  branch?: Array<BranchInfo | TeamInfo>;
  branchId?: number;
  handleAddBranch?: (name: string) => void;
  handleAddTeam?: (name: string, id: number) => void;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}

interface Dic {
  [key: string]: string;
}

Organization.defaultProps = {};

export default Organization;
