import React from 'react';
import { BaseContainer } from '~/1st-react-ui';

export const AppContainer: React.FC<React.PropsWithChildren> = (props) => (
  <BaseContainer>
    {props.children}
  </BaseContainer>
);
