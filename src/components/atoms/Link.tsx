import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const StyledLink = styled(RouterLink)({
  textDecoration: 'none',
}) as RouterLink;

function Link({ path, children }: LinkProps) {
  return <StyledLink to={path}>{children}</StyledLink>;
}

interface LinkProps {
  path: string;
  children: React.ReactChild;
}

export default Link;
