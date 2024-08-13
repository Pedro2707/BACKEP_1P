import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindByPageQuery } from '../impl/find-by-page.query'; // Asegúrate de que esta ruta sea correcta
import { PersonaService } from '../../persona.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Persona } from '@prisma/client';

@QueryHandler(FindByPageQuery)
export class FindByPageHandler implements IQueryHandler<FindByPageQuery> {
  constructor(private readonly personaService: PersonaService) {}

  async execute(query: FindByPageQuery): Promise<Persona[]> {
    try {
      return await this.personaService.getByPage(query.page);
    } catch (error) {
      throw new HttpException(
        'Error al obtener las personas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
