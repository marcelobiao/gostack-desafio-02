import Sequelize, {Model} from 'sequelize';

class Recipients extends Model{
  static init(sequelize){
    super.init(
      {
        nome: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        rua: Sequelize.STRING,
        numero: Sequelize.INTEGER,
        complemento: Sequelize.STRING,
        estado: Sequelize.STRING,
        cidade: Sequelize.STRING,
        cep: Sequelize.INTEGER,
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models){
    this.belongsTo(models.Users, {foreignKey: 'user_id', as: 'user'})
  }
}

export default Recipients;
