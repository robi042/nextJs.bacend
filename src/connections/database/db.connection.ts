import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Options } from 'sequelize/types';
import { UserModel } from 'src/models/user.model';

dotenv.config()

const sequelizeConfig: Options = {
      database: process.env.DATABASE_NAME,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
    };
const sequelize = new Sequelize(sequelizeConfig);
sequelize.addModels([UserModel]);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database: ', error);
  });
  export default sequelize

