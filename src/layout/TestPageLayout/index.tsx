import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export const TestPageLayout = () => {
  return (
    <div className={styles.container}>
      <h2>
        This is testing page
      </h2>
      <Link 
          style={{zIndex:'4', cursor: 'pointer', position: 'relative'}}
          to="/"
        >
        go to Main page
      </Link>
    </div>
  );
}