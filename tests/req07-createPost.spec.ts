import { describe, it, beforeEach, expect } from 'vitest'
import frisby from 'frisby'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

const url = 'http://localhost:3000'

describe('7 - Sua aplicação deve ter o endpoint POST `/post`', () => {
  beforeEach(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível cadastrar um blogpost com sucesso', () => {
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
          .post(`${url}/post`, {
            title: 'Fórmula 1',
            content: 'O campeão do ano!',
            categoryIds: [1],
          })
          .expect('status', 201)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse).toEqual({
              id: 3,
              title: 'Fórmula 1',
              content: 'O campeão do ano!',
              userId: 1,
            })
          })
      })
  })

  it('Será validado que não é possível cadastrar um blogpost sem o campo `title`', () => {
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
          .post(`${url}/post`, {
            content: 'O campeão do ano!',
            categoryIds: [1]
          })
          .expect('status', 400)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('"title" is required')
          })
      })
  })

  it('Será validado que não é possível cadastrar um blogpost sem o campo `content`', () => {
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
          .post(`${url}/post`, {
            title: 'O campeão do ano!',
            categoryIds: [1],
          })
          .expect('status', 400)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('"content" is required')
          })
      })
  })

  it('Será validado que não é possível cadastrar um blogpost sem o campo `categoryIds`', () => {
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
          .post(`${url}/post`, {
            content: 'O campeão do ano!',
            title: 'Fórmula 1'
          })
          .expect('status', 400)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('"categoryIds" is required')
          })
      })
  })

  it('Será validado que não é possível cadastrar um blogpost com uma categoria inexistente', () => {
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
          .post(`${url}/post`, {
            title: "Carros elétricos vão dominar o mundo?",
            content: "Já é possivel encontrar diversos carros elétricos em todo o mundo, será esse nosso futuro?",
            categoryIds: [3],
          })
          .expect('status', 400)
          .then((response) => {
            const { json: jsonResponse } = response
            expect(jsonResponse.message).toBe('"categoryIds" not found')
          })
      })
  })

  it('Será validado que não é possível cadastrar um blogpost sem o token', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/post`, {
        title: 'Fórmula 1',
        content: 'O campeão do ano!',
        categoryIds: [1],
      })
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Token not found')
      })
  })

  it('Será validado que não é possível cadastrar um blogpost com o token inválido', () => {
    return frisby
      .setup({
        request: {
          headers: {
            Authorization: 'kwngu4425h2',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/post`, {
        title: 'Fórmula 1',
        content: 'O campeão do ano!',
        categoryIds: [1],

      })
      .expect('status', 401)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Expired or invalid token')
      })
  })
})
