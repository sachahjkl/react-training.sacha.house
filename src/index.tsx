// import 'tailwindcss/tailwind.css'

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from 'router';

const container = document.getElementById('root') as HTMLDivElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
