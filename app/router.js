const KoaRouter = require('koa-router')
const dubbo = require('./dubbo')
const router = new KoaRouter({prefix: '/api/v1'})

router.use('/')

router.get('/testNodeDubbo', async (ctx, next) => {
  console.info(`[testNodeDubbo]:==:> start`)
  let {who} = ctx.request.query
  const res = await dubbo.service.dubboService.Hello(who)
  ctx.body = res
})

module.exports = router
