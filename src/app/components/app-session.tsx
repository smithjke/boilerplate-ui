import React from 'react';
import { Session } from '~/1st-react-session';

export const AppSession: React.FC<React.PropsWithChildren> = (props) => (
  <Session>
    {props.children}
  </Session>
);
