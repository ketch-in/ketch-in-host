import { ipcRenderer } from 'electron'
import io from 'socket.io-client'

import { resize, clear, buffer, EventType } from './painter'
import toolbar, { toggle } from './toolbar'
import { setEnv, getEnv } from './env'
import log from './logger'

type Packet = [number, number, number, number, EventType]

let currentMeetId: string = null

const HOST = process.env.HOST || 'http://localhost'

// 윈도우가 나타날 때 밋ID 수신
ipcRenderer.on('meet-start', (_event, meetId: string, isDev: boolean) => {
  // meetId가 있으면 연결 시도
  if (meetId) connect(meetId)
  // 화면 클리어
  clear()

  // 툴바 생성
  toolbar()

  // ENV 설정
  setEnv(isDev)

  // 개발 상태에서는 로그가 나타남
  if (getEnv() !== 'production') {
    document.body.classList.add('log')
  }

  log('[ENV]', getEnv())
})

// 화면을 드로잉하는 상태인지 아닌지를 수신
ipcRenderer.on('ignore-events', (_event, state: boolean) => toggle(!state))

// IPC 로그를 수신
ipcRenderer.on('app-log', (_event, data: string) => log(`[IPC] ${data}`))

// ESC 누르면 창 숨김
window.onkeydown = event => event.key === 'Escape' && ipcRenderer.send('hide-window')

// 초기화
document.addEventListener('DOMContentLoaded', () => init())

const init = () => {
  resize()
  ipcRenderer.send('meet-start')
  log('[APP] ketch-in ready')
}

const connect = (meetId: string) => {
  // 이미 접속한 상태이면 접속시도 안함
  if (currentMeetId === meetId) return
  currentMeetId = meetId

  log('[SOCK] connect to', meetId)

  const socket = io(HOST)
  log('[SOCK] Socket Server : ', HOST)

  socket.on('connect', () => {
    socket.emit('join', meetId, 'organizer')
    log('[SOCK] connected!', socket.id)
  })

  socket.on('organizer-info:refetch', (userId) => {
    log('[SOCK] new client join', userId)
  })

  socket.on('draw:add', ([x, y, w, h, type]: Packet, sender) => {
    const pointX = x / (w / window.innerWidth)
    const pointY = y / (h / window.innerHeight)
    buffer(sender, type, pointX, pointY)
    ipcRenderer.send('show-window')
    log('[SOCK] remote draw', sender)
  })

  socket.on('disconnect', () => {
    log('[SOCK] disconnected', socket.id)
  })
}
