import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdvisorService } from '../advisor/advisor.service';
import { compare } from 'bcrypt-ts';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private advisorService: AdvisorService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    try {
      const advisor = await this.advisorService.findByEmail(signInDto.email);

      if (!(await compare(signInDto.password, advisor.password))) {
        throw new UnauthorizedException();
      }

      const payload = {
        sub: advisor._id,
        email: advisor.email,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
