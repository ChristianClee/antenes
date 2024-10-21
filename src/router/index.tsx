import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { getRouter } from './router';
import { useAppSelector } from "##/store/hooks";


export const Navigate = () => {
  const isHideMenu = useAppSelector((state) => state.contro_UI.isHideMenu); 
  return(
    <RouterProvider router={getRouter(isHideMenu)}/>
  )
}