import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from '~/app';
import { UserCrud, UserService } from '~/user';
import { registerDependency } from '~/1st-di';

registerDependency('USER_SERVICE', () => new UserService());

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
