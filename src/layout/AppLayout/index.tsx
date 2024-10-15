import React, { useRef, useLayoutEffect, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '##/store/hooks';
import { contro_UI_Actions } from "##/store/slices/contro_UI_Slice";
import { createWallPaper } from '##/components/engines/wallPaper/index';
import { NavMenu } from "##/components/AppNavigation";
import { ButtonTypeOne as MenuButton } from "##/components/global/buttons/ButtonTypeOne";
import styles from "./index.module.scss";

export const AppLayout = () => {
  const wallPaperRef = useRef<HTMLCanvasElement>(null);
  const colorTheme = useAppSelector((state) => state.test.colorTheme);
  const isHidden = useAppSelector((state) => state.contro_UI.isHideMenu);
  const colorThemeRef = useRef(colorTheme);
  const dispatch = useAppDispatch();
  

  function setIsHidenNavMenu(){
    dispatch(contro_UI_Actions.toggleHideMenu())
  }

  useEffect(()=>{
    colorThemeRef.current = colorTheme;
  }, [colorTheme])

  // useLayoutEffect (()=> { 
  //   if( !wallPaperRef.current ) return;
  //   createWallPaper(wallPaperRef.current, colorThemeRef);
  //   return () => {
  //         //@ts-ignore
  //     createWallPaper.stop = true
  //   }  
  // }, []); // * repair it later
  
  return (
    <>
      <NavMenu outerPositionClass={styles.navMenuOuter}/>
      {
        isHidden
          &&
        <MenuButton outerPositionClass={styles.menuButton} text={'Menu'} func={setIsHidenNavMenu}/>
      }
      <canvas ref={wallPaperRef} className={styles.wallPaper}></canvas>
    </>
  );
}