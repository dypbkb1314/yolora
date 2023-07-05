import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  // createBrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import AuthProvider from './AuthProvider';
import { Provider as MobxProvider } from 'mobx-react';
// import { RootStore } from './store';

import './index.css';
import routes from './routes';
import reportWebVitals from './reportWebVitals';

import RootStore from './mobx/index';
import UserStore from './mobx/user';


const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <MobxProvider RootStore={RootStore} UserStore={UserStore}>
      <React.Suspense fallback={<>loading...</>}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </React.Suspense>
    </MobxProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
