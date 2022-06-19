import React from 'react';
import {
  Crud,
  CrudCreate,
  CrudEdit,
  CrudIndex,
} from '~/1st-react-crud';
import { RxjsDataGridCrudIndexList } from '~/1st-react-rxjs-crud';
import { AppContainer, AppLayout } from '~/app';
import { useSessionPanelService } from '../di';

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
            <CrudEdit
              title={'Session Edit'}
              crudService={sessionPanelService}
            />
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
