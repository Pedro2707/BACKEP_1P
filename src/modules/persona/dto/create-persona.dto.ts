import { IsString, IsInt } from 'class-validator';

export class CreatePersonaDto {
  @IsString() // Cambia a IsString
  id: string; // Cambia a string

  @IsString()
  nombre: string;

  @IsString()
  dni: string;

  @IsInt()
  edad: number;

  @IsString()
  procedencia: string;

  @IsString()
  telefono: string;

  @IsString()
  profesion: string;

  @IsString()
  diagnostico: string;
}
