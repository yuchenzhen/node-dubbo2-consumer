# node-dubbo2-consumer

Node.js 如何通过 Dubbo 调用 Java

Node 这边通过 dubbo调用 Java 的 provider 的接口，个人尝试调用了几个包。sofa-rpc-node，node-zookeeper-dubbo， 和  dubbo2.js 

其中 sofa-rpc-node 的对使用 egg.js框架的比较友好，node-zookeeper-dubbo 使用起来跟 sofa-rpc-node 差不多；但是有点麻烦的就是这两个包都需要写 proto3的接口定义

而 dubbo2.js则比较方便，以下是使用 dubbo2.js 的示列

```javascript
const { Dubbo, java, setting } = require('dubbo2.js')


const interfaceName = 'com.dubbo.learn.dubbo.TestProviderService'
const interfaceVersion = '1.0.0'


const dubboSetting = setting.match(
  interfaceName, { version: interfaceVersion }
)

const dubboService = dubbo => dubbo.proxyService({
  dubboInterface: interfaceName,
  version: '1.0.0',
  methods: {
    Hello (who) {
      return [
        java.String(who)
      ]
    }
  }
})

const service = {dubboService}


// 实例化Dubbo， 入参主要是名称和 dubbo 接口的设置
const dubbo = new Dubbo({
  application: {name: 'dubbo-node-test'},
  register: '127.0.0.1:2181',
  dubboSetting,
  service
})

module.exports = dubbo

```



代码就是这么简单， 把 Java 服务里面通过 dubbo 提供出来的接口(包括接口名，接口版本信息，接口方法) 注册一下

得到Dubbo 实例之后，调用对应的 service就可以使用

如下

```javascript
await dubbo.service.dubboService.Hello(who)
```



本人简单写了一个接口

```javascript
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

```



调用结果

![](http://ww1.sinaimg.cn/large/6026faa6gy1g1gidpequnj20zc0fyq45.jpg)



这样就完成了 node 作为消费者通过 dubbo 去调用 java 的接口了


## How to use

```
npm i

node app/index.js
```
