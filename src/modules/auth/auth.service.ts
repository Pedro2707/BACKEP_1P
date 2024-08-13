import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuarioService,
    private jwtService: JwtService,
  ) { }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ accessToken: string; username: string; role: string }> {
    const user = await this.usersService.findOne({ where: { username } });

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    const isMatch = await bcrypt.compare(pass, hash);
    if (isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.username, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      username: user.username,
      role: user.role,
    };
  }
}
