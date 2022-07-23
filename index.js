//configuração inicial
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
const user = 'admin'
const password = 'admin'

mongoose.connect(`mongodb+srv://${user}:${password}@apicluster.ze8z1.mongodb.net/bancodaapi?retryWrites=true&w=majority`
).then(() => {
    app.listen(3000)
    console.log('Banco de dados conectado com sucesso!')
}
).catch()
