import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserQuery } from '../impl/find-user.query';
import { PrismaService } from '../../../../prisma/prisma.service';

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindUserQuery) {
    const { id } = query;
    return await this.prismaService.usuario.findUnique({
      where: {
        id,
      },
    });
  }
}
