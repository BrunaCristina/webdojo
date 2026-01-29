// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-real-events'
import './actions/consultancy.actions'
import { dataHoje } from "../support/actions/utils"   // importando a função que retorna a data atual

Cypress.Commands.add('start', () => {
    cy.visit('')    // Endereço da aplicação foi configurado de modo Global em cypress.config.js

})

Cypress.Commands.add('goToSignup', () => {
    cy.start()
    cy.get('a[href="/register"]').click()   // Clicando no botão Cadastre-se
    cy.contains('h2', 'Crie sua conta')
        .should('be.visible')
})

Cypress.Commands.add('submitLoginForm', (email, senha) => {

    cy.get('#email').type(email)    // OBS.: Inspecionar o código para verificar e pegar Identificadores unicos (IDs).
    cy.get('#password').type(senha)

    cy.contains('button', 'Entrar').click()

})

Cypress.Commands.add('goTo', (buttonName, pageTitle) => { // Para ir para qualquer botão, opções do site'

    cy.contains('button', buttonName)
        .should('be.visible')
        .click()

    cy.contains('h1', pageTitle)
        .should('be.visible')
})


// Helpers
Cypress.Commands.add('login', (ui = false) => {

    if (ui === true) {     // Faz Login pela Interface Gráfica
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
    } else {  // Faz Login via Cookie e LocalStorage

        //Armazenando itens no cookie e no LocalStorage para acelerar o processo de Login (sem precisar de ir pela interface)
        const token = 'e1033d63a53fe66c0fd3451c7fd8f617'
        const loginDate = dataHoje()

        cy.setCookie('login_date', loginDate)

        cy.visit('/dashboard', {
            onBeforeLoad(win) {     // Antes de Carregar a página, antes da função ser executada, seta o Token na sessão do navegador 
                win.localStorage.setItem('token', token)
            }
        })

    }
})

