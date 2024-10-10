import { AppLayout } from '##/layout/AppLayout';
import { createBrowserRouter } from 'react-router-dom';
import { TestPageLayout } from '##/layout/TestPageLayout';

 
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
  {
    path: '/test',
    element: <TestPageLayout />,
  }
]);
