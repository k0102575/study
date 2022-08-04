import { useState } from 'react';

const Question1 = () => {
  // useState
  const [count, setCount] = useState(0);

  // handler
  const onClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={onClick}>
        버튼
      </button>
    </div>
  );
};

export default Question1;
