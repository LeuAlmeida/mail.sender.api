import Sequelize, { Model } from 'sequelize';

class Mailer extends Model {
  static init(sequelize) {
    super.init(
      {
        subject: Sequelize.STRING,
        bodyurl: Sequelize.TEXT,
        recipients: Sequelize.STRING,
        date: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sender, { foreignKey: 'sender_id', as: 'sender' });
    this.belongsTo(models.User, { foreignKey: 'author_id', as: 'author' });
  }
}

export default Mailer;
