import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class jwtServices {
  constructor(private jwtService: JwtService) {}

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
