import { describe, it, beforeEach, expect } from 'vitest'

import frisby from 'frisby'
import shell from 'shelljs'

const url = 'http://localhost:3000'

describe('11 - Sua aplicação deve ter o endpoint DELETE `post/:id`', () => {
  beforeEach(() => {
    shell.exec('npm run db:drop')
    shell.exec('npm run db:seed')
  })

  it('Será validado que é possível deletar um blogpost com sucesso', () => {
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
          .del(`${url}/post/1`)
          .expect('status', 204)
      })
  })

  it('Será validado que não é possível deletar um blogpost com outro usuário', () => {
    let token
    return frisby
      .post(`${url}/login`,
        {
          email: 'MichaelSchumacher@gmail.com',
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
          .del(`${url}/post/1`)
          .expect('status', 401)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('Unauthorized user')
          })
      })
  })

  it('Será validado que não é possível deletar um blogpost inexistente', () => {
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
          .del(`${url}/post/111`)
          .expect('status', 404)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('Post does not exist')
          })
      })
  })

  it('Será validado que não é possível deletar um blogpost sem o token', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .del(`${url}/post/1`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Token not found')
      })
  })

  it('Será validado que não é possível deletar um blogpost com o token inválido', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: 'kwngu4425h2',
            'Content-Type': 'application/json',
          },
        },
      })
      .del(`${url}/post/1`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Expired or invalid token')
      })
  })
})
