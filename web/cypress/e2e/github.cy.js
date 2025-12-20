describe('Gerenciamento de Perfis no Github - Validando Registros em TABELAS', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    });

    it('Deve poder Cadastrar um novo Perfil no GitHub', () => {

        // Cadastrando Perfil 01:
        cy.get('#name').type('Fernando Papito')
        cy.get('#username').type('papitodev')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        // Cadastrando Perfil 02:
        cy.get('#name').type('Fernando Papito')
        cy.get('#username').type('qapapito')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        // Validando o Cadastro do Perfil 01:

        cy.contains('table tbody tr', 'papitodev') //table/tbody/tr/..//td[text()="Fernando Papito"]
            .should('be.visible')
            .as('trProfile')           // Fixando a Linha pelo identificador único que é o username 

        cy.get('@trProfile')        // Validando as demais colunas com base na linha de referência, pois validando a linha certa, não pega os elementos gerais que estão na tabela e sim por linha.
            .contains('td', 'Fernando Papito')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('td', 'QA')
            .should('be.visible')
    });

    it('Deve poder Excluir um Perfil do GitHub/Registro da Tabela', () => {

        // Massa de teste do dado que desejo excluir:
        const profile = {
            name: 'Fernando Papito',
            username: 'papito123',
            description: 'QA'
        }

        // Cadastrando Perfil para exclusão:
        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.description)

        cy.contains('button', 'Adicionar Perfil').click()

        // Identificando o que será excluído:
        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('button[title="Remover perfil"]').click()

        // Validando a Exclusão:
        cy.contains('table tbody', profile.username)
            .should('not.exist')

    })


      it('Deve validar o link do GitHub - Redirecionamento/NovaAba', () => {

        // Massa de teste do dado que desejo excluir:
        const profile = {
            name: 'Fernando Papito',
            username: 'papitodev',
            description: 'QA'
        }

        // Cadastrando Perfil para exclusão:
        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.description)

        cy.contains('button', 'Adicionar Perfil').click()

        // Identificando o elemento:
        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

         // Validar que clicou no link (o Cypress não tem suporte para trabalhar com múltiplas abas e janelas, então, não valida a janela que abriu em si)
        cy.get('@trProfile')
            .find('a')
            .should('have.attr','href','https://github.com/papitodev')  // Verifica se há dentro da linha da tabela com dado passado um elemento "a", com atributo href com o link passado.
            .and('have.attr', 'target', '_blank')    // e verifica que tem o atributo target="_blank" que é o que garante que irá abrir o link em nova aba.
    
    })

    
});