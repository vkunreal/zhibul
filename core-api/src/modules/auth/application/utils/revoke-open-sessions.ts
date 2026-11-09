import { PrismaClient } from 'prisma/client'

// Клиент передаётся снаружи, чтобы отзыв попал в ту же транзакцию,
// что и изменение пользователя.
export const revokeOpenSessions = (
  db: Pick<PrismaClient, 'session'>,
  userId: string,
) =>
  db.session.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  })
