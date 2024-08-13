import { Test, TestingModule } from '@nestjs/testing';
import { PersonaService } from './persona.service'; // Cambia el nombre del servicio

describe('PersonaService', () => { // Cambia el nombre de la descripción
  let service: PersonaService; // Cambia el tipo de servicio

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonaService], // Cambia el servicio aquí
    }).compile();

    service = module.get<PersonaService>(PersonaService); // Cambia el tipo aquí
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
