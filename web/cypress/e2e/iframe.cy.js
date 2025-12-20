describe('Iframe: Dar o Play no Vídeo', () => {
    it('Deve poder tocar o vídeo de exemplo', () => {

        cy.login()

        cy.contains('Video').click()

        cy.wait(3000)   // Estratégia de Think Time: Espera para garantir que o Iframe será carregado, evitando Intermitências 

        cy.get('iframe[title="Video Player"]',{timeout: 7000})      // Interagindo com Iframes
            .should('exist')
            .its('0.contentDocument.body')         // .its é uma função do cypress que pode ser usada para obter propriedades de elementos, objetos, janela, cookies e iframes.
            .then(cy.wrap)                         // 0.contentDocument.body pega o conteudo da página exibida dentro do Iframe na posição 0 do array de iframes
            .as('iFramePlayer')                  // cy.wrap é um recurso do cypress para pegar um valor de objeto, array ou de elementos que estão dentro de uma pág. HTML e transforma em objeto cypress.
                                                // .as('iFramePlayer') grava o objeto transformado em cypress


            cy.get('@iFramePlayer')     // busca o elemento .player-button dentro do iFramePlayer
            .find('.play-button')     
            .click()                    // Clica no Botão de Play

            cy.get('@iFramePlayer')     // Verifica se o botão de pause aparece
                .find('.pause-button')
                .should('be.visible')

        });
});