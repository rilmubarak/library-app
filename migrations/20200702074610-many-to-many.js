'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.addConstraint('UserBooks', {
      fields: ['BookId'],
      type: 'foreign key',
      name: 'custom_fkey_BookId',
      references: {
        table: 'Books',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .then(() =>{
      return queryInterface.addConstraint('UserBooks',{
        fields: ['UserId'],
        type: 'foreign key',
        name: 'custom_fkey_UserId',
        references: { 
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint('UserBooks','custom_fkey_BookId')
    .then(()=>{
      return queryInterface.removeConstraint('UserBooks','custom_fkey_UserId')
    })
  }
};
