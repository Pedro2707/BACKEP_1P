import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllUserQuery } from '../impl/find-all-user.query';
import { PrismaService } from '../../../../prisma/prisma.service';

@QueryHandler(FindAllUserQuery)
export class FindAllUserHandler implements IQueryHandler<FindAllUserQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute() {
    return await this.prismaService.usuario.findMany();
  }
}
