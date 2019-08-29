'use strict';

const knex = require('knex');
const ShoppingListService = require('../src/shopping-list-service');

describe('Shopping List Service object', function () {
    let db;

    let testItems = [
        {
            id: 1,
            name: 'test item 1',
            price: 6.00,
            date_added: new Date(2018),
            checked: false,
            category: 'Main'
        },
        {
            id: 2,
            name: 'test item 2',
            price: 7.00,
            date_added: new Date(2017),
            checked: false,
            category: 'Main'
        },
        {
            id: 3,
            name: 'test item 3',
            price: 8.00,
            date_added: new Date(2016),
            checked: false,
            category: 'Main'
        },
        {
            id: 4,
            name: 'test item 4',
            price: 8.00,
            date_added: new Date(2015),
            checked: true,
            category: 'Main'
        },
        {
            id: 5,
            name: 'test item 5',
            price: 9.00,
            date_added: new Date(2014),
            checked: true,
            category: 'Main'
        },
    ];

    let expectedTestItems = [
        {
            id: 1,
            name: 'test item 1',
            price: "6.00",
            date_added: new Date(2018),
            checked: false,
            category: 'Main'
        },
        {
            id: 2,
            name: 'test item 2',
            price: "7.00",
            date_added: new Date(2017),
            checked: false,
            category: 'Main'
        },
        {
            id: 3,
            name: 'test item 3',
            price: "8.00",
            date_added: new Date(2016),
            checked: false,
            category: 'Main'
        },
        {
            id: 4,
            name: 'test item 4',
            price: "8.00",
            date_added: new Date(2015),
            checked: true,
            category: 'Main'
        },
        {
            id: 5,
            name: 'test item 5',
            price: "9.00",
            date_added: new Date(2014),
            checked: true,
            category: 'Main'
        },
    ];

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.DB_URL,
        })
    })

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
        })

        it(`'getShoppingList()' should return all items from 'shopping_list' table`, () => {
            return ShoppingListService.getShoppingList(db)
                .then(actual => {
                    expect(actual).to.eql(expectedTestItems)
                })
        })

        it(`'getById()' should return a single item that matches the inputted id from the "shopping_list" table`, () => {
            const itemId = 3;
            return ShoppingListService.getById(db, itemId)
                .then(actual => {
                    expect(actual).to.eql(expectedTestItems[itemId - 1])
                })
        }),

            it(`'updateItem()' should successfully update the data for the selected item in the "shopping_list" table`, () => {
                const itemOriginalState = expectedTestItems[4];
                const itemNewState = {
                    name: "updated name 5",
                }
                const expectedItemReturn = {
                    id: itemOriginalState.id,
                    name: itemNewState.name,
                    price: itemOriginalState.price,
                    date_added: itemOriginalState.date_added,
                    checked: itemOriginalState.checked,
                    category: itemOriginalState.category
                }

                return ShoppingListService.updateItem(db, itemOriginalState.id, itemNewState)
                    .then(() => ShoppingListService.getById(db, itemOriginalState.id))
                    .then(item => {
                        expect(item).to.eql(expectedItemReturn)
                    })
            })

        it(`'deleteItem()' should successfully delete the row for the selected item in the "shopping_list" table`, () => {
            const itemId = 2;
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getById(db, itemId))
                .then(item => {
                    console.log(item)
                    expect(item).to.eql()
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`'getShoppingList()' should return no items`, () => {
            return ShoppingListService.getShoppingList(db)
            .then((actual) => {
                expect(actual).to.eql([])
            })
        })

        it(`'getById()' should not come back with any item`, () => {
            return ShoppingListService.getById(db, 1)
            .then((actual) => {
                expect(actual).to.eql()
            })
        })

    })

    it(`'insertItem()' should properly insert a new item in the 'shopping_list' table`, () => {
        const newItem = {
            name: 'newItem',
            price: 11.11,
            date_added: new Date('2019-05-05T00:00:00.000Z'),
            checked: false,
            category: 'Main'
        }

        return ShoppingListService.insertItem(db, newItem)
            .then(actual => {
                expect(actual).to.eql({
                    id: 1,
                    name: newItem.name,
                    price: newItem.price.toString(),
                    date_added: newItem.date_added,
                    checked: newItem.checked,
                    category: newItem.category
                })
            })
    })

})