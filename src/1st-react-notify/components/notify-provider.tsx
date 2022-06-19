import React from 'react';
import { createUseStyles } from 'react-jss';
import { Alert, AlertTitle } from '@mui/material';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { useNotifyService } from '../di';

const useStyles = createUseStyles({
  NotifyProvider: {
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
  },
  NotifyProvider__List: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  NotifyProvider__ListItem: {
    pointerEvents: 'auto',
    padding: '0 20px 20px 20px',
  },
});

export const NotifyProvider: React.FC<React.PropsWithChildren> = (props) => {
  const notifyService = useNotifyService();
  const list = useBehaviorSubject(notifyService.list$);
  const styles = useStyles();

  return (
    <>
      {props.children}
      <div className={styles.NotifyProvider}>
        <ul className={styles.NotifyProvider__List}>
          {list.map((id) => (
            <li
              className={styles.NotifyProvider__ListItem}
              key={id}
            >
              <Alert
                severity={notifyService.get(id).type}
                onClose={() => notifyService.remove(id)}
              >
                {notifyService.get(id).title && (
                  <AlertTitle>
                    {notifyService.get(id).title}
                  </AlertTitle>
                )}
                {notifyService.get(id).body && (
                  <>
                    {notifyService.get(id).body}
                  </>
                )}
              </Alert>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
