describe('DELETE /api/users/:id', () => {

    context('Remoção de Usuário', () => {
        let userId

        const user = {
            name: 'Bruna',
            email: 'bruna@gmail.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('deleteUser', user.email)

            cy.postUser(user).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id

            })

        })

        it('Deve remover um usuário existente', () => {
             cy.deleteUser(userId).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Usuário deletado com sucesso!')
            })
        })


        after(() => {       // Double Check: Garantindo que o registro foram removidos
            cy.getUsers().then(response => {

                const bruna = response.body.find(user => user.id === userId)
                expect(bruna).to.be.undefined

            })
        })
    })

    context('Quando o ID não existe' , () => {
                let userId

        const user = {
            name: 'Cristina',
            email: 'cristina@gmail.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('deleteUser', user.email)       // Deleta o usuário para certificar que não existe no banco para criá-lo

            cy.postUser(user).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id

            })  

             cy.task('deleteUser', user.email)  // Após criá-lo, deleta novamente

        })

        it('Deve retornar 404 e user not found', () => {
            cy.deleteUser(userId).then(response => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('User not found.')
            })
        })
    } )
})