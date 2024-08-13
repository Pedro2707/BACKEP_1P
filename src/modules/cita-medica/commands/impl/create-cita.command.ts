import { Prisma } from '@prisma/client';

export class CreateCitaCommand {
  constructor(public citaMedica: Prisma.Cita_medicaCreateManyInput) {}
}
