describe('Simulando Mouseover', () => {
    // Por enquanto o Cypress não tem suporte pra mouseover
    it('Deve mostrar um texto ao passar o mouse em cima do link do instagram', () => {
        cy.login()

        cy.wait(3000)
		cy.contains('Isso é Mouseover!').should('not.exist')  // Certifica que não existe esse texto na tela enquanto não passar o mouse
		cy.get('[data-cy="instagram-link"]').realHover()	
		cy.contains('Isso é Mouseover!').should('exist')	  // Certifica do texto escrito ao passar o mouse

    });
    
});