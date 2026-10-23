export const isEmptyHtml = (html: string) => {
  if (/<hr\b/i.test(html)) return false

  const text = html
    .replace(/<br\s*\/?>/gi, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .trim()

  return !text
}
