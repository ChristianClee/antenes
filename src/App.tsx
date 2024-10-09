import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createWallPaper } from '##/components/engines/wallPaper/index';
import { Navigate } from '##/view/Navigate';
import { ButtonCheckOutTheme } from '##/components/global/buttonCheckOut/ButtonCheckOutTheme';
import imagePath from '##/assets/svg/wallPaper_zvz.svg';
import './App.scss';

import { useAppDispatch, useAppSelector } from '##/store/hooks';
import { testActions } from '##/store/slices/testSlice';

import styles from './testStyle.module.scss';

function App() {
  // initial hooks ====================
  const wallPaperRef = useRef<HTMLCanvasElement>(null);
  const isStartWallPaper = useRef<boolean>(true);
  // initial redux data ===============
  const { setColorThemeInLocalStore } = testActions;
  const colorTheme = useAppSelector((state) => state.test.colorTheme);
  
  const dispatch = useAppDispatch()
  // prepare functions ================

  function isDarkTheme():boolean{
    return Boolean(colorTheme);
  };
  function toggleColorTheme(){
    // const darkTheme = 'dark-theme';
    // const theme = localStorage.getItem('theme');
    // if(theme){
    //   localStorage.setItem('theme', '');
    //   document.body.classList.remove(darkTheme);
    // }else{
    //   localStorage.setItem('theme', darkTheme);
    //   document.body.classList.add(darkTheme);
    // }
    
    dispatch(setColorThemeInLocalStore())
    
  };
  function setCollorTheme(){
    if(isDarkTheme()){
      document.body.classList.add("dark-theme");
    }else{
      document.body.classList.remove("dark-theme");
    }
  };

  useLayoutEffect (()=> {
    if(wallPaperRef.current){
      createWallPaper(wallPaperRef.current, imagePath, isStartWallPaper);
    }
  }, []);
  useEffect(()=> {
    setCollorTheme();
  },[colorTheme]);
       
    

  return (
    <div className="App" id='App'>
      <ButtonCheckOutTheme outerPositionClass={styles.ButtonCheckOutTheme} toggleFunc={toggleColorTheme} status={isDarkTheme()} />
      <header>header</header>
      <main>main</main>
      <footer>footer</footer>
      <Navigate/>
      {/* <button style={{position:'relative', zIndex: 2}}onClick={toggleColorTheme}> change theme</button> */}
      <canvas ref={wallPaperRef} className='wallPaper'></canvas>
    </div>
  );
}

export default App;
