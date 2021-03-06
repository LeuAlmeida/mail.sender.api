import Sequelize from 'sequelize';

import User from '../app/models/User';
import Sender from '../app/models/Sender';
import Mailer from '../app/models/Mailer';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, Sender, Mailer, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
