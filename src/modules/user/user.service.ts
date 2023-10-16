import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from 'src/Dto/user.dito';
import { UserModel } from 'src/models/user.model';


@Injectable()
export class UserService {
      async deleteUser(userId: number): Promise<void> {
            const user = await UserModel.findOne({ where: { id: userId } });
          
            if (!user) {
              throw new NotFoundException('User not found');
            }
          
            await user.destroy()
      }

      async getMyProfile(userId: number): Promise<UserDto> {
            const user = await UserModel.findByPk(userId,{attributes: { exclude: ['password'] },});
        
            if (!user) {
              throw new NotFoundException('User not found');
            }
        
            return user as UserDto;
          }
          
}