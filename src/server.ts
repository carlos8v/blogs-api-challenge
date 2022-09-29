import express from 'express'

export const app = express()

app.use(express.json())

// Não remova esse endpoint para o avaliador funcionar
app.get('/', (_request, response) => {
  return response.send()
})
