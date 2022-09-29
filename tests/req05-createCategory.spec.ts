import { describe, it, beforeAll, expect } from 'vitest'
import frisby from 'frisby'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

const url = 'http://localhost:3000'

describe('5 - Sua aplicação deve ter o endpoint POST `/categories`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possivel cadastrar uma categoria com sucesso', () => {
    let token
    return frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { json } = response
        token = json.token

        return frisby
          .setup({
            request: {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/categories`, { name: 'Música' })
          .expect('status', 201)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.name).toBe('Música')
          })
      })
  })

  it('Será validado que não é possivel cadastrar uma categoria sem o campo name', () => {
    let token
    return frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { json } = response
        token = json.token

        return frisby
          .setup({
            request: {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/categories`, {})
          .expect('status', 400)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('"name" is required')
          })
      })
  })

  it('Será validado que não é possível cadastrar uma categoria sem o token', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/categories`, { name: 'Typescript' })
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Token not found')
      })
  })

  it('Será validado que não é possível cadastrar uma categoria com o token inválido', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: 'kwngu4425h2',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/categories`, { name: 'Typescript' })
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Expired or invalid token')
      })
  })
})
