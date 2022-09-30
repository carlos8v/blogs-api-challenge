import { describe, it, beforeEach, expect } from 'vitest'

import supertest from 'supertest'

import { truncateDatabase } from './db/utils'

import { app } from '../src/server'

describe('1 - Sua aplicação deve ter o endpoint POST `/user`', () => {
  beforeEach(async () => {
    await truncateDatabase()
  })

  it('Será validado que é possível cadastrar um usuário com sucesso', async () => {
    const { body, status } = await supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: 'rubinho@gmail.com',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
      })

    expect(status).toBe(201)
    expect(body.token).not.toBeNull()
  })

  it('Será validado que não é possível cadastrar usuário com o campo `displayName` menor que 8 caracteres', async () => {
    const { body, status } = await supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho',
        email: 'rubinho@gmail.com',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"displayName" length must be at least 8 characters long')
  })

  it('Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: rubinho`', async () => {
    const { body, status } = await supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: 'rubinho',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"email" must be a valid email')
  })

  it('Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: @gmail.com`', async () => {
    const { body, status } = await supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: '@gmail.com',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"email" must be a valid email')
  })

  it('Será validado que o campo `email` é obrigatório', async () => {
    const { body, status } = await supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"email" is required')
  })

  it('Será validado que não é possível cadastrar usuário com o campo `password` menor que 6 caracteres', async () => {
    const { body, status } = await supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: 'rubinho@gmail.com',
        password: '12345',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"password" length must be 6 characters long')
  })

  it('Será validado que o campo `password` é obrigatório', async () => {
    const { body, status } = await supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: 'rubinho@gmail.com',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
      })

    expect(status).toBe(400)
    expect(body.message).toBe('"password" is required')
  })

  it('Validar que não é possível cadastrar um usuário com email já existente', async () => {
    const { status: createStatus } = await supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: 'rubinho@gmail.com',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
      })

    expect(createStatus).toBe(201)

    const { body, status } = await supertest(app)
      .post('/user')
      .send({
          displayName: 'Rubinho Barrichello',
          email: 'rubinho@gmail.com',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })

    expect(status).toBe(409)
    expect(body.message).toBe('User already registered')
  })
})
