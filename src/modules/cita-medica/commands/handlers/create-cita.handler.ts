import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCitaCommand } from '../impl/create-cita.command';
import { CitaMedicaService } from '../../cita-medica.service';

@CommandHandler(CreateCitaCommand)
export class CreateCitaHandler implements ICommandHandler<CreateCitaCommand> {
  constructor(private readonly citaMedicaservice: CitaMedicaService) { }

  async execute(command: CreateCitaCommand) {
    return this.citaMedicaservice.createCitaMedica(command.citaMedica);
  }
}
