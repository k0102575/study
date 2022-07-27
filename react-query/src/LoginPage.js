import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Posts from './Posts';

const LoginPage = () => {
  // useState
  const [isEnabled, setIsEnabled] = useState(false);

  const query = useQueryClient();

  // handler
  const onClickButton = () => {
    setIsEnabled(true);
  };

  const onClickButton2 = () => {
    // query.invalidateQueries(['posts']);
  };

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div>
      <button type="button" onClick={onClickButton}>
        버튼
      </button>
      <button type="button" onClick={onClickButton2}>
        버튼
      </button>
      로그인 페이지야
      {isEnabled && <Posts></Posts>}
    </div>
  );
};

export default LoginPage;
