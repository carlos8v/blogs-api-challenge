import { describe, it, beforeAll, expect } from 'vitest'
import frisby from 'frisby'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

const url = 'http://localhost:3000'

describe('3 - Sua aplicação deve ter o endpoint GET `/user`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível listar todos os usuários', () => {
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
          .get(`${url}/user`)
          .expect('status', 200)
          .then((responseSales) => {
            const { json: jsonResponse } = responseSales
            const firstUser = jsonResponse[0]
            const secondUser = jsonResponse[1]

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
      })
  })

  it('Será validado que não é possível listar usuários sem o token na requisição', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales
        expect(json.message).toBe('Token not found')
      })
  })

  it('Será validado que não é possível listar usuários com o token inválido', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: 'mo3183bfbahaf',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales
        expect(json.message).toBe('Expired or invalid token')
      })
  })
})
