import React, { useState } from "react";
import styles from "./index.module.scss";
import {ReactComponent as Sun}  from "##/assets/svg/sun.svg";
import {ReactComponent as Moon}  from "##/assets/svg/moon.svg";


interface ChildProps {
  outerPositionClass: string,
}

export const ButtonCheckOutTheme: React.FC<ChildProps> = ({outerPositionClass}) => {
  const [position, setPosition] = useState<boolean>(true)

  return (
    <div className={outerPositionClass}> 
      <div className={styles.container}
        onClick={(e)=> {
          setPosition((prew)=> !prew);
        }}
      >
        <div className={ position? styles.pointer: [styles.pointer, styles.pointerRight].join(' ')}></div>
        <Sun className={styles.sun}/>
        <Moon className={styles.moon}/>
      </div>
    </div>
  );
}