import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { registerDependency } from '~/1st-di';
import { LocalStorageRepository } from '~/1st-core';
import { NotifyService } from '~/1st-react-notify';
import { App, AppSessionService } from '~/app';
import { UserCrud, UserService } from '~/user';

registerDependency('STORAGE_REPOSITORY', () => new LocalStorageRepository());
registerDependency('NOTIFY_SERVICE', () => new NotifyService());
registerDependency('USER_SERVICE', () => new UserService());
registerDependency('SESSION_SERVICE', () => new AppSessionService());

const container = document.getElementById('root');
const root = createRoot(container);

root.render((
  <App>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/users'} replace/>}/>
        <Route path={'/users/*'} element={<UserCrud/>}/>
      </Routes>
    </BrowserRouter>
  </App>
));
