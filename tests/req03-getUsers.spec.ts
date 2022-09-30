import { describe, it, beforeAll, expect } from 'vitest'

import supertest from 'supertest'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('3 - Sua aplicação deve ter o endpoint GET `/user`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível listar todos os usuários', async () => {
    const { body: tokenReponse, status: loginStatus } = await supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '123456',
      })

    expect(loginStatus).toBe(200)
    expect(tokenReponse.token).not.toBeNull()

    const token = `Bearer ${tokenReponse.token}`

    const { body, status } = await supertest(app)
      .get('/user')
      .set('Authorization', token)

    expect(status).toBe(200)
    expect(Array.isArray(body)).toBe(true)

    const firstUser = body[0]
    const secondUser = body[1]

    expect(firstUser).toEqual(expect.objectContaining({
      displayName: 'Lewis Hamilton',
      email: 'lewishamilton@gmail.com',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
    }))

    expect(secondUser).toEqual(expect.objectContaining({
      displayName: 'Michael Schumacher',
      email: 'MichaelSchumacher@gmail.com',
      image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg'
    }))
  })

  it('Será validado que não é possível listar usuários sem o token na requisição', async () => {
    const { body, status } = await supertest(app)
      .get('/user')
      .set('Authorization', '')

    expect(status).toBe(401)
    expect(body.message).toBe('Token not found')
  })

  it('Será validado que não é possível listar usuários com o token inválido', async () => {
    const { body, status } = await supertest(app)
      .get('/user')
      .set('Authorization', 'Bearer mo3183bfbahaf')

    expect(status).toBe(401)
    expect(body.message).toBe('Expired or invalid token')
  })
})
