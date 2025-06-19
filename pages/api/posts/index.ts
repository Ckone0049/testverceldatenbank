import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        where: { published: true },
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      })
      res.status(200).json(posts)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' })
    }
  } else if (req.method === 'POST') {
    const { title, content, authorId } = req.body
    
    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId
        }
      })
      res.status(201).json(post)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}