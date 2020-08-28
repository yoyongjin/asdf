import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const StyledLink = styled(RouterLink)({
  textDecoration: 'none',
}) as RouterLink;

function Link({ path, onClick, children }: LinkProps) {
  return (
    <StyledLink to={path} onClick={onClick}>
      {children}
    </StyledLink>
  );
}

interface LinkProps {
  children: React.ReactChild;
  path: string;
  onClick?: () => void;
}

export default Link;
