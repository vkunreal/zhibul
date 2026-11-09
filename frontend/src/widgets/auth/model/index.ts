/**
 * Модель модалки входа по телефону.
 *
 * Сценарий:
 *   телефон ──phoneSubmitted──▶ запрос SMS ──▶ код ──signInStarted──▶
 *   анимация (вход + минимум MIN_LOADING_MS) ──▶ закрытие или экран ошибки
 *
 * Папки (зависимости идут только сверху вниз):
 *   lifecycle/    authFlowReset — сброс, на который подписаны все остальные
 *   session/      данные выданного кода: телефон, длина, момент истечения
 *   screen/       текущий экран, заголовок шапки, сигнал закрытия
 *   codeRequest/  запрос SMS и реакция на его ответ
 *   signIn/       вход по коду и таймер анимации
 *   lib/          чистые функции, общие для нескольких папок
 *
 * Внутри папки:
 *   events.ts      события; команды UI помечены в описании
 *   stores.ts      сторы
 *   effects.ts     эффекты
 *   samples.ts     связи между ними, пронумерованы по ходу сценария
 *   interfaces.ts, constants.ts, utils.ts — типы, константы, чистые функции
 *   index.ts       что папка отдаёт наружу; подключает samples.ts
 *
 * Компоненты читают сторы через useUnit и вызывают только команды отсюда.
 * Внутренние события, счётчики попыток и флаги ожидания наружу не отдаются.
 */

export { authFlowReset } from './lifecycle'
export { $codeSession, backToPhone } from './session'
export { $authScreen, $authTitle, $closeRequested, AuthScreen } from './screen'
export { phoneSubmitted, requestCodeFx } from './codeRequest'
export { signInStarted, waitSignInFx } from './signIn'

export type { CodeSession, IssuedCode } from './session'
