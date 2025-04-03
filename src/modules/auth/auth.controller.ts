import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { createSignInSchema, SignInDto } from './dto/signin.zod-schema';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(createSignInSchema))
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
