import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindByPageQuery } from '../impl/find-by-page.query';
import { CitaMedicaService } from '../../cita-medica.service';

@QueryHandler(FindByPageQuery)
export class FindByPageHandler implements IQueryHandler<FindByPageQuery> {
  constructor(private readonly citaMedicaService: CitaMedicaService) {}

  async execute(query: FindByPageQuery) {
    return this.citaMedicaService.getByPage(query.page);
  }
}
