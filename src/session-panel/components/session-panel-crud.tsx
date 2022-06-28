import React from 'react';
import { IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import CachedIcon from '@mui/icons-material/Cached';
import { dateFormatHuman } from '~/1st-core';
import {
  Crud,
  CrudCreate,
  CrudEditPage,
  CrudIndex,
} from '~/1st-react-crud';
import {
  RxjsCrudEdit,
  RxjsCrudEditForm,
  RxjsCrudEditFormField,
  RxjsDataGridCrudIndexList,
} from '~/1st-react-rxjs-crud';
import { Session } from '~/api';
import { AppContainer, AppLayout } from '~/app';
import { useSessionPanelService } from '../di';

const crudIndexListColumns: Array<GridColDef<Session>> = [
  // {
  //   field: 'id',
  //   headerName: '#',
  //   flex: 1,
  // },
  {
    field: 'token',
    headerName: 'Token',
    flex: 1,
  },
  {
    field: 'userId',
    headerName: 'User ID',
    flex: 1,
  },
  {
    field: 'ip',
    headerName: 'IP',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    flex: 1,
    valueGetter: (params) => dateFormatHuman(params.value),
  },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    flex: 1,
    valueGetter: (params) => dateFormatHuman(params.value),
  },
];

const crudEditFormFields: Array<RxjsCrudEditFormField> = [
  {
    name: 'token',
    title: 'Token',
  },
  {
    name: 'ip',
    title: 'IP',
  },
  {
    name: 'userId',
    title: 'User ID',
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
                  <RxjsCrudEditForm
                    fields={crudEditFormFields}
                    rxjsCrudService={sessionPanelService}
                    asyncData={asyncData}
                  />
                </CrudEditPage>
              )}
            </RxjsCrudEdit>
          )}
          create={(
            <CrudCreate
              title={'Session Create'}
            >
              <RxjsCrudEditForm
                fields={crudEditFormFields}
                rxjsCrudService={sessionPanelService}
              />
            </CrudCreate>
          )}
        />
      </AppContainer>
    </AppLayout>
  );
};
