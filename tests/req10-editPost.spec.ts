import { describe, it, beforeAll, expect } from 'vitest'

import frisby from 'frisby'
import shell from 'shelljs'

const url = 'http://localhost:3000'

describe('10 - Sua aplicação deve ter o endpoint PUT `/post/:id`', () => {
  beforeAll(() => {
    shell.exec('npm run db:drop')
    shell.exec('npm run db:seed')
  })

  it('Será validado que é possível editar um blogpost com sucesso', () => {
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
          .put(`${url}/post/1`, {
            title: 'Fórmula 1 editado',
            content: 'O campeão do ano! editado',
          })
          .expect('status', 200)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse).toEqual(expect.objectContaining({
              title: 'Fórmula 1 editado',
              content: 'O campeão do ano! editado',
              userId: 1,
              categories: [{ id: 1, name: "Inovação" }]
            }))
          })
      })
  })

  it('Será validado que é não é possível editar as categorias de um blogpost', () => {
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
          .put(`${url}/post/1`, {
            title: 'Fórmula 1 editado',
            content: 'O campeão do ano! editado',
            categoryIds: [1, 2]
          })
          .expect('status', 400)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('Categories cannot be edited')
          })
      })
  })

  it('Será validado que não é possível editar um blogpost com outro usuário', () => {
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
          .put(`${url}/post/1`, {
            title: 'Fórmula 1 editado',
            content: 'O campeão do ano! editado',
          })
          .expect('status', 401)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('Unauthorized user')
          })
      })
  })

  it('Será validado que não possível editar um blogpost sem token', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .put(`${url}/post/1`, {
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado',
      })
      .expect('status', 401)
      .then((response) => {
        const { json: jsonResponse } = response
        expect(jsonResponse.message).toBe('Token not found')
      })
  })

  it('Será validado que não possível editar um blogpost com token inválido', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: 'et462g5r',
            'Content-Type': 'application/json',
          },
        },
      })
      .put(`${url}/post/1`, {
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado',
      })
      .expect('status', 401)
      .then((response) => {
        const { json: jsonResponse } = response
        expect(jsonResponse.message).toBe('Expired or invalid token')
      })
  })

  it('Será validado que não possível editar um blogpost sem o campo `title`', () => {
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
          .put(`${url}/post/1`, {
            content: 'O campeão do ano! editado',
          })
          .expect('status', 400)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('"title" is required')
          })
      })
  })

  it('Será validado que não possível editar um blogpost sem o campo `content`', () => {
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
          .put(`${url}/post/1`, {
            title: 'Fórmula 1 editado',
          })
          .expect('status', 400)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('"content" is required')
          })
      })
  })
})
