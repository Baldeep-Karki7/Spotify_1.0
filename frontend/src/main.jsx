import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider,useParams} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Profile from '../pages/Profile/Profile.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>
  },
  {
    path : '/profile/:token',
    element : <Profile/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
