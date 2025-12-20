describe('Validações de Alertas em JavaScript', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    });

    it('Deve validar a mensagem de Alerta', () => {

        cy.on('windows:alert', (msg) => {   // Cria-se um Ouvinte para ficar "ouvindo", esperando a ação ocorrer o windows:alert. Antes de clicar no botão.
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')   // valida se a mensagem de alerta tem esse texto
        })

        cy.contains('button', 'Mostrar Alert').click()
    });

    it('Deve Confirmar um diálogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return true        // TRUE Simula o clique no botão OK 
        })

        // Validando a Mensagem de Alerta ao clicar no OK
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve Cancelar um diálogo e validar a resposta negativa', () => {

        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return false        // FALSE Simula o clique no botão CANCELAR 
        })

        // Validando a Mensagem de Alerta ao clicar no OK
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve Interagir com o prompt, inserir um texto e validar uma mensagem', () => {

        // Chama a função window que acessa a janela do navegador, chama uma callback (then) e dentro passa win para ter acesso ao objeto e manipular a janela do navegador
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Bruna')     //Stub vai simular o comportamento da função Prompt dentro da janela do navagador (win) e escrever algo.
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Bruna! Boas-vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()
    })



});