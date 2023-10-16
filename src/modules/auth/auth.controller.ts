import { Controller, Get, Post,Body, Request, Response, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from 'src/Dto/registration.dto';
import { LoginDto } from 'src/Dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('test/:name')
  async test(@Request() req, @Response() res, @Param('name') name: string) {
    res.status(200).json({ message: `Hello ${name}` });
  }

  @Post('registration')
  async registerUser(@Body() registrationDto: RegistrationDto, @Response() res) {
    try {
      await this.authService.addUser(registrationDto);

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Registration failed' });
    }
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto, @Response() res) {
    try {
      const token = await this.authService.loginUser(loginDto);

      if (!token) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Login failed' });
    }
  }
}
