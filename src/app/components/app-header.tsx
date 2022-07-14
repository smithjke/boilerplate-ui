import React from 'react';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { BaseHeader } from '~/1st-react-ui';
import { colorFromString } from '../utils';
import { useAppSessionService } from '../di';

export const AppHeader: React.FC = () => {
  const sessionService = useAppSessionService();
  const sessionData = useBehaviorSubject(sessionService.currentSessionData$);

  return (
    <BaseHeader
      avatarSymbol={sessionData.data?.user?.name[0]?.toUpperCase() || '#'}
      avatarColor={sessionData.data?.user?.id && colorFromString(sessionData.data?.user?.id)}
      avatarMenu={[
        {
          title: 'Logout',
          onClick: () => sessionService.logout(),
        },
      ]}
    />
  );
};
