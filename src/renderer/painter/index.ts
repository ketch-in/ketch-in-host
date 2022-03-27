import { Stroke, StrokeType } from './stroke'

export type EventType = 'up' | 'down' | 'move'
interface Event {type: EventType; delay: number; x?: number; y?: number}
interface Buffer {
  latestReceiveTime: number;
  stroke: StrokeType;
  beginMove?: {x: number; y: number};
  frames: Event[];
}

interface Cache { // cached canvas
  canvas: HTMLCanvasElement;
  ctx?: CanvasRenderingContext2D;
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
const frameBuffer: {[key: string]: Buffer} = {}
const cache: Cache = { canvas: document.createElement('canvas') }

cache.ctx = cache.canvas.getContext('2d')

window.onresize = () => resize()
window.addEventListener('mouseup', () => draw('up'))
window.addEventListener('mouseleave', () => draw('up'))

document.addEventListener('mousedown', event => draw('down', event.pageX, event.pageY))
document.addEventListener('mousemove', event => draw('move', event.pageX, event.pageY))

export const buffer = (user: string, type: EventType, x?: number, y?: number) => {
  const now = Date.now()
  if (!frameBuffer[user]) {
    const stroke = new Stroke()
    frameBuffer[user] = { latestReceiveTime: now, stroke, frames: [] }
  }

  const buff = frameBuffer[user]
  const { latestReceiveTime } = buff
  const delay = now - latestReceiveTime
  buff.frames.push({ type, x, y, delay })
  buff.latestReceiveTime = now
  if (type === 'down') {
    buff.beginMove = { x, y }
  }
  anim()
}

const anim = () => {
  const keys = Object.keys(frameBuffer)
  keys.forEach((key) => {
    const user = frameBuffer[key]
    if (user.frames.length) {
      ctx.beginPath()
      if (user.beginMove) {
        ctx.moveTo(user.beginMove.x, user.beginMove.y)
      }
      ctx.strokeStyle = user.stroke.color
      user.frames.forEach(({ x, y }) => {
        ctx.lineTo(x, y)
        ctx.stroke()
        user.beginMove = { x, y }
      })
      user.frames = []
    }
  })
}

let drawing = false
const draw = (type: EventType, x?: number, y?: number) => {
  switch (type) {
    case 'up':
      drawing = false
      buffer('local', type)
      break
    case 'down':
      drawing = true
      buffer('local', type, x, y)
      break
    case 'move':
    default:
      if (drawing) {
        buffer('local', type, x, y)
      }
  }
}

const setCache = () => {
  cache.canvas.width = canvas.width
  cache.canvas.height = canvas.height
  cache.ctx.drawImage(canvas, 0, 0)
}

const reDraw = () => {
  ctx.drawImage(cache.canvas, 0, 0)
}

export const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height)
export const resize = () => {
  setCache()

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.lineWidth = 5
  reDraw()
}
