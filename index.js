//configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./moldels/Person')
const personRoutes = require('./routes/personRoutes')

//forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rota inicial / endpoint
app.use('/person', personRoutes)


//entregar uma porta
//conexção com o banco MongoDB (usuario: admin / senha: admin) Original string: mongodb+srv://admin:<password>@apicluster.ze8z1.mongodb.net/?retryWrites=true&w=majority
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${user}:${password}@apicluster.ze8z1.mongodb.net/bancodaapi?retryWrites=true&w=majority`
).then(() => {
    app.listen(3000)
    console.log('Conectamos ao MongoDB!')
}
).catch()
