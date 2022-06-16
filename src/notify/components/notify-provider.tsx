import React from 'react';
import { createUseStyles } from 'react-jss';
import { Typography } from '@mui/material';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { NotifyService } from '../services';
import { Notify } from '../common';
import { NotifyItem } from './notify-item';

export type NotifyProviderProps = {
  notifyService: NotifyService;
};

const useStyles = createUseStyles({
  NotifyProvider: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    padding: '0 20px 30px 0',
  },
  NotifyProvider__List: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  NotifyProvider__ListItem: {
    marginTop: 20,
    width: 320,
  },
});

const renderData = (data: Notify['data']) => {
  if (Array.isArray(data) ?? data.length) {
    return (data as Array<string>).map((row: string) => (
      <Typography key={row}>
        {row}
      </Typography>
    ));
  }

  if (typeof data === 'string') {
    return (
      <Typography>
        {data}
      </Typography>
    );
  }

  return null;
};

export const NotifyProvider: React.FC<React.PropsWithChildren<NotifyProviderProps>> = (props) => {
  const list = useBehaviorSubject(props.notifyService.list$);
  const styles = useStyles();

  return (
    <>
      {props.children}
      <div className={styles.NotifyProvider}>
        <ul className={styles.NotifyProvider__List}>
          {list.map((notify) => (
            <li
              className={styles.NotifyProvider__ListItem}
              key={notify.id}
            >
              <NotifyItem
                type={notify.type}
                onCloseClick={() => props.notifyService.remove(notify.id)}
              >
                {renderData(notify.data)}
              </NotifyItem>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
