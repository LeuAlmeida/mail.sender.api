import Sequelize, { Model } from 'sequelize';

class Sender extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        initials: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async sender => {
      if (sender.initials) {
        sender.initials.toLowerCase();
      }
    });

    return this;
  }
}

export default Sender;
