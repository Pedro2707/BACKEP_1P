import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import cryptoConfig from './config/crypto.config';
import { CitaMedicaModule } from './modules/cita-medica/cita-medica.module';
import { PersonaModule } from './modules/persona/persona.module';
@Module({
  imports: [
    UsuarioModule,
    AuthModule,
    CitaMedicaModule,
    PersonaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, cryptoConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
