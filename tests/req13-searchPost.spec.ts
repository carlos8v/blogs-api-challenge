import { describe, it, beforeAll, expect } from 'vitest'
import frisby from 'frisby'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

const url = 'http://localhost:3000'

describe('13 - Sua aplicação deve ter o endpoint GET `post/search?q=:searchTerm`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível buscar um blogpost pelo `title`', () => {
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
          .get(`${url}/post/search?q=Vamos que vamos`)
          .expect('status', 200)
          .then((response) => {
            const { json: jsonResponse } = response

            expect(jsonResponse[0]).toEqual(expect.objectContaining({
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
      })
  })

  it('Será validado que é possível buscar um blogpost pelo `content`', () => {
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
          .get(`${url}/post/search?q=Foguete não tem ré`)
          .expect('status', 200)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse[0]).toEqual(expect.objectContaining({
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
      })
  })

  it('Será validado que é possível buscar todos os blogpost quando passa a busca vazia', () => {
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
          .get(`${url}/post/search?q=`)
          .expect('status', 200)
          .then((response) => {
            const { json: jsonResponse } = response
            const firstBlogPost = jsonResponse[0]
            const secondBlogPost = jsonResponse[1]

            expect(firstBlogPost).toEqual({
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
            })

            expect(secondBlogPost).toEqual({
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
            })
          })
      })
  })

  it('Será validado que é possível buscar um blogpost inexistente e retornar array vazio', () => {
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
          .get(`${url}/post/search?q=Não existe`)
          .expect('status', 200)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse).toStrictEqual([])
          })
      })
  })

  it('Será validado que não é possível buscar um blogpost sem o token', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/search?q=vamos que vamos`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Token not found')
      })
  })

  it('Será validado que não é possível buscar um blogpost com o token inválido', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: 'g4twg',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/search?q=vamos que vamos`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Expired or invalid token')
      })
  })
})
