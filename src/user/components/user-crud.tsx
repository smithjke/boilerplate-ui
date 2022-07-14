import React, { useState } from 'react';
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
import { Role, User } from '~/api';
import { AppContainer, AppLayout } from '~/app';
import { useUserService } from '../di';

const crudIndexListColumns: Array<GridColDef<User>> = [
  {
    field: 'id',
    headerName: '#',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'roles',
    headerName: 'Role',
    flex: 1,
    valueGetter: (params) => params.value.map((role: Role) => role.name).join(', '),
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
    name: 'newPassword',
    title: 'New password',
    optional: true,
  },
];

const UserCrudFilters: React.FC = () => {
  const [counter, setCounter] = useState(1);
  const inc = () => setCounter(counter + 1);

  if (counter > 5) {
    throw new Error('Azazaz');
  }

  return (
    <div onClick={inc}>
      FILTERS KEK {counter}
    </div>
  );
};

export const UserCrud: React.FC = () => {
  const userService = useUserService();

  return (
    <AppLayout>
      <AppContainer>
        <Crud
          index={(
            <CrudIndex
              title={'Users'}
              afterTitle={(
                <IconButton onClick={() => userService.refresh()}>
                  <CachedIcon/>
                </IconButton>
              )}
              filters={(
                <div><UserCrudFilters/></div>
              )}
              list={(
                <RxjsDataGridCrudIndexList
                  columns={crudIndexListColumns}
                  crudService={userService}
                />
              )}
            />
          )}
          edit={(
            <RxjsCrudEdit
              rxjsCrudService={userService}
            >
              {(asyncData) => (
                <CrudEditPage
                  title={'Users Edit'}
                  asyncData={asyncData}
                >
                  <RxjsCrudEditForm
                    fields={crudEditFormFields}
                    asyncData={asyncData}
                    rxjsCrudService={userService}
                  />
                </CrudEditPage>
              )}
            </RxjsCrudEdit>
          )}
          create={(
            <CrudCreate
              title={'Users Create'}
            >
              <RxjsCrudEditForm
                fields={crudEditFormFields}
                rxjsCrudService={userService}
              />
            </CrudCreate>
          )}
        />
      </AppContainer>
    </AppLayout>
  );
};
