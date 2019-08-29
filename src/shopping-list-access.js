'use strict';

require('dotenv').config();
const knex = require('knex');
const ShoppingListService = require('./shopping-list-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

ShoppingListService.getShoppingList(knexInstance)
    .then(items => {
        console.log(items)
        return;
    })

    //Remove or Comment out remainder of code if you do not want Node to stop running on completion.
    .then(x => {
        process.exit()
    });