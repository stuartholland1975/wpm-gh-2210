/** @format */

import {useRoutes} from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import NavigationDrawer from './components/navigation/NavigationDrawer';
import ProjectProcessingRoutes from './components/projects/project-processing/ProjectProcessingRoutes';
import ProjectHeaders from './components/projects/ProjectHeaders';
import ComponentTests from './test-components/ComponentTests';
import Dashboard from './components/dashboard/Dashboard';
import AdminRoutes from './components/admin/AdminRoutes';
import Applications from "./components/applications/Applications";

function App() {
  return useRoutes([
    {
      path: '/',
      element: <NavigationDrawer/>,
      children: [
        {
          index: true,
          element: <Home/>,
        },
        {
          element: <ProjectHeaders/>,
          path: 'projects',
          exact: true,
        },
        {
          element: <AdminRoutes/>,
          path: 'admin/*',
        },
        {
          element: <ProjectProcessingRoutes/>,
          path: 'projects/processing/:id/*',
        },
        {
          element: <Dashboard/>,
          path: 'dashboard',
        },
        {
          element: <ComponentTests/>,
          path: 'testing',
        },
        {
          element: <Applications/>,
          path: 'applications'
        }
      ],
    },
  ])
}

export default App;
