import { Router, Request, Response } from 'express';
import * as db from '../db';
import { verifyToken } from '../misc';

const router = Router();

router.post('/', verifyToken, async (req: Request, res: Response) => {
  const postInput: PostInput = req.body;

  if (!postInput.title) {
    return res.status(400).json({
      message: 'Title required'
    });
  }

  const post = db.addPost(postInput);
  return res.json(post);
});

router.get('/', verifyToken, (req: Request, res: Response) => {
  const posts = db.getPosts();
  return res.json(posts);
});

router.get('/:id', verifyToken, (req: Request, res: Response) => {
  const post = db.getPost(parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({
      message: 'Post not found'
    });
  }
  return res.json(post);
});

router.put('/:id', verifyToken, (req: Request, res: Response) => {
  const postInput: PostInput = req.body;
  const post = db.updatePost(parseInt(req.params.id), postInput);
  if (!post) {
    return res.status(404).json({
      message: 'Post not found'
    });
  }
  return res.json(post);
});

router.delete('/:id', verifyToken, (req: Request, res: Response) => {
  const post = db.deletePost(parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({
      message: 'Post not found'
    });
  }
  return res.json(post);
});

export default router;