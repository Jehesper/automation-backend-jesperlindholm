/// <reference types="cypress" />
import * as billhelpers from '../helpers/billHelpers'

describe('Bills', function(){

it ('Create a Bill', function(){
    billhelpers.createBill(cy)
   
})
it ('Delete a Bill', function(){
    billhelpers.deleteBill(cy)
   
})
})