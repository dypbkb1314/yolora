import { lazy } from 'react';

import RequiredAuth from './Protected';

const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const Account = lazy(() => import('./pages/account'));
const Error = lazy(() => import('./pages/error'));
const Login = lazy(() => import('./pages/login'));
const Three = lazy(() => import('./pages/three'));
const List = lazy(() => import('./pages/list'));
const Gsap = lazy(() => import('./pages/gsap'));
const WaterFall = lazy(() => import('./pages/waterfall/index'));
const Vitrual = lazy(() => import('./pages/vitrual/water_fall'));

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
    path: '/list',
    element: <List />,
  },
  {
    path: '/gsap',
    element: <Gsap />,
  },
  {
    path: '/waterfall',
    element: <WaterFall />,
  },
  {
    path: '/vitrual',
    element: <Vitrual />,
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
