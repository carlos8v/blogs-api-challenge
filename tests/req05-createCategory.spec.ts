import { describe, it, beforeAll, expect } from 'vitest'

import supertest from 'supertest'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('5 - Sua aplicação deve ter o endpoint POST `/categories`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possivel cadastrar uma categoria com sucesso', async () => {
    const { body: loginResponse, status: loginStatus } = await supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '123456',
      })

    expect(loginStatus).toBe(200)
    expect(loginResponse.token).not.toBeNull()

    const token = `Bearer ${loginResponse.token}`

    const { body, status } = await supertest(app)
      .post('/categories')
      .set('Authorization', token)
      .send({ name: 'Música' })

    expect(status).toBe(201)
    expect(body.name).toBe('Música')
  })

  it('Será validado que não é possivel cadastrar uma categoria sem o campo name', async () => {
    const { body: loginResponse, status: loginStatus } = await supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '123456',
      })

    expect(loginStatus).toBe(200)
    expect(loginResponse.token).not.toBeNull()

    const token = `Bearer ${loginResponse.token}`

    const { body, status } = await supertest(app)
      .post('/categories')
      .set('Authorization', token)
      .send({})

    expect(status).toBe(400)
    expect(body.message).toBe('"name" is required')
  })

  it('Será validado que não é possível cadastrar uma categoria sem o token', async () => {
    const { body, status } = await supertest(app)
      .post('/categories')
      .set('Authorization', '')
      .send({ name: 'Typescript' })

    expect(status).toBe(401)
    expect(body.message).toBe('Token not found')
  })

  it('Será validado que não é possível cadastrar uma categoria com o token inválido', async () => {
    const { body, status } = await supertest(app)
      .post('/categories')
      .set('Authorization', 'Bearer kwngu4425h2')
      .send({ name: 'Typescript' })

    expect(status).toBe(401)
    expect(body.message).toBe('Expired or invalid token')
  })
})
