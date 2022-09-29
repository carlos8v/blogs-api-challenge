import { PrismaClient } from '@prisma/client'

import usersSeed from './users'
import categoriesSeed from './categories'
import blogPostsSeed from './blogPosts'
import postCategoriesSeed from './postCategories'

export default async function seedDatabase(prisma: PrismaClient) {
  await prisma.user.createMany({ data: usersSeed })
  await prisma.category.createMany({ data: categoriesSeed })
  await prisma.blogPost.createMany({ data: blogPostsSeed })
  await prisma.postCategory.createMany({ data: postCategoriesSeed })
}
