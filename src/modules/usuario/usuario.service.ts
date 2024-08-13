import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Usuario } from '@prisma/client';
@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async createUsuario(
    usuarioData: Prisma.UsuarioCreateInput,
  ): Promise<Usuario> {
    return this.prisma.usuario.create({ data: usuarioData });
  }

  async findOne(where: Prisma.UsuarioFindUniqueArgs): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique(where);
  }

  async getAllUsuarios(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  // async updateUsuario(id: string, usuarioData: Partial<Usuario>): Promise<Usuario | null> {
  //   return this.prisma.usuario.update({ where: { id }, data: usuarioData });
  // }

  // async deleteUsuario(id: number): Promise<Usuario | null> {
  //   return this.prisma.usuario.delete({ where: { id } });
  // }
}
