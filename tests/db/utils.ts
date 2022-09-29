import { prisma } from '../../src/db/prismaClient'

export const truncateDatabase = async () => {
  await prisma.postCategory.deleteMany({})
  await prisma.blogPost.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})
}
