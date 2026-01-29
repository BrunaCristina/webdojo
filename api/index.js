
// --------------------- Código de Conexão Prisma com Banco ------------------

const express = require('express')
const cors = require('cors')
const prisma = require('./prismaClient') // ajuste o caminho se necessário

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
    console.log(err)

    if (err instanceof SyntaxError) {    // Se for erro de sintaxe
        return res.status(400).json({ error: 'Invalid JSON format.' })
    }
    next()  // Next é uma função que faz com que o Express passe para o proximo bloco de código que deve ser executado.


})


app.get('/', (req, res) => {
    res.json({ message: 'API do Curso Ninja do Cypress' })
})

app.post('/api/users/register', async (req, res) => {


    const { name, email, password } = req.body

    // Validações
    if (!name) {
        return res.status(400).json({ error: 'O Nome é obrigatório!' })
    }
    if (!email) {
        return res.status(400).json({ error: 'O Email é obrigatório!' })
    }
    if (!password) {
        return res.status(400).json({ error: 'A Senha é obrigatória!' })
    }

    try {

        // Criar usuário
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password // Em produção deve-se criptografar 
            }
        })

        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        if (error.code === 'P2002') {   //P20002 é o código padrão de e-mail duplicado
            return res.status(409).json({ error: 'Email já está em uso!' })
        }
        console.error(error)
        return res.status(500).json({ error: 'Erro interno do servidor' })

    }
})


app.get('/api/users', async (req, res) => {          // Deve especificar que o js é assincrona, e deve-se esperar (await) que as informações sejam executadas
    try {
        const users = await prisma.user.findMany({          // a função findMany acha qualquer registro dentro da tabela de usuários
            select: {
                id: true,       // Passa todos os campos que deseja que seja retornados
                name: true,
                email: true,
                password: false
            }
        })

        res.status(200).json(users)     // A resposta com status 200 passando o objeto que vai ser convertido para json

    } catch (error) {
        res.status(500).json({ error: 'Error fetching users.' })
    }
})

app.put('/api/users/:id', async (req, res) => {

    const { id } = req.params
    const { name, email, password } = req.body

    // Validações
    if (!name) {
        return res.status(400).json({ error: 'O Nome é obrigatório!' })
    }
    if (!email) {
        return res.status(400).json({ error: 'O Email é obrigatório!' })
    }
    if (!password) {
        return res.status(400).json({ error: 'A Senha é obrigatória!' })
    }

    try {

        const user = await prisma.user.findUnique({  // Antes de tentar deletar, irá buscar um registro com o mesmo ID guardando na costante
            where: { id: Number(id) }
        })

        if (!user) {     // Se for nulo retorna 404
            return res.status(404).json({ error: 'User not found.' })
        }

        await prisma.user.update({
            where: { id: Number(id) },  // Procura pelo ID convertido para númerico
            data: {
                name, email, password       // Dados que irão ser atualizados
            }
        })

       res.status(204).end()

    } catch (error) {
        res.status(500).json({ error: 'Error updating user :( ' })
    }
})

app.delete('/api/users/:id', async (req, res) => {

    const { id } = req.params

    try {

        const user = await prisma.user.findUnique({  // Antes de tentar deletar, irá buscar um registro com o mesmo ID guardando na costante
            where: { id: Number(id) }
        })

        if (!user) {     // Se for nulo retorna 404
            return res.status(404).json({ error: 'User not found.' })
        }

        await prisma.user.delete({ where: { id: Number(id) } }) // Convertendo o ID para número inteiro
       // return res.status(204).end()

        return res.status(200).json({ message: 'Usuário deletado com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user :( ' })
    }
})

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
})




