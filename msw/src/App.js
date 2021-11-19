import { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    userId: '',
    id: '',
    title: '',
    body: '',
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/101'
      );
      const _user = await response.json();

      setUser(_user);
    } catch (e) {
      console.error('api 요청 에러 발생');
    }
  };

  const handleClick = () => {
    fetchData();
  };

  return (
    <div className="App">
      <p>userId: {user?.userId}</p>
      <p>id: {user?.id}</p>
      <p>title: {user?.title}</p>
      <p>body: {user?.body}</p>
      <button type="button" onClick={handleClick}>
        요청 받아오기
      </button>
    </div>
  );
}

export default App;
