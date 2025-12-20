Cypress.Commands.add('fillConsultancyForm', (form) => {  // Criando Comando Personalizado (Custom Commands)

    cy.get('#name').type(form.name)
    cy.get('input[placeholder="Digite seu email"]').type(form.email)  //exemplo que nao pega pelo ID

    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.phone)
    //    .should('value', '(31) 92244-5577') // garante que o formato preenchido é o esperado.


    cy.get('#consultancyType').select(form.consultancyType)   // Interagindo com Caixa/Seleção de Opções (pode selecionar pelo nome, value ou label)  


    if (form.personType === 'cpf') {
        // Pelo xPath (usado em selenium) o identificador ficaria: //span[text()="Pessoa Física"]/..//input
        cy.contains('span', 'Pessoa Física')   // Interagindo com RadioButton
            .parent()
            .find('input')
            .check()    // Poderia ser click() também
            .should('be.checked')

        // Garantindo que se uma opção está marcada, a outra deve estar desmarcada:
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked') // garante que não foi marcada

        //  Por busca Pai pra Filho (recomendado caso não tenha ID)
        cy.contains('label', 'CPF')     
            .parent()
            .find('input')
            .type(form.document)
        //   .should('value', '917.778.870-20')

    } else if (form.personType === 'cnpj') {

        cy.contains('span', 'Pessoa Jurídica')
            .parent()
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')


         cy.contains('label', 'CNPJ')      
            .parent()
            .find('input')
            .type(form.document)
    }




    // Interagindo com checkbox (Múltipla escolha):
    form.discoveryChannels.forEach((channel) => {

        cy.contains('span', channel)        //  estrutura:  //span[text()="Instagram"]/..//input
            .parent()
            .find('input')
            .check()
            .should('be.checked')

    })

    // Interagindo com elemento que faz Upload de Arquivos (interagir com o elemento escondido (normalmente fica class='hidden') do tipo file):
    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true }) // Força o Cypress pegar o PDF colocado na pasta Fixtures e interagir com o botão escondido (hidden)


    // Interagindo com área de texto
    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)


    //  Interagindo com Array de Tags e Simulando o Teclado Físico:
    form.techs.forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')    // Simula a Tecla física ENTER

        // Validando a TAG adicionada:  //label[text()="Tecnologias"]/..//span[text()="Cypress"]
        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')

    })

    // Interagindo com Check de Termos de Uso e Submissão de Formulário
    if (form.terms === true) {
        cy.contains('label', 'Li e aceito os')
            .find('input')
            .check()
            .should('be.checked')
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {

    cy.contains('button', 'Enviar formulário').click()

})

Cypress.Commands.add('validadeConsultancyModal', () => {

        // Verificando Escrita no Modal após envio
        cy.get('.modal', { timeout: 7000 }) // Começa com . é um seletor CSS, busca modal entre as classes. Timeout Explícito pois demora a encontrar o elemento modal nesse caso.
            .should('be.visible')
            .find('.modal-content') // Procurando dentro da classe pai, usa-se uma classe de estilização porém com nome coerente
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')


        // Fechando Modal
        cy.wait(3000)

        cy.contains('button', 'Fechar').click()

})
