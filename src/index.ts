import * as dotenv from 'dotenv'
dotenv.config()

import { app } from './server'

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Servidor aberto na porta ${port}!`))
