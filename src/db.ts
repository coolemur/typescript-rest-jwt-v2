import { SHA3 } from 'sha3';

import usersJSON from './users.json';
import posts from './posts.json';

const users: User[] = usersJSON as User[];

const sha3 = new SHA3(512);

function generateRandomId() {
  return Math.floor(Math.random() * 100000);
}

function getSalt() {
  return sha3.update(Math.random().toString()).digest('hex');
}

function getHash(password: string, salt: string) {
  if (password && salt) {
    sha3.reset();
    return sha3.update(password + salt).digest('hex');
  }

  return '';
}

export function saveUser(email: string, password: string): Partial<User> | null {
  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return null;
  }

  const salt = getSalt();
  const hash = getHash(password, salt);
  const id = generateRandomId();

  const user = {
    id,
    email: email,
    salt,
    password: hash,
  };

  users.push(user);

  return {
    id: id,
    email: user.email,
  };
}

export function getUser(email: string, password: string): Partial<User> | null {
  const user = users.find(u => u.email === email);

  if (!user) {
    return null;
  }

  const hash = getHash(password, user.salt);
  if (user.password !== hash) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
  };
}

export function getPosts(): Post[] {
  return posts;
}

export function getPost(id: number): Post | null {
  const post = posts.find(p => p.id === id);

  if (!post) {
    return null;
  }

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    category: post.category,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

export function addPost(postInput: PostInput): Post {
  const id = generateRandomId();

  const post: Post = {
    id,
    title: postInput.title,
    content: postInput.content,
    category: postInput.category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  posts.push(post);
  return post;
}

export function updatePost(id: number, postInput: PostInput): Post | null {
  const post = posts.find(p => p.id === id);

  if (!post) {
    return null;
  }

  post.title = postInput.title;

  return post;
}

export function deletePost(id: number): boolean {
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return false;
  }

  posts.splice(postIndex, 1);
  return true;
}

