import React from "react";
import styles from "./index.module.scss";
import { Outlet } from "react-router-dom";

interface ChildProps {
  outerPositionClass: string;
}

export const Device: React.FC<ChildProps> = ({outerPositionClass}) => {
  return (
    <div className={outerPositionClass}>
      <div className={styles.container}>
        <div className={styles.title}>
          hello from Device!!!!
        </div>
        <Outlet />
      </div>
    </div>
  );
}