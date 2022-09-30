import { describe, it, beforeAll, expect } from 'vitest'

import supertest from 'supertest'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('6 - Sua aplicação deve ter o endpoint GET `/categories`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível listar todas as categorias com sucesso', async () => {
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
      .get('/categories')
      .set('Authorization', token)

    expect(status).toBe(200)
    expect(body).toEqual(expect.arrayContaining([
      { id: 1, name: 'Inovação' },
      { id: 2, name: 'Escola' }
    ]))
  })

  it('Será validado que não é possível listar as categorias sem o token', async () => {
    const { body, status } = await supertest(app)
      .get('/categories')
      .set('Authorization', '')

    expect(status).toBe(401)
    expect(body.message).toBe('Token not found')
  })

  it('Será validado que não é possível listar as categorias com o token inválido', async () => {
    const { body, status } = await supertest(app)
      .get('/categories')
      .set('Authorization', 'Bearer kwngu4425h2')

    expect(status).toBe(401)
    expect(body.message).toBe('Expired or invalid token')
  })
})
