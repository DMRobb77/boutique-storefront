import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './normalize.css';
import './index.css';
import App from './App.jsx';
import Store from './components/Store/Store.jsx';
import Root from './routes/root.jsx';
import Checkout from './components/Checkout/Checkout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'store',
        element: <Store />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
