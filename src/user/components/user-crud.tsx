import React from 'react';
import { IconButton } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
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
  RxjsDataGridCrudIndexList
} from '~/1st-react-rxjs-crud';
import { AppContainer, AppLayout } from '~/app';
import { useUserService } from '../di';

const crudIndexListColumns = [
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
    field: 'password',
    headerName: 'Password',
    flex: 1,
  },
];

const crudEditFormFields: Array<RxjsCrudEditFormField> = [
  {
    name: 'name',
    title: 'Name',
  },
  {
    name: 'password',
    title: 'Password',
  },
];

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
                <div>FILTERS</div>
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
