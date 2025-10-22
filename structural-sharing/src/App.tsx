/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react';
import { replaceEqualDeep } from './utils';
import type { Result } from './type';

// const UserInfo = ({ data }: { data: any }) => {
//   console.log('👤 UserInfo 렌더링');
//   return <div>User: {data}</div>;
// };

// const MetaInfo = ({ data }: { data: any }) => {
//   console.log('📦 MetaInfo 렌더링');
//   return <div>Meta updatedAt: {data}</div>;
// };

const UserInfo = React.memo(({ data }: { data: any }) => {
  console.log('👤 UserInfo 렌더링');
  return <div>User: {data}</div>;
});

const MetaInfo = React.memo(({ data }: { data: any }) => {
  console.log('📦 MetaInfo 렌더링');
  return <div>Meta updatedAt: {data}</div>;
});

const App = () => {
  setTimeout(() => {
    console.log('----------');
  }, 1000);

  const [prev, setPrev] = useState<Result>({
    user: { name: 'kim', age: 30 },
    meta: { updatedAt: 123456 },
  });

  const next: Result = {
    user: { name: 'kim', age: 30 },
    meta: { updatedAt: 999999 }, // 변경된 부분
  };

  const result: Result = useMemo(() => {
    const replaced = replaceEqualDeep(next, prev);
    console.log(`prev  ${JSON.stringify(prev)}`);
    console.log(`next  ${JSON.stringify(next)}`);
    console.log('🔍 전체 객체 동일?', replaced === prev);
    console.log('🔍 user 참조 동일?', replaced.user === prev.user);
    console.log('🔍 meta 참조 동일?', replaced.meta === prev.meta);
    return replaced;
  }, [prev]);

  return (
    <div>
      <h1>구조적 공유 테스트</h1>
      <button onClick={() => setPrev(next)}>update</button>
      <UserInfo data={result.user.name} />
      <MetaInfo data={result.meta.updatedAt} />
    </div>
  );
};

export default App;
