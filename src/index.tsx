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
import { RoleCrud, RoleService } from '~/role';
import { SessionPanelCrud, SessionPanelService } from '~/session-panel';
import { UserCrud, UserService } from '~/user';

registerDependency('STORAGE_REPOSITORY', () => new LocalStorageRepository());
registerDependency('NOTIFY_SERVICE', () => new NotifyService());
registerDependency('SESSION_SERVICE', () => new AppSessionService());

registerDependency('ROLE_SERVICE', () => new RoleService());
registerDependency('SESSION_PANEL_SERVICE', () => new SessionPanelService());
registerDependency('USER_SERVICE', () => new UserService());

const container = document.getElementById('root');
const root = createRoot(container);

root.render((
  <App>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/user'} replace/>}/>
        <Route path={'/session/*'} element={<SessionPanelCrud/>}/>
        <Route path={'/role/*'} element={<RoleCrud/>}/>
        <Route path={'/user/*'} element={<UserCrud/>}/>
        <Route path={'*'} element={<>404</>}/>
      </Routes>
    </BrowserRouter>
  </App>
));
