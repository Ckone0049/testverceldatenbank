import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })

  const post1 = await prisma.post.create({
    data: {
      title: 'Prisma macht Datenbankzugriff einfach',
      content: 'Prisma ist ein modernes ORM für Node.js und TypeScript. Es vereinfacht den Zugriff auf Datenbanken erheblich.',
      published: true,
      authorId: user.id,
    },
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'Next.js und Vercel - Das perfekte Team',
      content: 'Next.js bietet server-side rendering und Vercel macht das Deployment kinderleicht.',
      published: true,
      authorId: user.id,
    },
  })

  const draft = await prisma.post.create({
    data: {
      title: 'Mein erster Draft',
      content: 'Das ist noch nicht fertig...',
      published: false,
      authorId: user.id,
    },
  })

  console.log({ user, post1, post2, draft })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })