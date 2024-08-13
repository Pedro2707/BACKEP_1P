import { Module } from '@nestjs/common';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers'; // Asegúrate de importar los QueryHandlers
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [CqrsModule],
  controllers: [PersonaController],
  providers: [
    PrismaService,
    PersonaService,
    ...CommandHandlers,
    ...QueryHandlers,
  ], // Incluye los QueryHandlers aquí
})
export class PersonaModule {}
