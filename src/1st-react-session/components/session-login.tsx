import React from 'react';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { BaseCenterLayout, BasePaperTitledBox } from '~/1st-react-ui';
import { useSessionService } from '../di';
import { SessionLoginForm, SessionLoginFormData } from './session-login-form';

export const SessionLogin: React.FC = () => {
  const sessionService = useSessionService();
  const currentToken = useBehaviorSubject(sessionService.currentToken$);

  const onSubmit = (data: SessionLoginFormData) => {
    sessionService.login(data.login, data.password);
  };

  return (
    <BaseCenterLayout>
      <BasePaperTitledBox title={'Auth'}>
        <SessionLoginForm
          onSubmit={onSubmit}
          loading={currentToken.loading}
        />
      </BasePaperTitledBox>
    </BaseCenterLayout>
  );
};
