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
import { useUserService } from '../di';

const userCrudIndexListColumns = [
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
                  columns={userCrudIndexListColumns}
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
                  <div>
                    USER FORM: {JSON.stringify(asyncData.data)}
                  </div>
                </CrudEditPage>
              )}
            </RxjsCrudEdit>
          )}
          create={(
            <CrudCreate
              title={'Users Create'}
              crudService={userService}
            />
          )}
        />
      </AppContainer>
    </AppLayout>
  );
};
