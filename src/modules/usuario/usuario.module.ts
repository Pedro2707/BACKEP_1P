import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handler';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryHandlers } from './queries/handlers';
import { UsuarioService } from './usuario.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [UsuarioController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    PrismaService,
    UsuarioService,
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
