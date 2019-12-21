const { responseMsg, writeData } = require('../utils/index.js')

class ListServer {
  static post(req, res) {
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })
    req.on('end', () => {
      const params = JSON.parse(data)
      // 参数非空校验
      if (!params.id || !params.name || !params.content) {
        responseMsg(
          res,
          {
            code: 400,
            data: '',
            msg: 'Parameters cannot be empty'
          },
          400
        )
      }
      delete require.cache[require.resolve('../data.json')]
      const { todolist } = require('../data.json')
      writeData(res, {
        todolist: [...todolist, params]
      })
    })
  }
  static delete(req, res, { id }) {
    delete require.cache[require.resolve('../data.json')]
    const { todolist } = require('../data.json')
    const data = todolist.filter(item => item.id !== Number(id))
    writeData(res, {
      todolist: data
    })
  }
  static put(req, res, { id }) {
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })
    req.on('end', () => {
      const params = JSON.parse(data)
      // 参数非空校验
      if (!id || !params.name || !params.content) {
        responseMsg(
          res,
          {
            code: 400,
            data: '',
            msg: 'Parameters cannot be empty'
          },
          400
        )
      }
      delete require.cache[require.resolve('../data.json')]
      const { todolist } = require('../data.json')
      todolist.forEach(item => {
        if (item.id === Number(id)) {
          item.name = params.name
          item.content = params.content
        }
      })
      writeData(res, {
        todolist
      })
    })
  }
  static get(req, res) {
    delete require.cache[require.resolve('../data.json')]
    const { todolist } = require('../data.json')
    const result = {
      code: 0,
      data: todolist,
      msg: 'success'
    }
    responseMsg(res, result)
  }
}

module.exports = ListServer
