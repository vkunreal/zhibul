export const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

export const getDate = (time: string) => {
  const date = new Date(Number(time))

  const day = String(date.getDate())
  const monthId = date.getMonth()
  const year = date.getFullYear()

  return `${day} ${MONTHS[monthId]} ${year}`
}
