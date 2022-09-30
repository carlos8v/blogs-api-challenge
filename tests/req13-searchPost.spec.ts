import { describe, it, beforeAll, expect } from 'vitest'

import supertest from 'supertest'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('13 - Sua aplicação deve ter o endpoint GET `post/search?q=:searchTerm`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível buscar um blogpost pelo `title`', async () => {
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
      .get('/post/search?q=Vamos que vamos')
      .set('Authorization', token)

    expect(status).toBe(200)
    expect(Array.isArray(body)).toBe(true)
    expect(body[0]).toEqual(expect.objectContaining({
      id: 2,
      title: 'Vamos que vamos',
      content: 'Foguete não tem ré',
      published: '2011-08-01T19:58:00.000Z',
      updated: '2011-08-01T19:58:51.000Z',
      user: {
        id: 1,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
      },
      categories: [{ id: 2, name: 'Escola ' }]
    }))
  })

  it('Será validado que é possível buscar um blogpost pelo `content`', async () => {
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
      .get('/post/search?q=Foguete não tem ré')
      .set('Authorization', token)

    expect(status).toBe(200)
    expect(Array.isArray(body)).toBe(true)
    expect(body[0]).toEqual(expect.objectContaining({
      id: 2,
      title: 'Vamos que vamos',
      content: 'Foguete não tem ré',
      published: '2011-08-01T19:58:00.000Z',
      updated: '2011-08-01T19:58:51.000Z',
      user: {
        id: 1,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
      }
    }))
  })

  it('Será validado que é possível buscar todos os blogpost quando passa a busca vazia', async () => {
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
      .get('/post/search?q=')
      .set('Authorization', token)

    expect(status).toBe(200)
    expect(Array.isArray(body))

    const firstBlogPost = body[0]
    const secondBlogPost = body[1]

    expect(firstBlogPost).toEqual(expect.objectContaining({
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
      }
    }))

    expect(secondBlogPost).toEqual(expect.objectContaining({
      id: 2,
      title: 'Vamos que vamos',
      content: 'Foguete não tem ré',
      published: '2011-08-01T19:58:00.000Z',
      updated: '2011-08-01T19:58:51.000Z',
      user: {
        id: 1,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
      }
    }))
  })

  it('Será validado que é possível buscar um blogpost inexistente e retornar array vazio', async () => {
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
      .get('/post/search?q=Não existe')
      .set('Authorization', token)

    expect(status).toBe(200)
    expect(body).toStrictEqual([])
  })

  it('Será validado que não é possível buscar um blogpost sem o token', async () => {
    const { body, status } = await supertest(app)
      .get('/post/search?q=vamos que vamos')
      .set('Authorization', '')

    expect(status).toBe(401)
    expect(body.message).toBe('Token not found')
  })

  it('Será validado que não é possível buscar um blogpost com o token inválido', async () => {
    const { body, status } = await supertest(app)
      .get('/post/search?q=vamos que vamos')
      .set('Authorization', 'Bearer g4twg')

    expect(status).toBe(401)
    expect(body.message).toBe('Expired or invalid token')
  })
})
