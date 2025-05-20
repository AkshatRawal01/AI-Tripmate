import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Api from "./create-trip/Api.jsx"
import Layout from './components/Layout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './my-trips/index.jsx';
//import api from './create-trip/api.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App/>,
      },
      {
        path:'/create-trip',
        element:<Api/>,
      },
      {
        path:'/view-trip/:tripId',
        element:<Viewtrip/>,
      },
      {
        path:'/my-trips',
        element:<MyTrips/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
