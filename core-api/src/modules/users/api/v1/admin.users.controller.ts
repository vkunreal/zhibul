import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import type { Request } from 'express'
import { CurrentUser } from 'src/modules/auth/api/v1/decorators/current-user.decorator'
import type { AuthenticatedUser } from 'src/modules/auth/application/auth.types'
import { ApiTag } from 'src/swagger/api-tags'
import { UsersService } from '../../application/users.service'
import {
  AdminUserResponseDTO,
  UserListResponseDTO,
} from './dto/admin-user-response-dto'
import { CreateUserDTO } from './dto/create-user-dto'
import { ListUsersQueryDTO } from './dto/list-users-query-dto'
import { UpdateUserDTO } from './dto/update-user-dto'

const userId = new ParseUUIDPipe({ version: '7' })

const userResponse = SerializeOptions({
  type: AdminUserResponseDTO,
  excludeExtraneousValues: true,
})

@ApiTags(ApiTag.adminUsers)
@Controller('admin/v1/users')
@ApiCookieAuth('accessToken')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminUsersControllerV1 {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @SerializeOptions({
    type: UserListResponseDTO,
    excludeExtraneousValues: true,
  })
  @ApiOperation({ summary: 'List users' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiResponse({ status: 200, type: UserListResponseDTO })
  async list(
    @Query() query: ListUsersQueryDTO,
    @Req() request: Request,
  ): Promise<UserListResponseDTO> {
    return this.usersService.listUsers(query, request.originalUrl)
  }

  @Post()
  @userResponse
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, type: AdminUserResponseDTO })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiResponse({ status: 409, description: 'Phone number is already in use' })
  create(@Body() dto: CreateUserDTO) {
    return this.usersService.createUser(dto, { withRoles: true })
  }

  @Get(':id')
  @userResponse
  @ApiOperation({ summary: 'User by id' })
  @ApiResponse({ status: 200, type: AdminUserResponseDTO })
  @ApiResponse({ status: 404, description: 'User not found' })
  get(@Param('id', userId) id: string) {
    return this.usersService.getUser(id)
  }

  @Patch(':id')
  @userResponse
  @ApiOperation({ summary: 'Update name, phone, email, or roles' })
  @ApiResponse({ status: 200, type: AdminUserResponseDTO })
  @ApiResponse({ status: 404, description: 'User or role not found' })
  @ApiResponse({ status: 409, description: 'Phone or email is already in use' })
  async update(
    @CurrentUser() actor: AuthenticatedUser,
    @Param('id', userId) id: string,
    @Body() dto: UpdateUserDTO,
  ) {
    return this.usersService.updateUser(id, dto, actor.id)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400, description: 'Cannot delete your own account' })
  @ApiResponse({ status: 404, description: 'User not found' })
  delete(
    @CurrentUser() actor: AuthenticatedUser,
    @Param('id', userId) id: string,
  ) {
    return this.usersService.deleteUser(id, actor.id)
  }

  @Post(':id/block')
  @HttpCode(HttpStatus.OK)
  @userResponse
  @ApiOperation({ summary: 'Block the user and revoke their sessions' })
  @ApiResponse({ status: 200, type: AdminUserResponseDTO })
  @ApiResponse({ status: 400, description: 'Cannot block your own account' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async block(
    @CurrentUser() actor: AuthenticatedUser,
    @Param('id', userId) id: string,
  ) {
    return this.usersService.blockUser(id, actor.id)
  }

  @Post(':id/unblock')
  @HttpCode(HttpStatus.OK)
  @userResponse
  @ApiOperation({ summary: 'Allow the user to sign in again' })
  @ApiResponse({ status: 200, type: AdminUserResponseDTO })
  @ApiResponse({ status: 404, description: 'User not found' })
  async unblock(@Param('id', userId) id: string) {
    return this.usersService.unblockUser(id)
  }
}
