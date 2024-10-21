import React, { useEffect, useRef }from "react";
import { useAppSelector, useAppDispatch } from '##/store/hooks';
import { contro_UI_Actions } from "##/store/slices/contro_UI_Slice"
import { ButtonTypeOne as ButtonCloseMenu} from "##/components/global/buttons/ButtonTypeOne";
import { ButtonTypeTwo as ButtonCloseMenuLittle } from "##/components/global/buttons/ButtonTypeTwo";
import { timeVarables } from "##/varables/varables";
import { ReactComponent as CompanyLogo } from "##/assets/svg/Logo ZVZ.svg";
import { ReactComponent as CompanyLogoDarkTheme } from "##/assets/svg/Logo ZVZ.white.svg";
import { NavigateContent } from "##/components/AppNavigation/NavigateContent";
import styles from "./index.module.scss";
// testing imports
import {ReactComponent as VectorOne} from "##/assets/svg/icons/VectorOne.svg"
import {ReactComponent as VectorTwo} from "##/assets/svg/icons/VectorTwo.svg"
import {ReactComponent as VectorThree} from "##/assets/svg/icons/VectorThree.svg"

import{ReactComponent as SubVectorOne} from "##/assets/svg/icons/subVectorOne.svg";
import{ReactComponent as SubVectorTwo} from "##/assets/svg/icons/subVectorTwo.svg";
import{ReactComponent as SubVectorThree} from "##/assets/svg/icons/subVectorthree.svg";
import{ReactComponent as SubVectorFour} from "##/assets/svg/icons/subVectorFour.svg";
import{ReactComponent as SubVectorFive} from "##/assets/svg/icons/subVectorFive.svg";

interface ChildProps {
  outerPositionClass: string,
}


export const NavMenu: React.FC<ChildProps> = ({outerPositionClass}) => {
  const isHideMenu = useAppSelector((state) => state.contro_UI.isHideMenu);
  const colorTheme = useAppSelector((state) => state.test.colorTheme);
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimationEndRef = useRef<Boolean>(true);
  const options = [
    {
      name: "Device",
      icon: VectorOne,
      path: 'device',
      options: [
        {
          name: "Coverage Aria",
          icon: SubVectorOne,
          path: '/coverage_aria',
        },
        {
          name: "Rf Values",
          icon: SubVectorTwo,
          path: '/rf_values',
        },
        {
          name: "Configuration values",
          icon: SubVectorThree,
          path: '/configuration_values',
        },
        {
          name: "Log Files",
          icon: SubVectorFour,
          path: '/log_files',
        },
        {
          name: "Network settings",
          icon: SubVectorFive,
          path: '/network_settings',
        }
      ]
    },
    {
      name: "Home",
      icon: VectorTwo,
      path: '/',
      options: [],
    },
    {
      name: "Contacts",
      icon: VectorThree,
      path: '/contacts',
      options: [],
    },
]
 
  function closeWrapper(){
    if(!containerRef.current) return;
      containerRef.current.classList.remove(styles.openContainer)
    setTimeout(()=> {
      if(!wrapperRef.current ) return;
      wrapperRef.current.style.display = 'none'
    } , timeVarables.deley)
  };

  function openWrapper(){
    if(!wrapperRef.current) return;
    wrapperRef.current.style.display = 'block';
    setTimeout(()=> {
      if(!containerRef.current) return;
      containerRef.current.classList.add(styles.openContainer)
    } , timeVarables.deley)
  };
  
  function setHideMenu(){
    if(!isAnimationEndRef.current) return 
    dispatch(contro_UI_Actions.setHideMenu())
  }

  useEffect(()=>{
    if(!wrapperRef.current) return;
    if(isHideMenu){
      closeWrapper();
    }else{
      openWrapper();
      isAnimationEndRef.current = false;
      setTimeout(()=> isAnimationEndRef.current = true, 1000)
    }
  },[isHideMenu]);



  return (
    <div
      className={outerPositionClass}
      ref={ wrapperRef }
      onClick={(e)=>{
        if(e.currentTarget === e.target ){ setHideMenu() }
      }} 
    >
      <div
        className={ styles.container }
        ref={ containerRef }
      >
        <ButtonCloseMenu 
          outerPositionClass={styles.closeBtn}
          func={ setHideMenu }
          text="Close"
        />
        <ButtonCloseMenuLittle
          outerPositionClass={styles.closeLittleBtn}
          func={ setHideMenu }
        />
        {
          colorTheme ?
            <CompanyLogoDarkTheme
              className={styles.logo}
            />
          :
            <CompanyLogo 
              className={styles.logo}
            />
        }
        <NavigateContent outerPositionClass={styles.navigateContent} options={options}/>
      </div>
    </div>
  );
}