const { writeLog } = require('../writeLog')

const sendRequestToBot = async ({ name, phone }) => {
  const userDataString = `
    <b>Имя пользователя: </b> ${name}%0A%0A<b>Телефон: </b> ${phone}%0A
  `

  const requestString = `https://api.telegram.org/bot${process.env.tg_bot_token}/sendMessage?chat_id=${process.env.tg_bot_chat_id}&parse_mode=html&text=${userDataString}`

  const data = await fetch(requestString)

  writeLog(
    JSON.stringify({
      status: data.status,
      text: data.statusText,
    })
  )
}

module.exports = { sendRequestToBot }
