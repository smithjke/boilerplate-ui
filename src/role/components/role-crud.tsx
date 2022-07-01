import React from 'react';
import { IconButton } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { GridColDef } from '@mui/x-data-grid';
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
import { Role } from '~/api';
import { AppContainer, AppLayout } from '~/app';
import { useRoleService } from '../di';

const crudIndexListColumns: Array<GridColDef<Role>> = [
  // {
  //   field: 'id',
  //   headerName: '#',
  //   flex: 1,
  // },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'permissions',
    headerName: 'Permissions',
    flex: 2,
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
    name: 'name',
    title: 'Name',
  },
  {
    name: 'permissions',
    title: 'Permissions',
  },
];

export const RoleCrud: React.FC = () => {
  const rxjsCrudService = useRoleService();

  return (
    <AppLayout>
      <AppContainer>
        <Crud
          index={(
            <CrudIndex
              title={'Roles'}
              afterTitle={(
                <IconButton onClick={() => rxjsCrudService.refresh()}>
                  <CachedIcon/>
                </IconButton>
              )}
              filters={(
                <div>FILTERS</div>
              )}
              list={(
                <RxjsDataGridCrudIndexList
                  columns={crudIndexListColumns}
                  crudService={rxjsCrudService}
                />
              )}
            />
          )}
          edit={(
            <RxjsCrudEdit
              rxjsCrudService={rxjsCrudService}
            >
              {(asyncData) => (
                <CrudEditPage
                  title={'Roles Edit'}
                  asyncData={asyncData}
                >
                  <RxjsCrudEditForm
                    fields={crudEditFormFields}
                    asyncData={asyncData}
                    rxjsCrudService={rxjsCrudService}
                  />
                </CrudEditPage>
              )}
            </RxjsCrudEdit>
          )}
          create={(
            <CrudCreate
              title={'Roles Create'}
            >
              <RxjsCrudEditForm
                fields={crudEditFormFields}
                rxjsCrudService={rxjsCrudService}
              />
            </CrudCreate>
          )}
        />
      </AppContainer>
    </AppLayout>
  );
};
