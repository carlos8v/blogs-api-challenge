import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

import seedDatabase from '../../prisma/seeds'

export default async function main() {
  const prisma = new PrismaClient()

  try {
    await seedDatabase(prisma)
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
