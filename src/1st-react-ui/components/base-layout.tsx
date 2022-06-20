import React from 'react';
import { createUseStyles } from 'react-jss';
import { BaseContainer } from './base-container';

const HEADER_HEIGHT = 60;

export type BaseLayoutProps = {
  header: React.ReactNode;
  sidebar: React.ReactNode;
};

const useStyles = createUseStyles({
  BaseLayout: {},
  BaseLayout__UnderHeader: {
    height: HEADER_HEIGHT,
  },
  BaseLayout__Header: {
    background: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  },
  BaseLayout__Body: {
    display: 'flex',
    flexDirection: 'row',
  },
  BaseLayout__Sidebar: {
    background: 'white',
    width: 300,
    minHeight: '100vh',
  },
  BaseLayout__Page: {
    flex: 1,
  },
  BaseLayout__Footer: {},
});

export const BaseLayout: React.FC<React.PropsWithChildren<BaseLayoutProps>> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.BaseLayout}>
      <div className={styles.BaseLayout__Body}>
        <div className={styles.BaseLayout__Sidebar}>
          <div className={styles.BaseLayout__UnderHeader}/>
          {props.sidebar}
        </div>
        <div className={styles.BaseLayout__Page}>
          <div className={styles.BaseLayout__UnderHeader}/>
          {props.children}
          <div className={styles.BaseLayout__Footer}>
            <BaseContainer>
              FOOTER
            </BaseContainer>
          </div>
        </div>
      </div>
      <div className={styles.BaseLayout__Header}>
        {props.header}
      </div>
    </div>
  );
};
