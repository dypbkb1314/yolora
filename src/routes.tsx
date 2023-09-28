import { lazy } from 'react';

import RequiredAuth from './Protected';

const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const Account = lazy(() => import('./pages/account'));
const Error = lazy(() => import('./pages/error'));
const Login = lazy(() => import('./pages/login'));
const Three = lazy(() => import('./pages/three'));

const routes = [
  {
    path: '*',
    element: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/three',
    element: <Three />,
  },
  {
    path: '/account',
    element: (
      <RequiredAuth>
        <Account />
      </RequiredAuth>
    ),
  },
];

export default routes;
