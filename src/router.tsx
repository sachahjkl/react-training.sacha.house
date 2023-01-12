import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Error from 'pages/Error';
import Layout from 'pages/Layout';
import React from 'react';
import { route } from 'react-router-typesafe-routes/dom';

// Or /native
// import { createBrowserRouter } from 'react-router-dom';

export const routes = {
  home: route('', {}),
  todo: route('todo'),
  about: route('about'),
};

export type RoutesType = typeof routes;

const Index = React.lazy(() => import('pages/Index'));
const About = React.lazy(() => import('pages/About'));
const Todo = React.lazy(() => import('pages/Todo'));

export default createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<Error />} element={<Layout />}>
      <Route path={routes.home.path} element={<Index />} />
      <Route path={routes.todo.path} element={<Todo />} />
      <Route path={routes.about.path} element={<About />} />
    </Route>,
  ),
);
//   {
//     path: '/',
//     element: <Layout />,
//     index: true,
//     children: [
//       {

//       }
//     ]
//   },
//   {
//     path: '/todo',
//     element: <Todo />,
//   },
// ]);
