const { defineConfig } = require("cypress");

const {deleteUserByEmail} = require('./cypress/support/database')   // importa a função deleteUserByEmail dentro de cypress.config.js através do require

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {  // Criado o listener chamado ON para executar uma task 
        deleteUser(email){
         return deleteUserByEmail(email)
        }
      })
    },
    baseUrl: 'http://localhost:3333'  // acrescentado url base para globalizar em commands 
  },
});
