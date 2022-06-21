import React from 'react';
import { IconButton } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import {
  Crud,
  CrudCreate,
  CrudEditPage,
  CrudIndex,
} from '~/1st-react-crud';
import { RxjsCrudEdit, RxjsDataGridCrudIndexList } from '~/1st-react-rxjs-crud';
import { AppContainer, AppLayout } from '~/app';
import { useSessionPanelService } from '../di';
import { SessionPanelEditForm } from './session-panel-edit-form';

const crudIndexListColumns = [
  {
    field: 'id',
    headerName: '#',
    flex: 1,
  },
  {
    field: 'token',
    headerName: 'Token',
    flex: 1,
  },
  {
    field: 'ip',
    headerName: 'ip',
    flex: 1,
  },
  {
    field: 'userId',
    headerName: 'User ID',
    flex: 1,
  },
];

export const SessionPanelCrud: React.FC = () => {
  const sessionPanelService = useSessionPanelService();

  return (
    <AppLayout>
      <AppContainer>
        <Crud
          index={(
            <CrudIndex
              title={'Sessions'}
              afterTitle={(
                <IconButton onClick={() => sessionPanelService.refresh()}>
                  <CachedIcon/>
                </IconButton>
              )}
              filters={(
                <div>FILTERS</div>
              )}
              list={(
                <RxjsDataGridCrudIndexList
                  columns={crudIndexListColumns}
                  crudService={sessionPanelService}
                />
              )}
            />
          )}
          edit={(
            <RxjsCrudEdit
              rxjsCrudService={sessionPanelService}
            >
              {(asyncData) => (
                <CrudEditPage
                  title={'Session Edit'}
                  asyncData={asyncData}
                >
                  <SessionPanelEditForm
                    asyncData={asyncData}
                  />
                </CrudEditPage>
              )}
            </RxjsCrudEdit>
          )}
          create={(
            <CrudCreate
              title={'Session Create'}
              crudService={sessionPanelService}
            />
          )}
        />
      </AppContainer>
    </AppLayout>
  );
};
