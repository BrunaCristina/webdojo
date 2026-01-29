import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe(' Expert com invoke', () => {

    beforeEach(() => {
        cy.start()
    });

    it('Deve manipular os atributos de elementos do HTML usando invoke', () => {

        cy.get('#email').invoke('val', 'papito@teste.com.br')
        cy.get('#password').invoke('val', 'pwd123')

        cy.get('#password').invoke('attr', 'type', 'text') // Pega o elemento type e muda para texto ao invés de password

        //   cy.get('#password').invoke('removeattr','class')   // Remove um atributo class

        //    cy.get('#password').invoke('attr','name','senha')    // Adicionando um atributo name com o valor senha.

        // cy.contains('button', 'Entrar').invoke('hide').should('not.be.visible')         // Oculta um elemento

        // cy.contains('button', 'Entrar').invoke('show').should('be.visible')          // Mostra um elemento

        cy.contains('button', 'Entrar')
    })


    it('Não deve logar senha inválida', () => {

        cy.submitLoginForm('papito@webdojo.com', 'katana000')


        // cy.wait(2500)       // Estratégia usada para testar o toast(elemento flutuante) que aparece na página e some em poucos segundos, depois de gerar o documento,o código pode ser removido.
        // cy.document().then((doc) =>{
        //     cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML)  // Pega todo documento, HTML da página e guarda dentro do arquivo page.html, dando para avaliar e montar a estratégia de testes.
        // })

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000) // Esperando o toast sumir da página

        // DOM = Document Object Model, página HTML
        // should('not.be.visible') = Deve ser usados em elementos que existem na página HTML mas que estão invisíveis.
        // should('not.exist') = Deve ser usados em elementos que são removidos da página, deixam de existir.

        cy.get('@toast')
            .should('not.exist')

    })


    it('Simulando a Tecla TAB com o cy.press() ', () => {
        //  Técnicas que podem ser usadas para testes de Acessbilidade:

        cy.get('body').press('Tab') // Observando que ao carregar a página manualmente e apertar Tab, o cursor vai para o campo e-mail
        cy.focused().should('have.attr', 'id', 'email')     // Focused retorna o campo que está com foco, aqui certifica que o campo deve ser o email

        cy.get('#email').type('papito@webdojo.com').press('Tab')   // Com o cursor já no email, ele pula para o campo senha.
        cy.focused().should('have.attr', 'id', 'password')

        cy.get('#password').type('katana123{Enter}')        // Simula a tecla ENTER após digitar a Senha


    })

    it('Deve realizar uma Carga de Dados usando Faker e Lodash', () => {

        _.times(5, () => {   // Essa função Times executa um loop de acordo com a quantidade de vezes que é passado como argumento.

            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'
    
            cy.log(name)
            cy.log(email)
            cy.log(password)
        })

    })
})