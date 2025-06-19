import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const drafts = await prisma.post.findMany({
        where: { published: false },
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