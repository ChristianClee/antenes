import React from "react";
import styles from "./index.module.scss";

interface ChildProps {
  readonly outerPositionClass: string;
  readonly text: string;
  func: () => void;
}

export const ButtonTypeOne: React.FC<ChildProps> = ({outerPositionClass, text, func}) => {
  return (
    <div className={outerPositionClass}>
      <div className={styles.container}
        onClick={func}
      >
        { text }
      </div>
    </div>
  );
}