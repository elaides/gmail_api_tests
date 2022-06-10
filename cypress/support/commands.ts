import './../fixtures/user_data'
Cypress.Commands.add("getAccessToken", () => {
    cy.fixture("user_data.json").then((user_data) => {
    return cy.request({
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v4/token',
        body: {
            client_id: user_data.client_id,
            client_secret: user_data.client_secret,
            refresh_token: user_data.refresh_token,
            grant_type: user_data.grant_type
        },
    })
    })
});

Cypress.Commands.add("sendEmail", (access_token, email_data, user_email) => {
    return cy.request({
        method: 'POST',
        url: 'https://gmail.googleapis.com/gmail/v1/users/' + user_email + '/messages/send',
        headers: {
            "Authorization": "Bearer " + access_token,
        },
        body: { "raw" : btoa(email_data).replace(/\+/g, '-').replace(/\//g, '_') }
    })
})

Cypress.Commands.add("getListOfMessages", (access_token, user_email) => {
    return cy.request({
        method: 'GET',
        url: 'https://gmail.googleapis.com/gmail/v1/users/' + user_email + '/messages',
        headers: { "Authorization": "Bearer " + access_token }
    })
})

Cypress.Commands.add("getMessageById", (access_token, user_email, message_id) => {
    return cy.request({
        method: 'GET',
        url: 'https://gmail.googleapis.com/gmail/v1/users/' + user_email + '/messages/' + message_id,
        headers: { "Authorization": "Bearer " + access_token },
        failOnStatusCode: false
    })
})

Cypress.Commands.add("deleteMessageById", (access_token, user_email, message_id) => {
    return cy.request({
        method: 'DELETE',
        url: 'https://gmail.googleapis.com/gmail/v1/users/' + user_email + '/messages/' + message_id,
        headers: { "Authorization": "Bearer " + access_token }
    })
})
