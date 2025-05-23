import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import toast, { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import Dashboard from './pages/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import OpenRoute from "./components/OpenRoute.jsx"
import EducationalInfo_Form from './components/Form_EducationalInfo.jsx';
import ProjectsInfo_Form from './components/Form_ProjectsInfo.jsx';
import PersonalInfo_Form from './components/Form_Personal.jsx';
import Layout from './layout.jsx';

const route = createBrowserRouter([
  { path: "/", element: <OpenRoute> <App /> </OpenRoute> },
  { path: "/dashboard", element: <PrivateRoute> <Dashboard /> </PrivateRoute> },
  {
    path: "form", element: <PrivateRoute><Layout /></PrivateRoute>, children: [
      { path: "personal_information", element: <PersonalInfo_Form /> },
      { path: "education_information", element: <EducationalInfo_Form /> },
      { path: "project_information", element: <ProjectsInfo_Form /> },
    ]
  }
  // {
  //   path: "/dashboard", element: <PrivateRoute> <Dashboard /></PrivateRoute>, children: [
  //     {
  //       path: "", element: <Outlet />, children: [
  //         { path: "form-personal_information", element: <PersonalInfo_Form /> },
  //         { path: "form-education_information", element: <EducationalInfo_Form /> },
  //         { path: "form-project_information", element: <ProjectsInfo_Form /> },
  //       ]
  //     }
  //   ]
  // }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toaster position="top-center" />
    <RouterProvider router={route}>

    </RouterProvider>,
  </Provider>
)
