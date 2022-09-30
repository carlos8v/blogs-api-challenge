import { describe, it, beforeEach, expect } from 'vitest'

import supertest from 'supertest'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('11 - Sua aplicação deve ter o endpoint DELETE `post/:id`', () => {
  beforeEach(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível deletar um blogpost com sucesso', async () => {
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
      .del('/post/1')
      .set('Authorization', token)

    expect(status).toBe(204)
  })

  it('Será validado que não é possível deletar um blogpost com outro usuário', async () => {
    const { body: loginResponse, status: loginStatus } = await supertest(app)
      .post('/login')
      .send({
        email: 'MichaelSchumacher@gmail.com',
        password: '123456',
      })

    expect(loginStatus).toBe(200)
    expect(loginResponse.token).not.toBeNull()

    const token = `Bearer ${loginResponse.token}`

    const { body, status } = await supertest(app)
      .del('/post/1')
      .set('Authorization', token)

    expect(status).toBe(401)
    expect(body.message).toBe('Unauthorized user')
  })

  it('Será validado que não é possível deletar um blogpost inexistente', async () => {
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
      .del('/post/111')
      .set('Authorization', token)

    expect(status).toBe(404)
    expect(body.message).toBe('Post does not exist')
  })

  it('Será validado que não é possível deletar um blogpost sem o token', async () => {
    const { body, status } = await supertest(app)
      .del('/post/1')
      .set('Authorization', '')

    expect(status).toBe(401)
    expect(body.message).toBe('Token not found')
  })

  it('Será validado que não é possível deletar um blogpost com o token inválido', async () => {
    const { body, status } = await supertest(app)
      .del('/post/1')
      .set('Authorization', 'Bearer kwngu4425h2')

    expect(status).toBe(401)
    expect(body.message).toBe('Expired or invalid token')
  })
})
