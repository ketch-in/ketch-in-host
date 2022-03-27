import { app, ipcMain, globalShortcut, BrowserWindow, Tray, Menu } from 'electron' // dialog
import * as path from 'path'

if (require('electron-squirrel-startup')) {
  app.quit()
}

let window: BrowserWindow = null
let tray: Tray = null
let meetId: string = null

const HOST = process.env.HOST || 'http://localhost'

const isEnvSet = 'ELECTRON_IS_DEV' in process.env
const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1
const isDev = isEnvSet ? getFromEnv : !app.isPackaged
console.log('[env]', 'MODE :', isDev ? 'development' : 'production')
console.log('[env]', 'HOST :', HOST)

// OS에 앱스킴 등록
if (process.defaultApp && process.argv.length >= 2) {
  app.setAsDefaultProtocolClient('ketch-in', process.execPath, [path.resolve(process.argv[1])])
} else {
  app.setAsDefaultProtocolClient('ketch-in')
}

// 트레이 아이콘 갱신
const updateTray = (enabled = false) => {
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Toggle Draw', accelerator: 'CmdOrCtrl+D', click: toggleWindow },
    { label: 'Hide Draw', accelerator: 'Escape', enabled, click: hideWindow },
    { label: 'Exit', accelerator: 'CmdOrCtrl+Q', role: 'quit' }
  ])

  tray.setImage(getIconPath(enabled))
  tray.setContextMenu(contextMenu)
}

const createWindow = (): void => {
  window = new BrowserWindow({
    webPreferences: {
      // 렌더러 esm 문법 사용시 오류 수정
      preload: path.join(__dirname, '../../scripts/preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
    transparent: true,
    // resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    autoHideMenuBar: true,
    show: false,
    frame: false
    // focusable: false
  })

  window.loadFile(path.join(__dirname, '../../src/renderer/index.html')) // eslint-disable-line

  // window.webContents.openDevTools();

  showWindow()
}

const toggleWindow = () => {
  if (window?.isVisible()) {
    // 토글시 타인의 의해 윈도가 활성화된 경우, 1회 호스트도 드로잉 상태로 만든다.(한번더 토글해야 clear된다.)
    if (getIgnoreMouseEvents()) {
      sendIgnoreEvents(false)
      return
    }
    hideWindow()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  if (!window) return createWindow()
  if (window.isVisible()) return

  if (!isDev && !meetId) {
    // return showMessage('`meetId`를 찾을 수 없습니다. 화면 공유를 실행해 주세요')
  }
  // TODO 멀티 모니터인 경우 밋에서 선택한 모니터를 찾아야 한다.
  const position = getWindowPosition()
  window.setPosition(position.x, position.y, false)
  window.maximize()
  window.show()
  window.focus()

  // 트레이 아이콘 및 메뉴 갱신
  updateTray(true)

  // 현재 밋ID 및 마우스 이벤트 무시 상태를 렌더러로 발송
  sendMeetId()

  // 글로벌 단축키 등록 - 숨기기
  globalShortcut.register('Escape', hideWindow)
}

const hideWindow = () => {
  if (window?.isVisible()) {
    window.hide()
    updateTray(false)
    // 글로벌 단축키 해제 - 숨기기
    globalShortcut.unregister('Escape')

    // 마우스 포인터 이벤트 앱이 캡쳐한다.
    sendIgnoreEvents(false)
  }
}

/*
const showMessage = (message: string) => {
  dialog.showErrorBox('Ketch In', message)
}
*/

const removeMenu = () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([]))
  Menu.setApplicationMenu(null)
}

// 트레이 아이콘 경로 가져오기
const getIconPath = (on = false) => path.join(__dirname, '..', '..', 'assets', `${on ? 'enable' : 'disable'}.png`)

// 현재 마우스 포인터가 위치한 화면을 찾아낸다.
const getWindowPosition = () => {
  const windowBounds = window.getBounds()
  const trayBounds = tray.getBounds()
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  const y = Math.round(trayBounds.y + trayBounds.height + 4)
  return { x: x, y: y }
}

const sendLog = (message: string) => {
  if (!window) {
    return console.log('[app-log] window not ready')
  }
  window.webContents.send('app-log', message)
}

const sendMeetId = () => {
  if (!window) {
    return console.log('[meet-start] window not ready')
  }
  if (!meetId) {
    sendLog('meetId not found')
  }
  window.webContents.send('meet-start', meetId, isDev)
  // meetId = null;
}

// 마우스 포인터 이벤트를 캡쳐하거나 OS로 흘려보낸다.
let ignoreEventState = false
const sendIgnoreEvents = (state: boolean) => {
  if (!window) {
    return console.log('[ignore-events] window not ready')
  }
  if (ignoreEventState === state) return
  if (state) {
    window.setIgnoreMouseEvents(true, { forward: true })
    sendLog('mouse event released')
  } else {
    window.setIgnoreMouseEvents(false)
    sendLog('mouse event capturing')
  }
  window.webContents.send('ignore-events', state)
  ignoreEventState = state
}

// 현재 마우스 포인터 이벤트 상태를 반환한다.
const getIgnoreMouseEvents = () => ignoreEventState

app.on('ready', () => {
  // 트레이 아이콘 생성
  tray = new Tray(getIconPath())
  updateTray()

  // 글로벌 단축키 등록 - 토글
  globalShortcut.register('CommandOrControl+D', toggleWindow)

  // 앱 메뉴 사용안함
  if (!isDev) {
    removeMenu()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 글로벌 단축키 해제
app.on('will-quit', () => {
  globalShortcut.unregister('CommandOrControl+D')
  globalShortcut.unregister('Escape')
})

app.on('open-url', function (_event, data) {
  // event.preventDefault();
  const scheme = 'ketch-in://open?id='
  if (data?.startsWith(scheme)) {
    console.log('[open-url]', data)
    meetId = data.replace(scheme, '')
    showWindow()
  }
})

ipcMain.on('meet-start', () => sendMeetId())
ipcMain.on('show-window', () => {
  showWindow()
  if (!window?.isVisible()) {
    // 타인의 의해 윈도가 활성화된 경우, 마우스 포인터 이벤트를 OS로 흘려보낸다.
    sendIgnoreEvents(true)
  }
})
ipcMain.on('hide-window', () => hideWindow())
