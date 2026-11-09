import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from 'prisma/client'
import { PrismaService } from 'prisma/prisma.service'
import { paginate } from 'shared/utils/pagination/page'
import { PageQueryDTO } from 'shared/utils/pagination/page-query.dto'
import { CreateCurrencyDTO } from '../api/v1/dto/create-currency-dto'
import { UpdateCurrencyDTO } from '../api/v1/dto/update-currency-dto'

@Injectable()
export class CurrenciesService {
  constructor(private readonly prisma: PrismaService) {}

  listPage(query: PageQueryDTO, url: string) {
    return paginate(
      this.prisma.currency,
      { orderBy: { id: 'asc' } },
      url,
      query,
    )
  }

  async create(dto: CreateCurrencyDTO) {
    try {
      return await this.prisma.currency.create({
        data: {
          title: dto.title,
          value: dto.value,
        },
      })
    } catch (e) {
      this.rethrow(e)
    }
  }

  async update(id: string, dto: UpdateCurrencyDTO) {
    await this.requireCurrency(id)

    try {
      return await this.prisma.currency.update({
        where: { id },
        data: {
          ...(dto.title !== undefined ? { title: dto.title } : {}),
          value: dto.value,
        },
      })
    } catch (e) {
      this.rethrow(e)
    }
  }

  async delete(id: string) {
    await this.requireCurrency(id)

    try {
      await this.prisma.currency.delete({ where: { id } })
    } catch (e) {
      this.rethrow(e)
    }
  }

  private async requireCurrency(id: string) {
    const currency = await this.prisma.currency.findUnique({
      where: { id },
    })

    if (!currency) {
      throw new NotFoundException('Currency not found')
    }

    return currency
  }

  private rethrow(e: unknown): never {
    if (e instanceof NotFoundException || e instanceof ConflictException) {
      throw e
    }

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new ConflictException('Currency with this title already exists')
      }

      if (e.code === 'P2025') {
        throw new NotFoundException('Currency not found')
      }
    }

    throw new InternalServerErrorException('Failed to change currency')
  }
}
