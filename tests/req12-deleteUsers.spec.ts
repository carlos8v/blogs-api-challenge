import { describe, it, beforeAll, expect } from 'vitest'

import supertest from 'supertest'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('12 - Sua aplicação deve ter o endpoint DELETE `/user/me`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível excluir meu usuário com sucesso', async () => {
    const { body: loginResponse, status: loginStatus } = await supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '123456',
      })

    expect(loginStatus).toBe(200)
    expect(loginResponse.token).not.toBeNull()

    const token = `Bearer ${loginResponse.token}`

    const { status } = await supertest(app)
      .del('/user/me')
      .set('Authorization', token)

    expect(status).toBe(204)
  })

  it('Será validado que não é possivel excluir meu usuário com token inválido', async () => {
    const { body, status } = await supertest(app)
      .del('/user/me')
      .set('Authorization', 'Bearer nhfur53sbyf84')

    expect(status).toBe(401)
    expect(body.message).toBe('Expired or invalid token')
  })

  it('Será validado que não é possivel excluir meu usuário sem o token', async () => {
    const { body, status } = await supertest(app)
      .del('/user/me')
      .set('Authorization', '')

    expect(status).toBe(401)
    expect(body.message).toBe('Token not found')
  })
})
