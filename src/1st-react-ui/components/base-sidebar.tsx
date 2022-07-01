import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

export type BaseSidebarProps = {
  listItems: Array<{
    title: string;
    icon: React.ReactNode;
    onClick?: () => void;
    selected?: boolean;
  }>;
};

export const BaseSidebar: React.FC<BaseSidebarProps> = (props) => {
  return (
    <List>
      {props.listItems.map((listItem) => (
        <ListItem
          key={listItem.title}
          disablePadding
        >
          <ListItemButton
            selected={listItem.selected}
            onClick={listItem.onClick}
            sx={{ px: 3 }}
          >
            <ListItemIcon sx={{ minWidth: 48 }}>
              {listItem.icon}
            </ListItemIcon>
            <ListItemText>
              {listItem.title}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
