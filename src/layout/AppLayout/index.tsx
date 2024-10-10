import React, { useRef,useLayoutEffect } from "react";
import { createWallPaper } from '##/components/engines/wallPaper/index';
import imagePath from '##/assets/svg/wallPaper_zvz.svg';
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export const AppLayout = () => {
  const wallPaperRef = useRef<HTMLCanvasElement>(null);
  const isStartWallPaper = useRef<boolean>(true);

  useLayoutEffect (()=> {
    if(wallPaperRef.current){
      console.log('start');
      
      createWallPaper(wallPaperRef.current,imagePath, isStartWallPaper);
    }
    return () => {
      console.log('quite');
      
    }
  }, []);
  
  return (
    <>
      <span >
        <Link 
          style={{zIndex:'4', cursor: 'pointer', position: 'relative'}}
          to="/test"
        >
          go to test page
        </Link>
      </span>
      <canvas ref={wallPaperRef} className={styles.wallPaper}></canvas>
    </>
  );
}