import Posts from './Posts';

const Page = () => {
  return <Posts _staleTime={1000 * 5} _enabled={true}></Posts>;
};

export default Page;
