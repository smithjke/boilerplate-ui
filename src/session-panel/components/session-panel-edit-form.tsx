import React from 'react';
import { Button } from '@mui/material';
import { AsyncData, randomInt } from '~/1st-core';
import { Session } from '~/api';
import { useSessionPanelService } from '~/session-panel';

export type SessionPanelEditFormProps = {
  asyncData: AsyncData<Session>;
};

export const SessionPanelEditForm: React.FC<SessionPanelEditFormProps> = (props) => {
  const sessionPanelService = useSessionPanelService();

  const save = (data: Session) => {
    if (data.id) {
      const ip = `0.0.0.${randomInt(1, 255)}`;
      console.log('NEW IP >>>', ip);
      sessionPanelService.cachedUpdate({ ip }, data.id)
        .then((result) => console.log('SessionPanelEditForm save result >>>', result))
        .catch((error) => console.log('SessionPanelEditForm save error >>>', error));
    } else {
      // sessionPanelService.cachedCreate(data);
    }
  };

  return (
    <div>
      {props.asyncData.loading && (
        <>
          FORM LOADING
        </>
      )}
      {!props.asyncData.loading && props.asyncData.data && (
        <>
          FORM: {JSON.stringify(props.asyncData.data)}
          <Button
            onClick={() => save(props.asyncData.data)}
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
};
