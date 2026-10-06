import { VerificationChannel, VerificationPurpose } from 'prisma/client'

export interface IssueCodeOptions {
  channel: VerificationChannel
  purpose: VerificationPurpose
  destination: string
  userId?: string
}

export interface ConsumeCodeOptions {
  purpose: VerificationPurpose
  destination: string
  code: string
  userId?: string
}

export interface IssuedCode {
  ttl: number
  length: number
}
