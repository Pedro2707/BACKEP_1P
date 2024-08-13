import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePersonaCommand } from './commands/impl/create-persona.command';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { Prisma, Persona } from '@prisma/client';
import { PersonaService } from './persona.service';

@Controller('persona')
export class PersonaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly personaService: PersonaService,
  ) {}

  @Post('')
  async create(@Body() createPersonaDto: CreatePersonaDto) {
    const persona: Prisma.PersonaCreateInput = {
      ...createPersonaDto,
    };

    try {
      return await this.commandBus.execute<CreatePersonaCommand>(
        new CreatePersonaCommand(persona),
      );
    } catch (error) {
      throw new HttpException(
        'Error al crear la persona',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('page/:page')
  async getPersonasByPage(@Param('page') page: string): Promise<Persona[]> {
    const pageNumber = Number(page);
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new HttpException(
        'El número de página debe ser un número válido mayor que 0',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.personaService.getByPage(pageNumber);
  }
}
