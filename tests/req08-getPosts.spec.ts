import { describe, it, beforeAll, expect } from 'vitest'

import supertest from 'supertest'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('8 - Sua aplicação deve ter o endpoint GET `/post`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível listar blogpost com sucesso', async () => {
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
      .get('/post')
      .set('Authorization', token)

    expect(status).toBe(200)

    expect(Array.isArray(body)).toBe(true)
    expect(body[0]).toEqual(expect.objectContaining({
      id: 1,
      title: 'Post do Ano',
      content: 'Melhor post do ano',
      published: '2011-08-01T19:58:00.000Z',
      updated: '2011-08-01T19:58:51.000Z',
      user: {
        id: 1,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
      },
      categories: [{
        id: 1,
        name: 'Inovação'
      }]
    }))
  })

  it('Será validado que não é possível listar blogpost sem token', async () => {
    const { body, status } = await supertest(app)
      .get('/post')
      .set('Authorization', '')

    expect(status).toBe(401)
    expect(body.message).toBe('Token not found')
  })

  it('Será validado que não é possível listar blogpost com token inválido', async () => {
    const { body, status } = await supertest(app)
      .get('/post')
      .set('Authorization', 'Bearer gakhubde631903')

    expect(status).toBe(401)
    expect(body.message).toBe('Expired or invalid token')
  })
})
