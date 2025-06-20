import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
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
    const session = await getServerSession(req, res, authOptions)
    
    if (!session || !session.user?.email) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { title, content } = req.body
    
    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: user.id
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