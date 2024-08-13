import { Module } from '@nestjs/common';
import { CitaMedicaController } from './cita-medica.controller';
import { CitaMedicaService } from './cita-medica.service';
import { CommandHandlers } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryHandlres } from './queries/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [CitaMedicaController],
  providers: [
    PrismaService,
    CitaMedicaService,
    ...CommandHandlers,
    ...QueryHandlres,
  ],
})
export class CitaMedicaModule { }
