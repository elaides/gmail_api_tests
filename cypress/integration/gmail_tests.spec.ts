import './../support/commands.ts';

it('check that user can use gmail functionality being logged with google account', () => {
  cy.getAccessToken().then((response) => {
    cy.getListOfMessages(response.body.access_token, Cypress.env('user_email')).then(({ body }) => {
      expect(body.resultSizeEstimate).to.exist
    })
  })
})

it('check that email can be successfully sent', () => {
  const email_fields = {
    from: Cypress.env('user_email'),
    to: Cypress.env('user_email'), 
    subject: 'Email test',
  }
  let email_data_to_be_encoded = ''
  for (let field in email_fields) {
    email_data_to_be_encoded += field += ": " + email_fields[field] + "\r\n";
  }
  email_data_to_be_encoded += "\r\n" + "this is a test email.";
  cy.log(email_data_to_be_encoded[0])
  cy.getAccessToken().then((response) => {
    cy.sendEmail(response.body.access_token, email_data_to_be_encoded, Cypress.env('user_email'))
      .then(response => {
        expect(response.status).to.be.equal(200)
      })
  })
})

it('check that mail can be received', () => {
  cy.getAccessToken().then(response => {
    cy.getListOfMessages(response.body.access_token, Cypress.env('user_email')).then(({ body }) => {
      cy.getMessageById(response.body.access_token, Cypress.env('user_email'), body.messages[0].id)
        .then(response => {
          expect(response.body.payload.headers[1].value).to.eq(Cypress.env('user_email'))
          expect(response.body.payload.headers[2].value).to.eq(Cypress.env('user_email'))
          expect(response.body.payload.headers[3].value).to.eq("Email test")
        })
    })
  })
})

it('check that mail can be deleted', () => {
  cy.getAccessToken().then(response => {
    cy.getListOfMessages(response.body.access_token, Cypress.env('user_email')).then(({ body }) => {
      cy.deleteMessageById(response.body.access_token, Cypress.env('user_email'), body.messages[0].id);
      cy.getMessageById(response.body.access_token, Cypress.env('user_email'), body.messages[0].id)
        .then(response => {
          expect(response.status).to.eq(404)
      })
    })
  })
})
