import { Prisma } from '@prisma/client';

export class CreatePersonaCommand {
  constructor(public persona: Prisma.PersonaCreateInput) {}
}
