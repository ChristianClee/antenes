import React from "react";
import styles from "./index.module.scss";

interface ChildProps {
  outerPositionClass: string;
}

export const CoverageAria: React.FC<ChildProps> = ({outerPositionClass}) => {
  return (
    // <div className={outerPositionClass}>
      <div className={styles.container}>
        CoverageAria hello !!!
      </div>
    // </div>
  );
}