import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

interface ChildProps {
  outerPositionClass: string;
}

export const Contacts: React.FC<ChildProps> = ({outerPositionClass}) => {
  return (
    <div className={outerPositionClass}>
      <div className={styles.container}>
        <h3>
          Configuration Values hello !!!
        </h3>

        <Link
          className={styles.link}
          to="https://canvasjs.com/"
          target="_blank"
        >
          canvas graphic libruary
        </Link>
      </div>
    </div>
  );
}