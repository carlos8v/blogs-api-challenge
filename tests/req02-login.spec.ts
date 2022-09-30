import { describe, it, beforeAll, expect } from 'vitest'

import supertest from 'supertest'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('2 - Sua aplicação deve ter o endpoint POST `/login`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível fazer login com sucesso', async () => {
    const { body, status } = await supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '123456',
      })

    expect(status).toBe(200)
    expect(body.token).not.toBeNull()
  })

  it('Será validado que não é possível fazer login sem o campo `email`', async () => {
    const { body, status } = await supertest(app)
      .post('/login')
      .send({ password: '123456' })

    expect(status).toBe(400)
    expect(body.message).toBe('"email" is required')
  })

  it('Será validado que não é possível fazer login sem o campo `password`', async () => {
    const { body, status } = await supertest(app)
      .post('/login')
      .send({ email: 'lewishamilton@gmail.com' })

    expect(status).toBe(400)
    expect(body.message).toBe('"password" is required')
  })

  it('Será validado que não é possível fazer login com o campo `email` em branco', async () => {
    const { body, status } = await supertest(app)
      .post('/login')
      .send({
        email: '',
        password: '123456',
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"email" is not allowed to be empty')
  })

  it('Será validado que não é possível fazer login com o campo `password` em branco', async () => {
    const { body, status } = await supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '',
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"password" is not allowed to be empty')
  })

  it('Será validado que não é possível fazer login com um usuário que não existe', async () => {
    const { body, status } = await supertest(app)
      .post('/login')
      .send({
        email: 'senna@gmail.com',
        password: '123456',
      })

    expect(status).toBe(400)
    expect(body.message).toBe('Invalid fields')
  })
})
