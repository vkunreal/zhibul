import { BadRequestException } from '@nestjs/common'

// Код проверяется и до сессии (вход, восстановление), и внутри неё
// (подтверждение почты, смена телефона). Отдельный класс позволяет входу
// отвечать 401, а потокам с сессией — 400, вместо того чтобы разлогинивать
// пользователя из-за опечатки в коде.
export class VerificationFailedException extends BadRequestException {}
