import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { RegistrationDto } from 'src/Dto/registration.dto';
import { UserModel } from 'src/models/user.model';
import { LoginDto } from 'src/Dto/login.dto';
@Injectable()
export class AuthService {
      constructor(private jwtService: JwtService) {}
      async addUser(registrationDto: RegistrationDto): Promise<void> {
           try{
            const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
            const newUser = new UserModel();
            newUser.name = registrationDto.name;
            newUser.email = registrationDto.email;
            newUser.password = hashedPassword;
            newUser.gender = registrationDto.gender;
            newUser.isAdmin = registrationDto?.isAdmin
        
            await newUser.save();
           }catch(error){
            console.log(error)
           }
      }

      async loginUser(loginDto: LoginDto): Promise<string | null> {
            const user = await UserModel.findOne({ where: { email: loginDto.email } });
        
            if (!user) {
              return null;
            }
            const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        
            if (!isPasswordValid) {
              return null;
            }
            const payload = { id: user.id, username: user.name, isAdmin: user.isAdmin };
            const token = this.jwtService.sign(payload);
        
            return token;
      }
          
}