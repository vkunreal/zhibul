import { Manrope, Noto_Serif, Roboto } from 'next/font/google'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
})

export const notoSerif = Noto_Serif({
  weight: ['300'],
})

export const manrope = Manrope({
  weight: ['300'],
})
