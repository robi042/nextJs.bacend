import { Module, OnApplicationBootstrap } from '@nestjs/common';
import dotenv from 'dotenv'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import sequelize from './connections/database/db.connection';
import { AuthService } from './modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { jwtServices } from './modules/jwt/jwt.service';
dotenv.config()

@Module({
  imports: [AppModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UserService, jwtServices],
})
export class AppModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    try {
      await sequelize.sync({ force: false }); 
      console.log('Database synchronized');
    } catch (error) {
      console.error('Error synchronizing database:', error);
    }
  }
}