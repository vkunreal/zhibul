export const isServerError = (error: unknown) => {
  if (typeof error !== 'object' || error === null || !('status' in error)) {
    return false
  }

  const { status } = error as { status: unknown }

  return typeof status === 'number' && status > 500
}
