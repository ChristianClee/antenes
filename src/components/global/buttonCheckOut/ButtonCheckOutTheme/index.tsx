import React from "react";
import styles from "./index.module.scss";
import {ReactComponent as Sun}  from "##/assets/svg/sun.svg";
import {ReactComponent as Moon}  from "##/assets/svg/moon.svg";


interface ChildProps {
  outerPositionClass: string;
  status: boolean;
  toggleFunc: ()=> void;
}

export const ButtonCheckOutTheme: React.FC<ChildProps> = ({outerPositionClass, status, toggleFunc}) => {


  return (
    <div className={outerPositionClass}> 
      <div className={styles.container} onClick={toggleFunc}>
        <div className={ status? [styles.pointer, styles.pointerRight].join(' ') : styles.pointer}></div>
        <Sun className={styles.sun}/>
        <Moon className={styles.moon}/>
      </div>
    </div>
  );
}