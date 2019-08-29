'use strict';

const knex = require('knex');
const ShoppingListService = require('../src/shopping-list-service');

describe('test can function', function () {
    let db;

    let testItems = [
        {
            id: 1,
            name: 'test item 1',
            price: 6,
            date_added: new Date(2018),
            checked: false,
            category: 'Main'
        },
        {
            id: 2,
            name: 'test item 2',
            price: 7,
            date_added: new Date(2017),
            checked: false,
            category: 'Main'
        },
        {
            id: 3,
            name: 'test item 3',
            price: 8,
            date_added: new Date(2016),
            checked: false,
            category: 'Main'
        },
        {
            id: 4,
            name: 'test item 4',
            price: 8,
            date_added: new Date(2015),
            checked: true,
            category: 'Main'
        },
        {
            id: 5,
            name: 'test item 5',
            price: 9,
            date_added: new Date(2014),
            checked: true,
            category: 'Main'
        },
    ];

    function purge() {
        db('shopping_list').truncate()
    }

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    before(() => purge())
    
    afterEach(() => purge())

    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert
        })
    })

})