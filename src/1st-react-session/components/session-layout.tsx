import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const SessionLayoutWrapper = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const SessionLayoutContainer = styled(Box)({
  maxWidth: 400,
  flex: 1,
});

export const SessionLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <SessionLayoutWrapper>
      <SessionLayoutContainer p={3}>
        {props.children}
      </SessionLayoutContainer>
    </SessionLayoutWrapper>
  );
};
