import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Não remova esse endpoint para o avaliador funcionar
app.get('/', (_request, response) => {
  return response.send()
})

app.listen(port, () => console.log(`Servidor aberto na porta ${port}!`))
