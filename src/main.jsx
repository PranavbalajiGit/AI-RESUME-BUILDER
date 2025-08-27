import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";



import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx';
import DashBoard from './dashboard/index.jsx'

const router = createBrowserRouter(
  [
  {
    element : <App/> ,
    children : [
      {
        path : '/',
        element : <Home/>
      }, 
      {
        path :'/dashboard' ,
        element : <DashBoard />
      }
    ]
  } , 
  {
    path : '/auth/sign-in',
    element : <SignInPage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
