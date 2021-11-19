import React from 'react';

const Home = () => {
  const fetchData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts').then(
      (response) => response.json()
    );
    console.log(res);
  };

  fetchData();
  return <></>;
};

export default Home;
