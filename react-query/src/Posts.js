import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const Posts = ({ _enabled = true, _staleTime = 0 }) => {
  // fetch
  const fetch = async () => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    return response.data;
  };

  const queryClient = useQueryClient();

  // tanstack react-query
  const query = useQuery(['posts'], fetch, {
    enabled: _enabled,
    staleTime: _staleTime,
    cacheTime: 1000 * 5,
  });

  const { isLoading, isFetching, refetch, data, status } = query;

  return (
    <div>
      <p>isLoading : {isLoading ? 'true' : 'false'}</p>
      <p>isFetching : {isFetching ? 'true' : 'false'}</p>

      <button
        onClick={() => {
          refetch();
        }}
      >
        버튼
      </button>

      {data?.map((post) => (
        <li key={post.id}>{post.id}</li>
      ))}
    </div>
  );
};

export default Posts;
