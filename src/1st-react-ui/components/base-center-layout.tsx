import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ContainerBox = styled(Box)({
  maxWidth: 400,
  flex: 1,
});

export const BaseCenterLayout: React.FC<React.PropsWithChildren> = (props) => (
  <Wrapper>
    <ContainerBox p={3}>
      {props.children}
    </ContainerBox>
  </Wrapper>
);
