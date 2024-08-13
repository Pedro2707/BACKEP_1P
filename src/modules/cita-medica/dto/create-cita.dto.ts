import { IsDate, IsString } from 'class-validator';

export class CreateCitaDto {
  @IsString()
  cita: string;

  @IsDate()
  fecha: Date;

  @IsString()
  id_persona: string;

  @IsString()
  doctor: string;

  @IsString()
  doctor_telefono: string;

  @IsString()
  observaciones: string;

  @IsString()
  doctor_correo: string;
}
