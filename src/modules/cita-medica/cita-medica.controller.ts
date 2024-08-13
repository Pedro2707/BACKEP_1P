import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCitaCommand } from './commands/impl/create-cita.command';
import { CreateCitaDto } from './dto/create-cita.dto';
import { Prisma } from '@prisma/client';
import { FindByPageQuery } from './queries/impl/find-by-page.query';

@Controller('cita-medica')
export class CitaMedicaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('')
  async create(@Body() createUserDto: CreateCitaDto) {
    const citaMedica: Prisma.Cita_medicaCreateManyInput = {
      ...createUserDto,
    };
    return await this.commandBus.execute<CreateCitaCommand>(
      new CreateCitaCommand(citaMedica),
    );
  }

  @Get('page/:page')
  async findByPAge(@Param('page') page: number) {
    if (!page)
      throw new HttpException(
        'Page is requiere',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return await this.queryBus.execute<FindByPageQuery>(
      new FindByPageQuery(page),
    );
  }
}
