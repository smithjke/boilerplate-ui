import React from 'react';
import { createUseStyles } from 'react-jss';
import { Alert, AlertTitle } from '@mui/material';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { useNotifyService } from '../di';

const useStyles = createUseStyles({
  NotifyProvider: {
    position: 'fixed',
    right: 0,
    top: 0,
    padding: '30px 30px 0 0',
  },
  NotifyProvider__List: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  NotifyProvider__ListItem: {
    marginBottom: 20,
    width: 320,
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