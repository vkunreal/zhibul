import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class VariablesService {
  constructor(private readonly prisma: PrismaService) {}

  async getVariables() {}
}
