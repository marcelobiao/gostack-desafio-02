import Sequelize, {Model} from 'sequelize';

class Users extends Model{
  static init(sequelize){
    super.init(
      {
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models){
    this.hasMany(models.Recipients, {foreignKey: 'user_id', as: 'recipients'});
  }
}

export default Users;
