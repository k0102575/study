import { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {
  // useState
  const [colorIndex, setColorIndex] = useState(0);
  const [colorClassName, setColorClassName] = useState('red');

  // handler
  const handleResize = useCallback(() => {
    const classNameConst = {
      0: 'red',
      1: 'orange',
      2: 'yellow',
      3: 'green',
      4: 'blue',
      5: 'navy',
      6: 'purple',
      7: 'black',
    };

    const nextIndex = colorIndex + 1;
    setColorIndex(nextIndex);
    setColorClassName(classNameConst[nextIndex]);
  }, [colorIndex, setColorClassName]);

  // useEffect
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <div className="App">
      <div className={colorClassName}></div>
      <div className="black"></div>
    </div>
  );
}

export default App;
