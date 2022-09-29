import { describe, it, beforeAll, expect } from 'vitest'
import frisby from 'frisby'

import seedDatabase from './db/seed'
import { truncateDatabase } from './db/utils'

const url = 'http://localhost:3000'

describe('2 - Sua aplicação deve ter o endpoint POST `/login`', () => {
  beforeAll(async () => {
    await truncateDatabase()
    await seedDatabase()
  })

  it('Será validado que é possível fazer login com sucesso', () => {
    return frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { json } = response
        expect(json).not.toBeNull()
      })
  })

  it('Será validado que não é possível fazer login sem o campo `email`', () => {
    return frisby
      .post(`${url}/login`,
        {
          password: '123456',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('"email" is required')
      })
  })

  it('Será validado que não é possível fazer login sem o campo `password`', () => {
    return frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('"password" is required')
      })
  })

  it('Será validado que não é possível fazer login com o campo `email` em branco', () => {
    return frisby
      .post(`${url}/login`,
        {
          email: '',
          password: '123456',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('"email" is not allowed to be empty')
      })
  })

  it('Será validado que não é possível fazer login com o campo `password` em branco', () => {
    return frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
          password: '',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('"password" is not allowed to be empty')
      })
  })

  it('Será validado que não é possível fazer login com um usuário que não existe', () => {
    return frisby
      .post(`${url}/login`,
        {
          email: 'senna@gmail.com',
          password: '123456',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('Invalid fields')
      })
  })
})
