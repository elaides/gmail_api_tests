// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
declare global {
    namespace Cypress {
      interface Chainable {
         getAccessToken(): Chainable<Response<any>>,
         sendEmail(access_token, email_data, user_email): Chainable<Response<any>>,
         getListOfMessages(access_token, user_email): Chainable<Response<any>>,
         getMessageById(access_token, user_email, message_id): Chainable<Response<any>>
         deleteMessageById(access_token, user_email, message_id): Chainable<Response<any>>,
      }
    }
  }