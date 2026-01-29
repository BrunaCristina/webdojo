import {dataHoje} from "../support/actions/utils"

describe('Login', () => {

     it('Deve logar com sucesso', () => {

    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123') // Chamada Função geral em Commands.js

    // Para confirmar que entrou e fez o Login, adotou-se a estratégia de ler algo na página:
    cy.get('[data-cy="user-name"]')  // Propriedade data-cy criada para facilitar e identificar, sugerir sempre ter. 
      .should('be.visible')
      .and('have.text', 'Fernando Papito')


    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    cy.getCookie('login_date').should('exist')  // Validando se o Cookie que é adicionado ao fazer Login com sucesso na aplicação existe

    cy.getCookie('login_date').should((cookie) => {   // valida o valor (data do login) do cookie
      expect(cookie.value).to.eq(dataHoje())
    })

    // Validando o token que é adicionado em Local Storage:
    cy.window().then((win) => {  // .window para ter acesso aos recursos do navegador em tempo de execução.
      const token = win.localStorage.getItem('token')        // localStorage é uma função do javascript que obtem e armazena valores no local storage do navegador.

      expect(token).to.match(/^[a-fA-F0-9]{32}$/)       // Expressão regular para validação de token no formato MD5
    })

  })


  it('Não deve logar senha inválida', () => {

    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana000')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })


  it('Não deve logar com email não cadastrado', () => {

    cy.start()
    cy.submitLoginForm('bruna@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

})