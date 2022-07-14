import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { BaseSidebar } from '~/1st-react-ui';

type SidebarItem = {
  title: string;
  icon: React.ReactNode;
  uri: string;
};

const items: Array<SidebarItem> = [
  {
    title: 'Roles',
    icon: <FingerprintIcon/>,
    uri: '/role',
  },
  {
    title: 'Users',
    icon: <GroupIcon/>,
    uri: '/user',
  },
  {
    title: 'Sessions',
    icon: <AccessTimeIcon/>,
    uri: '/session',
  },
];

export const AppSidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <BaseSidebar
      listItems={items.map((item) => ({
        title: item.title,
        icon: item.icon,
        onClick: () => navigate(item.uri),
        selected: Boolean(useMatch(`${item.uri}/*`)),
      }))}
    />
  );
};
