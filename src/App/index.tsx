import React, { useEffect } from 'react';
import { Navigate } from '##/router';
import { ButtonCheckOutTheme } from '##/components/global/buttonCheckOut/ButtonCheckOutTheme';
import { useAppDispatch, useAppSelector } from '##/store/hooks';
import { testActions } from '##/store/slices/testSlice';
import styles from './index.module.scss';

export const App = () => {
  const { setColorThemeInLocalStore } = testActions;
  const colorTheme = useAppSelector((state) => state.test.colorTheme);  
  const dispatch = useAppDispatch()

  function isDarkTheme():boolean{
    return Boolean(colorTheme);
  };
  function toggleColorTheme(){
    dispatch(setColorThemeInLocalStore())
  };
  function setCollorTheme(){
    if(isDarkTheme()){
      document.body.classList.add("dark-theme");
    }else{
      document.body.classList.remove("dark-theme");
    }
  };

  useEffect(()=> {
    setCollorTheme();
  },[colorTheme]);
       
    

  return (
    <div className={styles.App} id='App'>
      <ButtonCheckOutTheme outerPositionClass={styles.ButtonCheckOutTheme} toggleFunc={toggleColorTheme} status={isDarkTheme()} />
      <Navigate/>
    </div>
  );
}


