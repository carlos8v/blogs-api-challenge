import { describe, it, beforeAll, expect } from 'vitest'
import frisby from 'frisby'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

const url = 'http://localhost:3000'

describe('6 - Sua aplicação deve ter o endpoint GET `/categories`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível listar todas as categorias com sucesso', () => {
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
          .get(`${url}/categories`)
          .expect('status', 200)
          .then((response) => {
            const { json: jsonResponse } = response

            expect(jsonResponse).toEqual(expect.arrayContaining([
              { id: 1, name: 'Inovação' },
              { id: 2, name: 'Escola' }
            ]))
          })
      })
  })

  it('Será validado que não é possível listar as categorias sem o token', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/categories`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Token not found')
      })
  })

  it('Será validado que não é possível listar as categorias com o token inválido', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: 'kwngu4425h2',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/categories`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Expired or invalid token')
      })
  })
})
