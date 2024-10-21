import React from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '##/store/hooks';
import { contro_UI_Actions } from "##/store/slices/contro_UI_Slice";

import { NavMenu } from "##/components/AppNavigation";
import { ButtonTypeOne as MenuButton } from "##/components/global/buttons/ButtonTypeOne";
import styles from "./index.module.scss";

export const AppLayout:React.FC = () => {


  const isHidden = useAppSelector((state) => state.contro_UI.isHideMenu);

  const dispatch = useAppDispatch();
  

  function setIsHidenNavMenu(){
    dispatch(contro_UI_Actions.toggleHideMenu())
  }

  
  return (
    <>
      <NavMenu outerPositionClass={styles.navMenuOuter}/>
      {
        isHidden
          &&
        <MenuButton outerPositionClass={styles.menuButton} text={'Menu'} func={setIsHidenNavMenu}/>
      }
      <Outlet/>
    </>
  );
}