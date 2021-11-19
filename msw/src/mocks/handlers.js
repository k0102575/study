import { rest } from 'msw';

export const handlers = [
  rest.get(
    'https://jsonplaceholder.typicode.com/posts/101',
    (req, res, ctx) => {
      return res(
        ctx.status(500)
        // ctx.json({
        //   userId: 101,
        //   id: 101,
        //   title: 'post title!',
        //   body: 'This is mocked response by handlers.ts asdfasdfasfasdfas',
        // })
      );
    }
  ),
];
