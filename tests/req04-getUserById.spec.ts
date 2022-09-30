import { describe, it, beforeAll, expect } from 'vitest'

import supertest from 'supertest'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('4 - Sua aplicação deve ter o endpoint GET `/user/:id`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível listar um usuário específico com sucesso', async () => {
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
      .get('/user/1')
      .set('Authorization', token)

    expect(status).toBe(200)
    expect(body).toEqual(expect.objectContaining({
      id: 1,
      displayName: 'Lewis Hamilton',
      email: 'lewishamilton@gmail.com',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
    }))
  })

  it('Será validado que não é possível listar um usuário inexistente', async () => {
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
      .get('/user/9999')
      .set('Authorization', token)

    expect(status).toBe(404)
    expect(body.message).toBe('User does not exist')
  })

  it('Será validado que não é possível listar um determinado usuário sem o token na requisição', async () => {
    const { body, status } = await supertest(app)
      .get('/user/1')
      .set('Authorization', '')

    expect(status).toBe(401)
    expect(body.message).toBe('Token not found')
  })

  it('Será validado que não é possível listar um determinado usuário com o token inválido', async () => {
    const { body, status } = await supertest(app)
      .get('/user/1')
      .set('Authorization', 'Bearer mo3183bfbahaf')

    expect(status).toBe(401)
    expect(body.message).toBe('Expired or invalid token')
  })
})
