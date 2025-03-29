import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "sonner"







// App.jsx ma routers hai 

// for example /          ->home route
//             /login     -> login route
//             /signup    -> signup route												
const appRouter = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/login", element: <Login/> },
  { path: "/signup", element: <Signup/> }
]);

function App() {
  return (
    <div>
      
    
     {/* adding a react provider from react router dom */}
    <RouterProvider router={appRouter} /> 
    <Toaster />
    </div>
  )
}

export default App

