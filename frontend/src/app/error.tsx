'use client'

import { Button } from '@mui/material'

export default function Error({
  error,
  reset,
}: {
  error: { message: string }
  reset: () => void
}) {
  return (
    <div className="error-boundary">
      <h2>Что-то пошло не так!</h2>
      <p>{error.message}</p>
      <Button onClick={reset}>Попробовать снова</Button>
    </div>
  )
}
