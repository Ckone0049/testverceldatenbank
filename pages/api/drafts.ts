import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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

      const drafts = await prisma.post.findMany({
        where: { 
          published: false,
          authorId: user.id
        },
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      })
      
      res.status(200).json(drafts)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch drafts' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}