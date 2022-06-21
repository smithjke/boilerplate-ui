import React from 'react';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { useSessionService } from '../di';
import { SessionLogin } from './session-login';
import { SessionLoading } from './session-loading';

export const Session: React.FC<React.PropsWithChildren> = (props) => {
  const sessionService = useSessionService();
  const currentSessionData = useBehaviorSubject(sessionService.currentSessionData$);

  if (currentSessionData?.loading) {
    return (
      <SessionLoading/>
    );
  }

  if (!currentSessionData?.data) {
    return (
      <SessionLogin/>
    );
  }

  if (currentSessionData?.error) {
    throw currentSessionData.error;
  }

  if (currentSessionData?.data) {
    return (
      <>
        {props.children}
      </>
    );
  }

  return (
    <div>
      SESSION ERROR
    </div>
  );
};
