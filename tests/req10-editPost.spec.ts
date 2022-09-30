import { describe, it, beforeAll, expect } from 'vitest'

import supertest from 'supertest'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('10 - Sua aplicação deve ter o endpoint PUT `/post/:id`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível editar um blogpost com sucesso', async () => {
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
      .put('/post/1')
      .send({
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado',
      })
      .set('Authorization', token)

    expect(status).toBe(200)
    expect(body).toEqual(expect.objectContaining({
      title: 'Fórmula 1 editado',
      content: 'O campeão do ano! editado',
      userId: 1,
      categories: [{ id: 1, name: "Inovação" }]
    }))
  })

  it('Será validado que não é possível editar as categorias de um blogpost', async () => {
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
      .put('/post/1')
      .set('Authorization', token)
      .send({
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado',
        categoryIds: [1, 2]
      })

    expect(status).toBe(400)
    expect(body.message).toBe('Categories cannot be edited')
  })

  it('Será validado que não é possível editar um blogpost com outro usuário', async () => {
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
      .put('/post/1')
      .send({
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado'
      })
      .set('Authorization', token)

    expect(status).toBe(401)
    expect(body.message).toBe('Unauthorized user')
  })

  it('Será validado que não possível editar um blogpost sem token', async () => {
    const { body, status } = await supertest(app)
      .put('/post/1')
      .set('Authorization', '')
      .send({
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado',
      })

    expect(status).toBe(401)
    expect(body.message).toBe('Token not found')
  })

  it('Será validado que não possível editar um blogpost com token inválido', async () => {
    const { body, status } = await supertest(app)
      .put('/post/1')
      .set('Authorization', 'Bearer et462g5r')
      .send({
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado',
      })

    expect(status).toBe(401)
    expect(body.message).toBe('Expired or invalid token')
  })

  it('Será validado que não possível editar um blogpost sem o campo `title`', async () => {
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
      .put('/post/1')
      .send({ content: 'O campeão do ano! editado' })
      .set('Authorization', token)

    expect(status).toBe(400)
    expect(body.message).toBe('"title" is required')
  })

  it('Será validado que não possível editar um blogpost sem o campo `content`', async () => {
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
      .put('/post/1')
      .send({ title: 'Fórmula 1 editado' })
      .set('Authorization', token)

    expect(status).toBe(400)
    expect(body.message).toBe('"content" is required')
  })
})
