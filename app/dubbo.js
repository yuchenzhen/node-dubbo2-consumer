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

const dubbo = new Dubbo({
  application: {name: 'dubbo-node-test'},
  register: '127.0.0.1:2181',
  dubboSetting,
  service
})

module.exports = dubbo
