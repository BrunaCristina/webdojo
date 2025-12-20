describe('Kanban Board', () => {
    it('Deve mover uma tarefa de To Do para Done e atualizar o Board', () => {
        
        cy.login()

        cy.contains('Kanban').click()

        const dataTransfer = new DataTransfer()     // DataTransfer é um recurso do javascript que serve para transferir um elemento HTML para outro elemento HTML.
        cy.contains('div[draggable="true"]', 'Documentar API')  // Não existe uma função dragdrop
            .trigger('dragstart',{dataTransfer})    // subfunção trigger do cypress que executa o comando javascript 'dragstart' passando o objeto criado, isso simula o selecionar e arrastar o Objeto.
        

        cy.get('.column-done')  // Simulando o Soltar o Objeto na coluna DONE
            .trigger('drop',{dataTransfer})
            .find('h3')
            .should('have.text','Done (4)')     // Confere se o contador passa a ser 4 após arrastar uma tarefa

            cy.get('.column-done')              // Conferindo o texto da coluna arrastada
            .and('include.text','Documentar API')
            .and('include.text','Criar documentação da API com Swagger')
    });
});