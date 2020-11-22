const ENDPOINT_POST_BILL = 'localhost:3000/api/bill/new'
const ENDPOINT_DELETE_BILL = 'http://localhost:3000/api/bill/'
const ENDPOINT_GET_BILLS = 'http://localhost:3000/api/bills'
//Create Bill values
function createRandBill(){
 

    const payload = 
    {
       "value": 1000,
       "paid": true,
       
    }

        return payload
}
//Creates a bill
function createBill(cy){
    cy.authenticateSession().then((response =>{

        let fakeBill = createRandBill()
  
          cy.request({
              method: "POST",
              url: ENDPOINT_POST_BILL,
              headers:{
                  'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                  'Content-Type': 'application/json'
              },
              body:fakeBill
  
          }).then((response =>{
          
             const responseAsString = JSON.stringify(response)
             expect(responseAsString).to.have.string(fakeBill.value)
  
          }))
  
      }))  

}
//Deletes a bill
function deleteBill(cy){

   
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_BILLS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
       
        let lastId = response.body[response.body.length -1].id

        
        cy.request({
            method: "DELETE",
            url: ENDPOINT_DELETE_BILL+lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            }


        })
    }))
}
module.exports = { 
 createBill,
 createRandBill,
 deleteBill
    }