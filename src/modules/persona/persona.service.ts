import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Persona, Prisma } from '@prisma/client';

@Injectable()
export class PersonaService {
  constructor(private prisma: PrismaService) {}

  // Crea una nueva persona
  async createPersona(
    data: Prisma.PersonaCreateInput,
  ): Promise<Persona> {
    try {
      return await this.prisma.persona.create({ data });
    } catch (error) {
      throw new Error('Error al crear la persona');
    }
  }

  // Obtiene una persona por campo único
  async findOne(
    where: Prisma.PersonaFindUniqueArgs,
  ): Promise<Persona | null> {
    const persona = await this.prisma.persona.findUnique(where);
    if (!persona) {
      throw new NotFoundException('Persona no encontrada');
    }
    return persona;
  }

  // Obtiene todas las personas
  async getAllPersonas(): Promise<Persona[]> {
    return this.prisma.persona.findMany();
  }

  // Obtiene personas por página
  async getByPage(page: number): Promise<Persona[]> {
    return this.prisma.persona.findMany({
      skip: (page - 1) * 10, // Salta las personas de las páginas anteriores
      take: 10, // Toma las siguientes 10 personas
    });
  }

  // Actualiza una persona
  async updatePersona(
    where: Prisma.PersonaWhereUniqueInput,
    data: Prisma.PersonaUpdateInput,
  ): Promise<Persona | null> {
    try {
      return await this.prisma.persona.update({ where, data });
    } catch (error) {
      throw new NotFoundException('Persona no encontrada para actualizar');
    }
  }

  // Elimina una persona
  async deletePersona(
    where: Prisma.PersonaFindUniqueArgs,
  ): Promise<Persona | null> {
    try {
      return await this.prisma.persona.delete(where);
    } catch (error) {
      throw new NotFoundException('Persona no encontrada para eliminar');
    }
  }
}
