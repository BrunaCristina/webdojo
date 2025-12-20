const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    experimentalStudio: true,  // Para usar o Cypress Studio: Cypress > Settings > Project settings > Studio, Copia o código e habilita com true.
    video:true,                 // Gera Evidências em Vídeos
    baseUrl: 'http://localhost:3000', // Configura acesso ao endereço da aplicação de forma Global
    // viewportWidth: 1440,           // Configura o tamanho da janela web (responsividade padrão de um notebook)
    // viewportHeight: 900
  },
});
