
const faker = require('faker')
const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_CLIENTS ='http://localhost:3000/api/client/new'
const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'
const ENDPOINT_PUT_CLIENT = 'http://localhost:3000/api/client/1'

//Create a reandom client with Faker
function createRandClient(){
    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakeTelephone = faker.phone.phoneNumber()
    const payload = 
    {
       "name":fakeName,
       "email":fakeEmail,
       "telephone":fakeTelephone
    }

        return payload
}
//Verify faker client
function getClientAssertion(cy, name, email, telephone){

    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:
        {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email)
        expect(responseAsString).to.have.string(telephone)
    }))
    
}
//Create a new client and navigate to method 'delete'
function createClientRequestAndDelete(cy){
    cy.authenticateSession().then((response =>{

        let fakeClientPayload = createRandClient()
  
          cy.request({
              method: "POST",
              url: ENDPOINT_POST_CLIENTS,
              headers:{
                  'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                  'Content-Type': 'application/json'
              },
              body:fakeClientPayload
              
  
          }).then((response =>{
          
             const responseAsString = JSON.stringify(response)
             expect(responseAsString).to.have.string(fakeClientPayload.name)
            }))
  
          deleteRequestAfterGet(cy)
      }))


      

}


//Deletes a created client
function deleteRequestAfterGet(cy){

    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
       
        let lastId = response.body[response.body.length -1].id

        
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_CLIENT+lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            }


        })
    }))
}

//Show all clients
function getAllClientRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            }
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
           
            cy.log(responseAsString).lenght
        }))

    }))
}
//Creates a new client & asserts
function createClientRequest(cy){
    cy.authenticateSession().then((response =>{

        let fakeClientPayload = createRandClient()
  
          cy.request({
              method: "POST",
              url: ENDPOINT_POST_CLIENTS,
              headers:{
                  'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                  'Content-Type': 'application/json'
              },
              body:fakeClientPayload
  
          }).then((response =>{
          
             const responseAsString = JSON.stringify(response)
             expect(responseAsString).to.have.string(fakeClientPayload.name)
  
          }))
  
          getClientAssertion(cy, fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)
      }))  

}
//Changes clients credentials but i could not get ID to change or show, it just gets the ID deleted
function changeClientCredentials(cy){
    cy.authenticateSession().then((response =>{

        let fakeClientPayload = createRandClient()
        const payload = 
        {
            "id":1,
            "name":fakeName,
            "email":fakeEmail,
            "telephone":fakeTelephone
         }
     
  
          cy.request({
              method: "PUT",
              url: ENDPOINT_PUT_CLIENT,
              headers:{
                  'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                  'Content-Type': 'application/json'
              },
              body:fakeClientPayload
  
          }).then((response =>{
          
             const responseAsString = JSON.stringify(response)
             expect(responseAsString).to.have.string(fakeClientPayload.name)
  
          }))
  
         
      }))  

}

module.exports = { 
    createRandClient,
    createClientRequest,
    getClientAssertion,
    getAllClientRequest,
    createClientRequestAndDelete,
    changeClientCredentials
    }