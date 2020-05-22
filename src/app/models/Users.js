import Sequelize, {Model} from 'sequelize';
import bycrypt from 'bcryptjs';

class Users extends Model{
  static init(sequelize){
    super.init(
      {
        name: Sequelize.STRING,
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

  checkPassword(password){
    return bycrypt.compare(password, this.password_hash);
  }
}

export default Users;
