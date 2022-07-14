import React from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export type BaseHeaderProps = {
  avatarSymbol?: string;
  avatarColor?: string;
  avatarMenu?: Array<{
    title: string;
    onClick: () => void;
  }>;
};

const BaseHeaderBox = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const BaseHeader: React.FC<BaseHeaderProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleCloseClick = () => setAnchorEl(null);
  const handleOpenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.avatarMenu) {
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <BaseHeaderBox>
      <Box pl={3}>
        <Typography>
          React UI Boilerplate
        </Typography>
      </Box>
      <Box pr={2}>
        <IconButton
          onClick={handleOpenClick}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: props.avatarColor,
            }}
          >
            {props.avatarSymbol || '#'}
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseClick}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {props.avatarMenu?.map((avatarMenuItem) => (
            <MenuItem
              key={avatarMenuItem.title}
              onClick={() => {
                handleCloseClick();
                avatarMenuItem?.onClick();
              }}
            >
              <Typography>
                {avatarMenuItem.title}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </BaseHeaderBox>
  );
};
