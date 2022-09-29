import 'dotenv/config'

import { prisma } from '../../src/db/prismaClient'

import seedDatabase from '../../prisma/seeds'

export default async function main() {
  try {
    await seedDatabase(prisma)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
