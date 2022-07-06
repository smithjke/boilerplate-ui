import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import GroupIcon from '@mui/icons-material/Group';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { BaseHeader, BaseLayout, BaseSidebar } from '~/1st-react-ui';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { useAppSessionService } from '../di';
import { colorFromString } from '../utils';

export const AppLayout: React.FC<React.PropsWithChildren> = (props) => {
  const navigate = useNavigate();
  const sessionService = useAppSessionService();
  const sessionData = useBehaviorSubject(sessionService.currentSessionData$);
  const matchRole = useMatch('/role/*');
  const matchSession = useMatch('/session/*');
  const matchUser = useMatch('/user/*');

  return (
    <BaseLayout
      header={(
        <BaseHeader
          avatarSymbol={sessionData.data?.user?.name[0]?.toUpperCase()}
          avatarColor={sessionData.data?.user?.id && colorFromString(sessionData.data?.user?.id)}
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
              title: 'Roles',
              icon: <FingerprintIcon/>,
              onClick: () => navigate('/role'),
              selected: Boolean(matchRole),
            },
            {
              title: 'Users',
              icon: <GroupIcon/>,
              onClick: () => navigate('/user'),
              selected: Boolean(matchUser),
            },
            {
              title: 'Sessions',
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
