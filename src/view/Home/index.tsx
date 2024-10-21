import React, { useRef, useLayoutEffect, useEffect } from "react";
import { createWallPaper } from '##/components/engines/wallPaper/index';
import { useAppSelector } from '##/store/hooks';
import styles from "./index.module.scss";

interface ChildProps {
  outerPositionClass: string;
}

export const Home: React.FC<ChildProps> = ({outerPositionClass}) => {
  
 const wallPaperRef = useRef<HTMLCanvasElement>(null);
 const colorTheme = useAppSelector((state) => state.test.colorTheme);
 const colorThemeRef = useRef(colorTheme);

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
  }, []); // * repair it later
  return (
    <div className={outerPositionClass}>
        <canvas ref={wallPaperRef} className={styles.container}></canvas>
    </div>
  );
}