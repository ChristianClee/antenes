import React, { useLayoutEffect, useRef } from 'react';
import { createWallPaper } from '##/components/engines/wallPaper/index';
import { Navigate } from '##/view/Navigate';
import imagePath from '##/assets/svg/wallPaper_zvz.svg';
import './App.scss';

function App() {
  const wallPaperRef = useRef<HTMLCanvasElement>(null);
  const isStartWallPaper = useRef<boolean>(true);

  useLayoutEffect (()=> {
    
    if(!wallPaperRef.current) return;
    createWallPaper(wallPaperRef.current, imagePath, isStartWallPaper);
  }, [])
       
    

  return (
    <div className="App" id='App'>
      <header>header</header>
      <main>main</main>
      <footer>footer</footer>
      <Navigate/>
      <canvas ref={wallPaperRef} className='wallPaper'></canvas>
    </div>
  );
}

export default App;
