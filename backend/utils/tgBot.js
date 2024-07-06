const sendRequestToBot = async ({ name, phone }) => {
  const userDataString = `
    <b>Имя пользователя: </b> ${name}%0A%0A<b>Телефон: </b> ${phone}%0A
  `

  await fetch(
    `https://api.telegram.org/bot${process.env.tg_bot_token}/sendMessage?chat_id=${process.env.tg_bot_chat_id}&parse_mode=html&text=${userDataString}`
  )
}

module.exports = { sendRequestToBot }
