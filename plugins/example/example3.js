import plugin from '../../lib/plugins/plugin.js'
import cfg from '../../lib/config/config.js'

export class newcomer extends plugin {
  constructor () {
    super({
      name: '欢迎新人',
      dsc: '简单开发示例',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'notice.group.increase',
      priority: 5000
    })
  }

  /** 接受到消息都会执行一次 */
  async accept () {
    /** 定义入群欢迎内容 */
    let msg = '欢迎新人！'
    /** 冷却cd 10s */
    let cd = 30

    if (this.e.user_id == cfg.qq) return

    /** cd */
    let key = `Yz:newcomers:${this.e.group_id}`
    if (await redis.get(key)) return
    redis.set(key, '1', { EX: cd })

    /** 回复 */
    await this.reply(msg)
  }
}
