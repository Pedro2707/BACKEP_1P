import { Test, TestingModule } from '@nestjs/testing';
import { CitaMedicaController } from './cita-medica.controller';

describe('CitaMedicaController', () => {
  let controller: CitaMedicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitaMedicaController],
    }).compile();

    controller = module.get<CitaMedicaController>(CitaMedicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
