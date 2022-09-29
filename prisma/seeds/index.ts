import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

import usersSeed from './users'
import categoriesSeed from './categories'
import blogPostsSeed from './blogPosts'
import postCategoriesSeed from './postCategories'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({ data: usersSeed })
  await prisma.category.createMany({ data: categoriesSeed })
  await prisma.blogPost.createMany({ data: blogPostsSeed })
  await prisma.postCategory.createMany({ data: postCategoriesSeed })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
