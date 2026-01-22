import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '../users/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.users.create({
      password: hash,
      role: dto.role as UserRole,
    });

    return {
      user: { id: user.id, role: user.role },
      access_token: this.jwt.sign({ sub: user.id, role: user.role }),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByIdWithPassword(dto.id);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return {
      user: { id: user.id, role: user.role },
      access_token: this.jwt.sign({ sub: user.id, role: user.role }),
    };
  }
}
