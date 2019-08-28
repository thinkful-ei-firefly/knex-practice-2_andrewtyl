/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
'use strict';

const env = require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

console.log('connection successful');


function searchName(searchTerm) {
  knexInstance.from('shopping_list')
    .select('name', 'price', 'category', 'checked', 'date_added')
    .from('shopping-list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}

function paginateAll(pageNum) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNum - 1);
  knexInstance
    .select('name', 'price', 'category', 'checked', 'date_added')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}

function itemsAddedAfter(daysAgo) {
  let cutoff = `now() - '${daysAgo} days'::INTERVAL`;
  knexInstance
    .select('name', 'price', 'category', 'checked', 'date_added')
    .from('shopping_list')
    .where('date_added', '>=', knexInstance.raw(cutoff))
    .then(result => {
      console.log(result);
    });
}

function totalCost() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log('COST PER CATEGORY');
      console.log(result);
    });
}

totalCost();