import { BadRequestException } from '@nestjs/common'

// Code checks happen both before a session exists (login, recovery) and inside
// one (email confirmation, phone change). A dedicated class lets the login flow
// answer 401 while the in-session flows answer 400 instead of logging the user
// out over a mistyped code.
export class VerificationFailedException extends BadRequestException {}
