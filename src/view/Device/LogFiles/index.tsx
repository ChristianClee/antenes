import React from "react";
import styles from "./index.module.scss";

interface ChildProps {
  outerPositionClass: string;
}

export const LogFiles: React.FC<ChildProps> = ({outerPositionClass}) => {
  return (
    <div className={outerPositionClass}>
      <div className={styles.container}>
        LogFiles hello !!!
      </div>
    </div>
  );
}