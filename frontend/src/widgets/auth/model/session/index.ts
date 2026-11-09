// Сессия выданного кода: телефон, длина кода и момент его истечения.
// Заполняется на codeIssued, стирается на backToPhone и authFlowReset.
export { backToPhone, codeIssued } from './events'
export { $codeSession, $phoneNumber } from './stores'
export type { CodeIssuedPayload, CodeSession, IssuedCode } from './interfaces'
