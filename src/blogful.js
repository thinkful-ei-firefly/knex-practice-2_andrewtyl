'use strict';

const env = require('dotenv').config();
const knex = require('knex');
const ArticlesService = require('./articles-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
  });
  
  console.log('connection successful');

  console.log(ArticlesService.getAllArticles());