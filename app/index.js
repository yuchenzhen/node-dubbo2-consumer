const Koa = require('koa2')
const router = require('./router')
const port = 8840

const beginTime = Date.now()
let app = new Koa()

console.info(`dubbo nodo client start !`)

app.use(router.routes())
app.use(router.allowedMethods())

let server = app.listen(port)
console.warn(`dubbo nodo client start !, ${(Date.now() - beginTime) / 1000} s, listen on port ${port}`)

process.on('SIGUSR2', () => { process.exit(0) })

module.exports = server
