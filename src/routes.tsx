import { lazy } from 'react';

const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const Account = lazy(() => import('./pages/account'));
const Error = lazy(() => import('./pages/error'));

const routes = [
  {
    path: '*',
    element: <Error />,
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
    path: '/account',
    element: <Account />,
  },
];

export default routes;
