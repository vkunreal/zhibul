import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from 'src/users/users.service'
import { AuthUserDTO } from './data/dto/auth-user-dto'
import { compare } from 'bcrypt'
import { User } from 'src/shared/models/User'
import { TokenCouple } from './interfaces'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /* Authorizes user and returns token couple */
  async auth(authUserDTO: AuthUserDTO) {
    const { phoneNumber } = authUserDTO

    const candidate = await this.usersService.findUser({
      where: { phoneNumber },
    })

    let tokenCouple: TokenCouple | null = null
    let isUserCreated = false

    if (candidate) {
      tokenCouple = await this.login(authUserDTO, candidate)
    } else {
      tokenCouple = await this.signup(authUserDTO)
      isUserCreated = true
    }

    return { ...tokenCouple, isUserCreated }
  }

  /* Checks and generates token couple */
  async login({ password }: AuthUserDTO, { id, passwordHash }: User) {
    if (!(await compare(password, passwordHash))) {
      throw new UnauthorizedException('Invalid user credentials')
    }

    return this.generateTokens(id)
  }

  /* Creates new user and generates token couple */
  async signup(authUserDTO: AuthUserDTO) {
    const newUser = await this.usersService.createUser(authUserDTO)

    if (!newUser) {
      throw new NotFoundException()
    }

    return this.generateTokens(newUser.id)
  }

  /* Generates new token couple from refresh tokens */
  async refreshTokens(refreshToken: string) {
    try {
      const { id } = this.jwtService.verify(refreshToken)

      return this.generateTokens(id)
    } catch (e) {
      throw new UnauthorizedException('Unvalid refresh token')
    }
  }

  /* Generates new token couple */
  generateTokens(userId: string) {
    try {
      const accessToken = this.jwtService.sign({ userId }, { expiresIn: '15m' })

      const refreshToken = this.jwtService.sign({ userId }, { expiresIn: '7d' })

      return { accessToken, refreshToken }
    } catch (e) {
      throw new UnauthorizedException('Server error')
    }
  }
}
