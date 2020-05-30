'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: "Distribuidora FastFeet",
          email: "admin@fastfeet.com",
          password_hash: bcrypt.hashSync("123456", 8),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: () => {}
};
