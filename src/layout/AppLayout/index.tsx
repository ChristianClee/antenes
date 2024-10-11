import React, { useRef,useLayoutEffect, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from '##/store/hooks';
import { createWallPaper } from '##/components/engines/wallPaper/index';
import styles from "./index.module.scss";

export const AppLayout = () => {
  const wallPaperRef = useRef<HTMLCanvasElement>(null);
  const colorTheme = useAppSelector((state) => state.test.colorTheme); 
  const colorThemeRef = useRef(colorTheme)
  // console.log(colorTheme);

  useEffect(()=>{
    colorThemeRef.current = colorTheme;
  }, [colorTheme])

  useLayoutEffect (()=> {
    if( !wallPaperRef.current ) return;
    createWallPaper(wallPaperRef.current, colorThemeRef);
    return () => {
          //@ts-ignore
      createWallPaper.stop = true
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