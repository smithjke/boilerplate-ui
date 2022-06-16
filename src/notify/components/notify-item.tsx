import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { NotifyType } from '../common';

const notifyAppearance: Record<NotifyType, { primary: string; secondary: string; icon: React.ReactNode; }> = {
  [NotifyType.SUCCESS]: {
    primary: '#DEF4E0',
    secondary: '#57D363',
    icon: <>@</>,
  },
  [NotifyType.FAIL]: {
    primary: '#FDE0E0',
    secondary: '#C03221',
    icon: <>@</>,

  },
};

export type NotifyItemProps = {
  onCloseClick?: () => void;
  type: NotifyType;
};

const useStyles = createUseStyles({
  NotifyItem: {
    overflow: 'hidden',
    lineHeight: '19px',
    padding: '25px 30px 25px 0',
    background: (props: NotifyItemProps) => notifyAppearance[props.type].primary,
    borderRadius: 10,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  NotifyItem__LeftSide: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: '10px 0 0 10px',
    width: '8px',
    background: (props: NotifyItemProps) => notifyAppearance[props.type].secondary,
  },
  NotifyItem__IconBox: {
    marginLeft: '20px',
  },
  NotifyItem__ChildrenBox: {
    marginLeft: '15px',
  },
  NotifyItem__CloseBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '10px',
    cursor: 'pointer',
  },
});

export const NotifyItem: React.FC<React.PropsWithChildren<NotifyItemProps>> = (props) => {
  const styles = useStyles(props);

  return (
    <div className={styles.NotifyItem}>
      <div className={styles.NotifyItem__LeftSide}/>
      <div className={styles.NotifyItem__IconBox}>
        {notifyAppearance[props.type].icon}
      </div>
      <div className={styles.NotifyItem__ChildrenBox}>
        {props.children}
      </div>
      {props.onCloseClick && (
        <div
          className={styles.NotifyItem__CloseBox}
          onClick={props.onCloseClick}
        >
          <CloseIcon sx={{ color: '#A3A3A3' }}/>
        </div>
      )}
    </div>
  );
};
