import React from "react";
import styles from "./index.module.scss";

interface ChildProps {
  outerPositionClass: string;
}

export const RfValues: React.FC<ChildProps> = ({outerPositionClass}) => {
  return (
    <div className={outerPositionClass}>
      <div className={styles.container}>
        RfValues hello !!!
      </div>
    </div>
  );
}