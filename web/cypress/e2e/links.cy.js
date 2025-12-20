describe('Links abrindo em Nova Guia/Janela', () => {

    beforeEach(() => {
        cy.login()
    });

    it('Validando o atributo do link do Instagram', () => {

        cy.get('[data-cy="instagram-link"]')    // usando o localizador do cypress
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')      // Valida um atributo e seu valor
            .should('have.attr', 'target', '_blank')
    });

    it('Acessa link de termos de uso removendo o target blank', () => {

        cy.goTo('Formulários', 'Consultoria')

        cy.contains('a', 'termos de uso')
            .invoke('removeAttr', 'target') // Invoca a Função remoteAttr que remove um atributo especificado. 
            .click()

        cy.contains('Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.')
            .should('be.visible')
    });
});