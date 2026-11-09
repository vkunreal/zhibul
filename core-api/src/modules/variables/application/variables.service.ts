import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from 'prisma/client'
import { PrismaService } from 'prisma/prisma.service'
import { paginate } from 'shared/utils/pagination/page'
import { PageQueryDTO } from 'shared/utils/pagination/page-query.dto'
import { VariableBodyDTO } from '../api/v1/dto/variable-body-dto'

@Injectable()
export class VariablesService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.appVariables.findMany({
      orderBy: { id: 'asc' },
    })
  }

  listPage(query: PageQueryDTO, url: string) {
    return paginate(
      this.prisma.appVariables,
      { orderBy: { id: 'asc' } },
      url,
      query,
    )
  }

  async create(dto: VariableBodyDTO) {
    try {
      return await this.prisma.appVariables.create({
        data: {
          name: dto.name,
          value: dto.value,
        },
      })
    } catch (e) {
      this.rethrow(e)
    }
  }

  async update(id: string, dto: VariableBodyDTO) {
    await this.requireVariable(id)

    try {
      return await this.prisma.appVariables.update({
        where: { id },
        data: {
          name: dto.name,
          value: dto.value,
        },
      })
    } catch (e) {
      this.rethrow(e)
    }
  }

  async delete(id: string) {
    await this.requireVariable(id)

    try {
      await this.prisma.appVariables.delete({ where: { id } })
    } catch (e) {
      this.rethrow(e)
    }
  }

  private async requireVariable(id: string) {
    const variable = await this.prisma.appVariables.findUnique({
      where: { id },
    })

    if (!variable) {
      throw new NotFoundException('Variable not found')
    }

    return variable
  }

  private rethrow(e: unknown): never {
    if (e instanceof NotFoundException) throw e

    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2025'
    ) {
      throw new NotFoundException('Variable not found')
    }

    throw new InternalServerErrorException('Failed to change variable')
  }
}
