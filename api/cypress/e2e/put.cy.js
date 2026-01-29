describe('PUT /api/users/:id ', () => {

    context('Atualização de Dados do Usuário', () => {

        let userId

        const originalUser = {
            name: 'Peter Parker',
            email: 'paker@stark.com',
            password: '123456'
        }

        const updateUser = {
            name: 'Spiderman',
            email: 'spider@marvel.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('deleteUser', updateUser.email) // Deleta o Cadastro atualizado e o original para não se ter duplicação
            cy.task('deleteUser', originalUser.email)
            cy.postUser(originalUser).then(response => {    // cadastra o usuário original e mostra o id dele e coloca na variavel
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })
        })

        it('Deve atualizar um usuário existente', () => {

            cy.putUser(userId, updateUser).then(response => {
                expect(response.status).to.eq(204)
            })
        })

        after(() => {       // Garantindo que os dados realmente foram alterados
            cy.getUsers().then(response => {

                const spider = response.body.find(user => user.id === userId)
                expect(spider).to.exist
                expect(spider.name).to.eq(updateUser.name)
                expect(spider.email).to.eq(updateUser.email)
            })
        })

    })

    context('Quando o ID não existe', () => {
        let userId

        const originalUser = {
            name: 'Caroline',
            email: 'carol@gmail.com',
            password: '123456'
        }

        const updateUser = {
            name: 'Luisa',
            email: 'luisa@gmail.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)       
            cy.task('deleteUser', updateUser.email) 

            cy.postUser(originalUser).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id

            })

            cy.task('deleteUser', originalUser.email)  // Após criá-lo, deleta novamente
        })

        it('Deve retornar 404 e user not found', () => {
            cy.api({
                method: 'PUT',
                url: 'http://localhost:3333/api/users/' + userId,
                headers: {
                    'Content-Type': 'application/json'
                },

                body: updateUser,
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('User not found.')
            })
        })
    })

    context('Campos Obrigatórios', () => {

        it('O Campo Name deve ser obrigatório', () => {

            const user = {
                email: 'brunagomes@teste.com',
                password: 'pwd123'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('O Nome é obrigatório!')

            })
        })

        it('O Campo Email deve ser obrigatório', () => {

            const user = {
                name: 'André Gomes',
                password: 'pwd123'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('O Email é obrigatório!')

            })
        })

        it('O Campo Senha deve ser obrigatório', () => {

            const user = {
                name: 'Luisa Gomes',
                email: 'luisagomes@teste.com'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('A Senha é obrigatória!')

            })
        })


        it('Não deve passar quando o JSON está mal formatado', () => {

            const user = `{
                name: 'Caroline Gomes',
                email: 'carolgomes@teste.com'
                password: 'pwd123'

            }`

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('Invalid JSON format.')

            })
        })
    })
})