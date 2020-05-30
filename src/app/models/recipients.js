'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipients = sequelize.define('recipients', {
    name: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    rua: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    complemento: DataTypes.STRING,
    estado: DataTypes.STRING,
    cidade: DataTypes.STRING,
    cep: DataTypes.INTEGER
  }, {});

  recipients.associate = function(models) {
    this.belongsTo(models.users, {foreingKey: 'user_id', as: 'user'});
  };
  return recipients;
};
