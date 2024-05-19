import { JwtModule } from '@nestjs/jwt';

const jwtConfig = JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '3600s' },
});

export default jwtConfig;
