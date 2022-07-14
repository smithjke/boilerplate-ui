import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { useNotifyService } from '../di';

const Wrapper = styled('div')({
  pointerEvents: 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: 300,
});

const List = styled('ul')({
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
});

const ListItem = styled('li')({
  pointerEvents: 'auto',
  padding: '0 20px 20px 20px',
});

export const NotifyProvider: React.FC<React.PropsWithChildren> = (props) => {
  const notifyService = useNotifyService();
  const list = useBehaviorSubject(notifyService.list$);

  return (
    <>
      {props.children}
      <Wrapper>
        <List>
          {list.map((id) => (
            <ListItem key={id}>
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
            </ListItem>
          ))}
        </List>
      </Wrapper>
    </>
  );
};
