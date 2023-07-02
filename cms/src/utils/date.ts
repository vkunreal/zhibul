export const getDate = (time: number) => {
  const date = new Date(time)

  let hours = String(date.getHours())
  let minutes = String(date.getMinutes())

  if (Number(hours) < 10) hours = '0' + hours
  if (Number(minutes) < 10) minutes = '0' + minutes

  let day = String(date.getDate())
  let month = String(date.getMonth() + 1)
  const year = date.getFullYear()

  if (Number(day) < 10) day = '0' + day
  if (Number(month) < 10) month = '0' + month

  return `${day}.${month}.${year} ${hours}:${minutes}`
}
