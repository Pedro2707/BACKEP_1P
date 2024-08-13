import { Role } from '@prisma/client';

export class CreateUserCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly role: Role,
  ) {}
}
