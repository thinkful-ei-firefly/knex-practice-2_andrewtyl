'use strict'

const ShoppingListService = {
    getShoppingList(knex) {
        return knex.select('*').from('shopping_list')
    },

    insertItem(knex, newItem) {
        return knex
            .insert(newItem)
            .into('shopping_list')
    },

    updateItem(knex, id, newFields) {
        return knex('shopping_list')
            .where({ id })
            .update(newFields)
    },

    deleteItem(knex, id) {
        return knex('shopping_list')
            .where({ id })
            .delete()
    }
}

module.exports = ShoppingListService;