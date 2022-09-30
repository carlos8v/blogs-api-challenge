import { describe, it, beforeEach, expect } from 'vitest'

import supertest from 'supertest'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('7 - Sua aplicação deve ter o endpoint POST `/post`', () => {
  beforeEach(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível cadastrar um blogpost com sucesso', async () => {
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
      .post('/post')
      .set('Authorization', token)
      .send({
        title: 'Fórmula 1',
        content: 'O campeão do ano!',
        categoryIds: [1],
      })

    expect(status).toBe(201)
    expect(body).toEqual(expect.objectContaining({
      id: 3,
      title: 'Fórmula 1',
      content: 'O campeão do ano!',
      userId: 1,
    }))
  })

  it('Será validado que não é possível cadastrar um blogpost sem o campo `title`', async () => {
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
      .post('/post')
      .set('Authorization', token)
      .send({
        content: 'O campeão do ano!',
        categoryIds: [1]
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"title" is required')
  })

  it('Será validado que não é possível cadastrar um blogpost sem o campo `content`', async () => {
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
      .post('/post')
      .set('Authorization', token)
      .send({
        title: 'O campeão do ano!',
        categoryIds: [1]
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"content" is required')
  })

  it('Será validado que não é possível cadastrar um blogpost sem o campo `categoryIds`', async () => {
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
      .post('/post')
      .set('Authorization', token)
      .send({
        content: 'O campeão do ano!',
        title: 'Fórmula 1'
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"categoryIds" is required')
  })

  it('Será validado que não é possível cadastrar um blogpost com uma categoria inexistente', async () => {
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
      .post('/post')
      .set('Authorization', token)
      .send({
        title: "Carros elétricos vão dominar o mundo?",
        content: "Já é possivel encontrar diversos carros elétricos em todo o mundo, será esse nosso futuro?",
        categoryIds: [3],
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"categoryIds" not found')
  })

  it('Será validado que não é possível cadastrar um blogpost sem o token', async () => {
    const { body, status } = await supertest(app)
      .post('/post')
      .set('Authorization', '')
      .send({
        title: 'Fórmula 1',
        content: 'O campeão do ano!',
        categoryIds: [1],
      })

    expect(status).toBe(401)
    expect(body.message).toBe('Token not found')
  })

  it('Será validado que não é possível cadastrar um blogpost com o token inválido', async () => {
    const { body, status } = await supertest(app)
      .post('/post')
      .set('Authorization', 'Bearer kwngu4425h2')
      .send({
        title: 'Fórmula 1',
        content: 'O campeão do ano!',
        categoryIds: [1],
      })

    expect(status).toBe(401)
    expect(body.message).toBe('Expired or invalid token')
  })
})
