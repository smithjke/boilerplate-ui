import React from 'react';
import { BaseHeader, BaseLayout } from '~/1st-react-ui';
import { useAppSessionService } from '../di';
import { useBehaviorSubject } from '~/1st-react-rxjs';

export const AppLayout: React.FC<React.PropsWithChildren> = (props) => {
  const sessionService = useAppSessionService();
  const sessionData = useBehaviorSubject(sessionService.currentSessionData$);

  return (
    <BaseLayout
      header={(
        <BaseHeader
          avatarSymbol={sessionData.data?.user?.name[0]?.toUpperCase()}
          avatarMenu={[
            {
              title: 'Logout',
              onClick: () => sessionService.logout(),
            },
          ]}
        />
      )}
    >
      {props.children}
    </BaseLayout>
  );
};
