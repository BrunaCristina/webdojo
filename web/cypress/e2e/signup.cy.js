import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Cadastro', () => {

    beforeEach(() => {

        cy.goToSignup()

        cy.intercept('POST', 'http://localhost:3333/api/users/register', {   // Interceptando a API externa, Simulando status 201 (criação)
            statusCode: 201,
            body: {
                message: 'Usuário Cadastrado com Sucesso!'
            }
        }).as('postSignup')

    });

     _.times(5, () => {   // Essa função Times executa um loop de acordo com a quantidade de vezes que é passado como argumento.
        it('Deve cadastrar Novos usuários com massa de teste Faker e usando o loop Lodash', () => {

            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'

            // cy.log(name)
            // cy.log(email)
            // cy.log(password)

            cy.get('#name').type(name)
            cy.get('#email').type(email)
            cy.get('#password').type(password)

            cy.contains('button', 'Criar conta').click()

            cy.wait('@postSignup')

            cy.contains('Conta criada com sucesso!').should('be.visible')
        })

    })

});