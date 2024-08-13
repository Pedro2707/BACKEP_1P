import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { PrismaService } from '../../../../prisma/prisma.service';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from '../../usuario.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async execute(command: CreateUserCommand) {
    const { username, password, role } = command;
    const user = await this.usuarioService.findOne({ where: { username } });
    if (user) {
      throw new Error('User already exists');
    }
    const passwordEncrypted = await this.hashPassword(password);
    return await this.prismaService.usuario.create({
      data: {
        username,
        password: passwordEncrypted,
        role,
      },
    });
  }

  async hashPassword(password: string) {
    const pswKey = this.configService.get<string>('cryptoPassword');
    const salt = randomBytes(32);
    const key = (await promisify(scrypt)(pswKey, salt, 32)) as Buffer;
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const passwordEncrypted = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);
    return passwordEncrypted.toString('hex');
  }
}
