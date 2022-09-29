import { describe, it, beforeAll, expect } from 'vitest'
import frisby from 'frisby'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

const url = 'http://localhost:3000'

describe('4 - Sua aplicação deve ter o endpoint GET `/user/:id`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível listar um usuário específico com sucesso', () => {
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
          .get(`${url}/user/1`)
          .expect('status', 200)
          .then((response) => {
            const { json: jsonUser } = response
            expect(jsonUser).toEqual(expect.objectContaining({
              id: 1,
              displayName: 'Lewis Hamilton',
              email: 'lewishamilton@gmail.com',
              image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
            }))
          })
      })
  })

  it('Será validado que não é possível listar um usuário inexistente', () => {
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
          .get(`${url}/user/9999`)
          .expect('status', 404)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('User does not exist')
          })
      })
  })

  it('Será validado que não é possível listar um determinado usuário sem o token na requisição', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user/1`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales
        expect(json.message).toBe('Token not found')
      })
  })

  it('Será validado que não é possível listar um determinado usuário com o token inválido', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: 'mo3183bfbahaf',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user/1`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales
        expect(json.message).toBe('Expired or invalid token')
      })
  })
})
