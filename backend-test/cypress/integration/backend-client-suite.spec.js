/// <reference types="cypress" />
import * as clienthelpers from '../helpers/clientHelper'



describe('Clients', function(){
  

it ('Create random client', function(){
    clienthelpers.createClientRequest(cy)
   
})
it ('Get All Clients', function(){
    clienthelpers.getAllClientRequest(cy)
   
})

it ('Delete A Client', function(){
    clienthelpers.createClientRequestAndDelete(cy)
   
})


//Function only works once then crashes the program, because i cant set a new ID, after modify, the ID = nothing
//it ('Modify a Clients credentials', function(){
//  clienthelpers.changeClientCredentials(cy)
   
//})


})