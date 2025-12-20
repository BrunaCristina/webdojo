import address from '../fixtures/cep.json'

describe('CEP', () => {

    beforeEach(() => {
        cy.login(true)
        cy.goTo('Integração', 'Consulta de CEP')
    });

    it('Deve Validar a Consulta de CEP', () => {

        cy.intercept('GET', `https://viacep.com.br/ws/${address.cep}/json/`, { // Passa: o Tipo de Requisição HTTP, Endpoint e um Bloco com o Status Code e Body do endpoint externo
            statusCode: 200,
            body: {
                logradouro: address.street,     // Boas práticas: Nomear os atributos de acordo com o que o endpoint externo retorna
                bairro: address.neighborhood,
                localidade: address.city,
                uf: address.state
            }
        }).as('getCEP')   

        cy.get('#cep').type(address.cep)
        cy.contains('button', 'Buscar').click()

        cy.wait('@getCEP')  // Aguarda para que a interceptação ocorra e faça a troca de status code com sucesso.

        // Validando os Campos Buscados:
        cy.get('#street')
            .should('have.value', address.street)

        cy.get('#neighborhood')
            .should('have.value', address.neighborhood)

        cy.get('#city')
            .should('have.value', address.city)

        cy.get('#state')
            .should('have.value', address.state)
    });
});