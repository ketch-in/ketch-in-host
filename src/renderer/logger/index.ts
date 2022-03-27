import { getEnv } from '../env'

const logger = document.getElementById('logger') as HTMLPreElement

let lastMsg: string = null

const log = (...args: unknown[]) => {
  if (getEnv() === 'production') return
  const code = document.createElement('code')
  const time = new Date().toISOString().slice(0, 19).replace(/-/g, '/').replace('T', ' ')
  const message = args.map(arg => {
    switch (typeof arg) {
      case 'object':
        return JSON.stringify(arg)
      default:
        return arg
    }
  }).join(' ')

  if (message === lastMsg) {
    logger.lastChild.remove()
  }

  code.innerHTML = `${time} ${message}\n`
  lastMsg = message
  logger.appendChild(code)
}

export default log
