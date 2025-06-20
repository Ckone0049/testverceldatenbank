import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
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
    const session = await getServerSession(req, res, authOptions)
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })

      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }

      const post = await prisma.post.findUnique({
        where: { id: String(id) },
        select: { authorId: true }
      })

      if (!post) {
        return res.status(404).json({ error: 'Post not found' })
      }

      if (post.authorId !== user.id) {
        return res.status(403).json({ error: 'Not authorized to publish this post' })
      }

      const updatedPost = await prisma.post.update({
        where: { id: String(id) },
        data: { published: true }
      })
      
      res.status(200).json(updatedPost)
    } catch (error) {
      res.status(500).json({ error: 'Failed to publish post' })
    }
  } else if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })

      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }

      const post = await prisma.post.findUnique({
        where: { id: String(id) },
        select: { authorId: true }
      })

      if (!post) {
        return res.status(404).json({ error: 'Post not found' })
      }

      if (post.authorId !== user.id) {
        return res.status(403).json({ error: 'Not authorized to delete this post' })
      }

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