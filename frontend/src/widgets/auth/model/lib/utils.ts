/** Номер без маски: `+375 (29) 111-11-11` → `375291111111`. В таком виде его ждёт API. */
export const digitsOnly = (phone: string) => phone.replace(/\D/g, '')
