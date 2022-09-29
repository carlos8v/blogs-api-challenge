import { describe, it, beforeAll, expect } from 'vitest'

import frisby from 'frisby'
import shell from 'shelljs'

const url = 'http://localhost:3000'

describe('12 - Sua aplicação deve ter o endpoint DELETE `/user/me`', () => {
  beforeAll(() => {
    shell.exec('npm run db:drop')
    shell.exec('npm run db:seed')
  })

  it('Será validado que é possível excluir meu usuário com sucesso', () => {
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
          .del(`${url}/user/me`)
          .expect('status', 204)
      })
  })

  it('Será validado que não é possivel excluir meu usuário com token inválido', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: 'nhfur53sbyf84',
            'Content-Type': 'application/json',
          },
        },
      })
      .del(`${url}/user/me`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Expired or invalid token')
      })
  })

  it('Será validado que não é possivel excluir meu usuário sem o token', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .del(`${url}/user/me`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Token not found')
      })
  })
})
