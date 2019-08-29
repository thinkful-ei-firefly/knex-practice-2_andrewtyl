'use strict'

const ShoppingListService = {
    getShoppingList(knex) {
        return knex.select('*').from('shopping_list')
    },

    insertItem(knex, newItem) {
        return knex
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
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
    },

    getById(knex, id) {
        return knex.from('shopping_list').select('*').where('id', id).first()
    }
}

module.exports = ShoppingListService;