import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BaseContainer } from './base-container';

const HEADER_HEIGHT = 60;

export type BaseLayoutProps = {
  header: React.ReactNode;
  sidebar: React.ReactNode;
};

const UnderHeader = styled('div')({
  height: HEADER_HEIGHT,
});

const Header = styled('div')(({ theme }) => ({
  background: theme.palette.background.paper,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: HEADER_HEIGHT,
  boxShadow: `0 0 10px 0 ${theme.palette.mode === 'light' ? theme.palette.grey['300'] : theme.palette.grey['900']}`,
}));

const Body = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const Sidebar = styled('div')(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: `0 0 10px 0 ${theme.palette.mode === 'light' ? theme.palette.grey['300'] : theme.palette.grey['900']}`,
  width: 300,
  minHeight: '100vh',
}));

const Page = styled('div')({
  flex: 1,
});

const Footer = styled('div')({});

export const BaseLayout: React.FC<React.PropsWithChildren<BaseLayoutProps>> = (props) => (
  <Box>
    <Body>
      <Sidebar>
        <UnderHeader/>
        {props.sidebar}
      </Sidebar>
      <Page>
        <UnderHeader/>
        {props.children}
        <Footer>
          <BaseContainer>
            FOOTER
          </BaseContainer>
        </Footer>
      </Page>
    </Body>
    <Header>
      {props.header}
    </Header>
  </Box>
);
