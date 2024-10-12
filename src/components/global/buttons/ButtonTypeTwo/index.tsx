import React from "react";
import styles from "./index.module.scss";

interface ChildProps {
  outerPositionClass: string;
  func: ()=> void;
}



export const ButtonTypeTwo: React.FC<ChildProps> = ({outerPositionClass, func}) => {
  const deley = 500;
  function animation(e: React.MouseEvent<HTMLDivElement, MouseEvent> ){
    const container = e.currentTarget
    container.classList.add(styles.clicked);
    setTimeout(() => { 
      container.classList.remove(styles.clicked);          
    }, deley);
  }
  function action(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
    animation(e);
    setTimeout(func,deley)
  }

  return (
    <div className={outerPositionClass}>
      <div 
        className={styles.container}
        onClick={action}
      >
        <span></span>
        <span></span>
      </div>
    </div>
  );
}