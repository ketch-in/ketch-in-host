import { ipcRenderer } from 'electron'
import { io } from 'socket.io-client'

import { resize, clear, buffer, EventType } from './painter'
import toolbar, { toggle } from './toolbar'
import { setEnv, getEnv } from './env'
import log from './logger'

// @ts-expect-error
import RTCMultiConnection from 'rtcmulticonnection'

// @ts-expect-error
window.io = io

type Packet = [number, number, number, number, EventType]

const connection = new RTCMultiConnection()

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

const openRoom = (meetId: string, done: (joined: boolean) => void) => {
  connection.open(
    meetId,
    (isRoomOpened: boolean, id: string, error?: string) => {
      if (!error) {
        console.log('WebRTC > 연결됨.')
        return done(true)
      }

      // 이미 방이 생성된 상태라면 가입을 시도합니다.
      if (error === connection.errors.ROOM_NOT_AVAILABLE) {
        return joinRoom(meetId, done)
      }

      done(false)
      connection.onerror(error)
    }
  )
}

const joinRoom = (meetId: string, done: (joined: boolean) => void) => {
  connection.sessionid = meetId
  connection.isInitiator = false
  connection.join(
    meetId,
    (isRoomJoined: boolean, roomId: string, error?: string) => {
      if (!error) {
        console.log('WebRTC > 연결됨.')
        return done(true)
      }

      done(false)
      connection.onerror(error)
    }
  )
}

const connect = (meetId: string) => {
  // 이미 접속한 상태이면 접속시도 안함
  if (currentMeetId === meetId) return
  currentMeetId = meetId

  connection.socketURL = `${HOST}/`
  connection.socketMessageEvent = 'data-sharing'
  connection.chunkSize = 60 * 1000
  connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: false,
    OfferToReceiveVideo: false
  }
  connection.session = { data: true }
  connection.onmessage = (event: any) => {
    console.log(event?.data?.key, event?.data?.payload)
    const { key, payload } = event?.data || {}
    if (key === 'draw:add') {
      console.log(key, payload)
      const [x, y, w, h, type] = payload as Packet
      const pointX = x / (w / window.innerWidth)
      const pointY = y / (h / window.innerHeight)
      buffer('test', type, pointX, pointY)
      ipcRenderer.send('show-window')
      log('[SOCK] remote draw', 'test')
    }
    if (key === 'organizer-info:refetch') {
      log('[SOCK] new client join', payload)
    }
  }
  connection.onerror = () => log('error!')
  connection.checkPresence(meetId, (isRoomExist: boolean) => (isRoomExist ? joinRoom : openRoom)(meetId, (joined: boolean) => {
    log('[SOCK] connect to', meetId)
    if (joined) {
      connection.send({ key: 'refetch' })
    }
  }))
  connection.socket.on('disconnect', () => {
    log('[SOCK] disconnected')
  })

  log('[SOCK] Socket Server : ', connection.socketURL)
}
