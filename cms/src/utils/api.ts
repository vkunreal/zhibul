const working_mode = 'prod'

let API = ''

switch (working_mode) {
  case 'prod':
    API = 'https://api.zhbl.by'
    break
  default:
    API = 'http://localhost:5000'
}

export default API
