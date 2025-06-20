import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import prisma from './prisma'

export interface AuthenticatedUser {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

export async function getAuthenticatedUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<AuthenticatedUser | null> {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session?.user?.email) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        image: true
      }
    })

    return user
  } catch (error) {
    console.error('Error fetching authenticated user:', error)
    return null
  }
}

export function requireAuth() {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const user = await getAuthenticatedUser(req, res)
    
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    // Attach user to request object for use in handlers
    ;(req as any).user = user
    next()
  }
}

export async function requireOwnership(
  req: NextApiRequest,
  res: NextApiResponse,
  resourceId: string,
  resourceType: 'post' = 'post'
): Promise<boolean> {
  const user = await getAuthenticatedUser(req, res)
  
  if (!user) {
    res.status(401).json({ error: 'Authentication required' })
    return false
  }

  try {
    let resource
    
    if (resourceType === 'post') {
      resource = await prisma.post.findUnique({
        where: { id: resourceId },
        select: { authorId: true }
      })
    }

    if (!resource) {
      res.status(404).json({ error: `${resourceType} not found` })
      return false
    }

    if (resource.authorId !== user.id) {
      res.status(403).json({ error: `Not authorized to access this ${resourceType}` })
      return false
    }

    return true
  } catch (error) {
    console.error(`Error checking ${resourceType} ownership:`, error)
    res.status(500).json({ error: 'Internal server error' })
    return false
  }
}