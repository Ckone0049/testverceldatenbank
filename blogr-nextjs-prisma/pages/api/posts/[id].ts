import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const post = await prisma.post.findUnique({
        where: { id: String(id) },
        include: { author: { select: { name: true } } }
      })
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' })
      }
      
      res.status(200).json(post)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post' })
    }
  } else if (req.method === 'PUT') {
    try {
      const post = await prisma.post.update({
        where: { id: String(id) },
        data: { published: true }
      })
      res.status(200).json(post)
    } catch (error) {
      res.status(500).json({ error: 'Failed to publish post' })
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.post.delete({
        where: { id: String(id) }
      })
      res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}