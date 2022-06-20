import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import GroupIcon from '@mui/icons-material/Group';
import { BaseHeader, BaseLayout, BaseSidebar } from '~/1st-react-ui';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { useAppSessionService } from '../di';

export const AppLayout: React.FC<React.PropsWithChildren> = (props) => {
  const navigate = useNavigate();
  const sessionService = useAppSessionService();
  const sessionData = useBehaviorSubject(sessionService.currentSessionData$);
  const matchUser = useMatch('/user/*');
  const matchSession = useMatch('/session/*');

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
      sidebar={(
        <BaseSidebar
          listItems={[
            {
              title: 'User',
              icon: <GroupIcon/>,
              onClick: () => navigate('/user'),
              selected: Boolean(matchUser),
            },
            {
              title: 'Session',
              icon: <AccessAlarmsIcon/>,
              onClick: () => navigate('/session'),
              selected: Boolean(matchSession),
            },
          ]}
        />
      )}
    >
      {props.children}
    </BaseLayout>
  );
};
