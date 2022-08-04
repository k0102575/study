import { useEffect } from 'react';

const Question2 = () => {
  const init = () => {
    setTimeout(function timeout() {
      console.log('1');
    }, 0);

    Promise.resolve(1).then(function resolve() {
      console.log('2');
    });

    console.log('3');
  };

  useEffect(() => {
    init();
  }, []);

  return <div></div>;
};

export default Question2;
