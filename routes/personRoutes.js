const router = require('express').Router()
const Person = require('../moldels/Person')

//salvar
router.post('/', async (req, res) => {

    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//buscar todos
router.get("/", async (req, res) => {
    try {

        const people = await Person.find()
        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//buscar um
router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {

        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(500).json({ message: "Nenhuma pessoa encontrada com este id." })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Editar
router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const { name, salary, approved } = req.body
    const person = {
        name,
        salary,
        approved
    }

    try {

        const updatedPerson = await Person.updateOne({ _id: id }, person) //quando não encontra não traz null e sim dá erro.

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'Pessoa não encontrada para fazer a atualização.' })
            return
        }

        res.status(200).json({ person })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//deletar
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findByIdAndDelete(id)
        res.status(200).json({message: `A pessoa com o id ${id} foi removida.`})
        
    } catch (error) {
        res.status(500).json({error : error})
    }
   

   
})

module.exports = router