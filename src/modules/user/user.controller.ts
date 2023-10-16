import { Controller, Delete,Request, Param, Get, Response, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../jwt/admin.guard';
import { UserGuard } from '../jwt/user.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
 
  @Delete('delete/:id')
  @UseGuards(AdminGuard)
  async deleteUser(@Param('id') userId: number, @Response() res) {
    await this.userService.deleteUser(userId);
    return res.status(201).json({ message: 'User deleted successfully' });
  }

  @Get('profile')
  @UseGuards(UserGuard)
  async getprofile(@Request() req, @Response() res) {
      console.log(req)
    const user = await this.userService.getMyProfile(req.decodedToken.id);
    return res.status(201).json({ user });
  }
  
}
