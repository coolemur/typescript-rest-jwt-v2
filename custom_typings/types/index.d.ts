interface PostInput {
  title: string;
  content: string;
  category: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number
  email: string
  password: string
  salt: string
}