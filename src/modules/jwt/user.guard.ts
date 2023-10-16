import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { jwtServices } from './jwt.service';
import { tokenDto } from 'src/Dto/token.dto';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: jwtServices) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    const decodedToken: any = this.jwtService.decodeToken(token);

    if (decodedToken) {

      request.decodedToken = decodedToken;
      return true;
    }

    return false;
  }
}
