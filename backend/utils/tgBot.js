const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.tg_bot_token)

const sendRequestToBot = async ({ name, phone }) => {
  const userDataString = `
    <b>Имя пользователя: </b> ${name}\n<b>Телефон: </b> ${phone}
  `

  bot.sendMessage(process.env.tg_bot_chat_id, userDataString, {
    parse_mode: 'HTML',
  })
}

module.exports = { sendRequestToBot }
