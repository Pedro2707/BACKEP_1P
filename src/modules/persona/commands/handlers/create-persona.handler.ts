import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePersonaCommand } from '../impl/create-persona.command';
import { PersonaService } from '../../persona.service';

@CommandHandler(CreatePersonaCommand)
export class CreatePersonaHandler implements ICommandHandler<CreatePersonaCommand> {
  constructor(private readonly personaService: PersonaService) { }

  async execute(command: CreatePersonaCommand) {
    return this.personaService.createPersona(command.persona);
  }
}
