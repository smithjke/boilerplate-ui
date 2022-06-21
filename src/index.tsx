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
import { SessionPanelCrud, SessionPanelService } from '~/session-panel';

registerDependency('STORAGE_REPOSITORY', () => new LocalStorageRepository());
registerDependency('NOTIFY_SERVICE', () => new NotifyService());
registerDependency('SESSION_SERVICE', () => new AppSessionService());

registerDependency('USER_SERVICE', () => new UserService());
registerDependency('SESSION_PANEL_SERVICE', () => new SessionPanelService());

const container = document.getElementById('root');
const root = createRoot(container);

root.render((
  <App>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/user'} replace/>}/>
        <Route path={'/user/*'} element={<UserCrud/>}/>
        <Route path={'/session/*'} element={<SessionPanelCrud/>}/>
        <Route path={'*'} element={<>404</>}/>
      </Routes>
    </BrowserRouter>
  </App>
));
