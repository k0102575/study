export interface User {
  name: string;
  age: number;
}

export interface Meta {
  updatedAt: number;
}

export interface Result {
  user: User;
  meta: Meta;
}
