import React, { useLayoutEffect, useRef } from 'react';
import {createWallPaper} from './ingines/wallPaper/index';
import { Navigate } from './view/Navigate'
import './App.css';

function App() {
  const wallPaperRef = useRef<HTMLCanvasElement>(null);
  const isStartWallPaper = useRef<boolean>(true);

  useLayoutEffect (()=> {    
    if(!wallPaperRef.current) return;
    createWallPaper(wallPaperRef.current, isStartWallPaper);
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
