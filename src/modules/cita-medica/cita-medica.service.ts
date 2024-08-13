import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Cita_medica, Prisma } from '@prisma/client';
@Injectable()
export class CitaMedicaService {
  constructor(private prisma: PrismaService) {}

  // crea una cita medica
  async createCitaMedica(
    data: Prisma.Cita_medicaCreateManyInput,
  ): Promise<Cita_medica> {
    return this.prisma.cita_medica.create({ data });
  }
  // obtiene una cita medica por campo unico
  async findOne(
    where: Prisma.Cita_medicaFindUniqueArgs,
  ): Promise<Cita_medica | null> {
    return this.prisma.cita_medica.findUnique(where);
  }

  // obtiene todas las citas medicas
  async getAllCitaMedicas(): Promise<Cita_medica[]> {
    return this.prisma.cita_medica.findMany();
  }

  // actualiza una cita medica
  async updateCitaMedica(
    where: Prisma.Cita_medicaWhereUniqueInput,
    data: Prisma.Cita_medicaUpdateInput,
  ): Promise<Cita_medica | null> {
    return this.prisma.cita_medica.update({ where, data });
  }

  // elimina una cita medica
  async deleteCitaMedica(
    where: Prisma.Cita_medicaFindUniqueArgs,
  ): Promise<Cita_medica | null> {
    return this.prisma.cita_medica.delete(where);
  }

  // obtiene todas las citas medicas por pagina
  async getByPage(page: number): Promise<Cita_medica[]> {
    return this.prisma.cita_medica.findMany({
      skip: (page - 1) * 10,
      take: 10,
    });
  }
}
