import bcrypt from 'bcryptjs';
'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {});

  users.associate = function(models) {
    this.hasMany(models.recipients, {foreingKey: 'user_id', as: 'recipients'});
  };

  users.addHook('beforeSave', async(user) => {
    if(user.password){
      user.password_hash = await bcrypt.hash(user.password, 8);
      user.name = 'dasd';
    }
  });

  users.prototype.checkPassword = async function (password) {
    return bcrypt.compare(password, this.password_hash);
  };
  return users;
};
