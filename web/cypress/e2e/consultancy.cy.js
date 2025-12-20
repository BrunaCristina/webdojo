import { personal, company } from '../fixtures/consultancy.json'   // importando a massa de dados gerada


describe('Formulário de Consultoria', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')

    })

    it('Deve solicitar consultoria Individual', () => {

        cy.fillConsultancyForm(personal)

        cy.submitConsultancyForm()

        cy.validadeConsultancyModal()

    });

    it('Deve solicitar consultoria In Company', () => {

        cy.fillConsultancyForm(company)

        cy.submitConsultancyForm()

        cy.validadeConsultancyModal()
    });


    // Testando Mensagens de Erro e Cores CSS
    it('Deve verificar os campos obrigatórios', () => {

        cy.submitConsultancyForm()

        // Criando Array para validar as Asserções de campo obrigatório
        const requiredFields = [
            { label: 'Nome Completo', message: 'Campo obrigatório' },
            { label: 'Email', message: 'Campo obrigatório' },
            { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' }
        ]

        // Asserções:
        requiredFields.forEach(({ label, message }) => {

            cy.contains('label', label)       //label[text()="Nome Completo *"]/ ..//p
                .parent()
                .find('p')
                .should('be.visible')
                .should('have.text', message)
                .and('have.class', 'text-red-400')                   // valida o nome da classe que foi criada em Estilo para a cor Vermelha
                .and('have.css', 'color', 'rgb(248, 113, 113)')    // valida se a cor de fato é a vermelha
        })

    })



});