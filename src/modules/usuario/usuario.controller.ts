import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/creat-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { Usuario } from '@prisma/client';
import { FindUserQuery } from './queries/impl/find-user.query';
import { FindAllUserQuery } from './queries/impl/find-all-user.query';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.commandBus.execute<CreateUserCommand>(
      new CreateUserCommand(
        createUserDto.username,
        createUserDto.password,
        createUserDto.role,
      ),
    );
  }

  @Get('')
  async findOne(@Query('id') id: string): Promise<Usuario> {
    return await this.queryBus.execute<FindUserQuery>(new FindUserQuery(id));
  }

  @Get('all')
  async findAll(): Promise<Usuario> {
    return await this.queryBus.execute<FindAllUserQuery>(
      new FindAllUserQuery(),
    );
  }

}
