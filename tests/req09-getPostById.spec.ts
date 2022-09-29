import { describe, it, beforeAll, expect } from 'vitest'

import frisby from 'frisby'
import shell from 'shelljs'

const url = 'http://localhost:3000'

describe('9 - Sua aplicação deve ter o endpoint GET `post/:id`', () => {
  beforeAll(() => {
    shell.exec('npm run db:drop')
    shell.exec('npm run db:seed')
  })

  it('Será validado que é possível listar um blogpost com sucesso', () => {
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
          .get(`${url}/post/1`)
          .expect('status', 200)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse).toEqual(expect.objectContaining({
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
              categories: [
                { id: 1, name: 'Inovação' }
              ]
            }))
          })
      })
  })

  it('Será validado que não é possível listar um blogpost sem token', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/1`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Token not found')
      })
  })

  it('Será validado que não é possível listar um blogpost com token inválido', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: 'gakhubde631903',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/1`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Expired or invalid token')
      })
  })

  it('Será validado que não é possível listar um blogpost inexistente', () => {
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
          .get(`${url}/post/999`)
          .expect('status', 404)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('Post does not exist')
          })
      })
  })
})
