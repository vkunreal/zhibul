import { Injectable } from '@nestjs/common'
import { v7 as uuidv7 } from 'uuid'
import { IdGenerator } from '../domain/ports/id-generator.port'

@Injectable()
export class UuidV7Generator extends IdGenerator {
  generate(): string {
    return uuidv7()
  }
}
