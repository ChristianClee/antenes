import React, { useEffect, useRef }from "react";
import styles from "./index.module.scss";
import { useAppSelector, useAppDispatch } from '##/store/hooks';
import { contro_UI_Actions } from "##/store/slices/contro_UI_Slice"
import { ButtonTypeOne as ButtonCloseMenu} from "##/components/global/buttons/ButtonTypeOne";
import { ButtonTypeTwo as ButtonCloseMenuLittle } from "##/components/global/buttons/ButtonTypeTwo";

interface ChildProps {
  outerPositionClass: string,
}


export const NavMenu: React.FC<ChildProps> = ({outerPositionClass}) => {
  const isHideMenu = useAppSelector((state) => state.contro_UI.isHideMenu);
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimationEndRef = useRef<Boolean>(true);
 
  function closeWrapper(){
    if(!containerRef.current) return;
      containerRef.current.classList.remove(styles.openContainer)
    setTimeout(()=> {
      if(!wrapperRef.current ) return;
      wrapperRef.current.style.display = 'none'
    } ,350)
  };

  function openWrapper(){
    if(!wrapperRef.current) return;
    wrapperRef.current.style.display = 'block';
    setTimeout(()=> {
      if(!containerRef.current) return;
      containerRef.current.classList.add(styles.openContainer)
    } ,350)
  };
  
  function getHideMenu(){
    if(!isAnimationEndRef.current) return 
    dispatch(contro_UI_Actions.getHideMenu())
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
        if(e.currentTarget === e.target ){ getHideMenu() }
      }} 
    >
      <div
        className={ styles.container }
        ref={ containerRef }
      >
        <ButtonCloseMenu 
          outerPositionClass={styles.closeBtn}
          func={ getHideMenu }
          text="Close"
        />
        <ButtonCloseMenuLittle
          outerPositionClass={styles.closeLittleBtn}
          func={ getHideMenu }
        />
      </div>
    </div>
  );
}