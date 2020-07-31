import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { Input } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  width: 17rem;
  height: 100%;
  border-right: 0.05rem solid ${COLORS.green};
`;

const StyledBranch = styled.div`
  padding-bottom: 0.5rem;
`;

const StyledTeamArea = styled.div`
  padding-bottom: 0.5rem;
`;

const StyledTeam = styled.div`
  padding-bottom: 0.5rem;
`;

function Organization() {
  const [branchInput, setBranchInput] = useState<string>('');
  const [teamInputs, setTeamInputs] = useState<string[]>(['']);

  const branchInputRef = useRef<HTMLInputElement>(
    null,
  ) as React.MutableRefObject<HTMLInputElement>;
  const teamInputRef = useRef<HTMLInputElement[]>(
    [],
  ) as React.MutableRefObject<HTMLInputElement[]>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === 'branch') {
      setBranchInput(e.target.value);
    }
  };

  const onKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setTeamInputs(teamInputs.concat(''));
    }
  };

  return (
    <StyledWrapper>
      <StyledBranch>
        <Input
          innerRef={branchInputRef}
          value={branchInput}
          name={'branch'}
          placeholder={'지점명 입력'}
          height={3}
          borderRadius={2}
          onChange={onChange}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            // console.log(teamInputRef.current);
            // e.keyCode === 13 ? teamInputRef.current.focus() : null;
          }}
        />
      </StyledBranch>
      <StyledTeamArea>
        {teamInputs.map((value, i) => {
          return (
            <StyledTeam key={`styled-team-${i}`}>
              <Input
                // innerRef={ref => teamInputRef.current[i] = ref}
                value={value}
                name={`team${[i]}`}
                placeholder={'팀명 입력'}
                height={2.5}
                borderRadius={2}
                onChange={(e) =>
                  setTeamInputs(
                    teamInputs.map((value, j) => {
                      if (i === j) value = e.target.value;
                      return value;
                    }),
                  )
                }
                onKeyUp={onKeyEvent}
              />
            </StyledTeam>
          );
        })}
      </StyledTeamArea>
    </StyledWrapper>
  );
}

interface arrayType {}

interface OrganizationProps {}

Organization.defaultProps = {};

export default Organization;
