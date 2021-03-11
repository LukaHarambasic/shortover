const { app, BrowserWindow, globalShortcut, remote } = require('electron')

const MEDIA_DIR = 'media/'

const DEFAULT_DISPLAY_TIME = 2000

const BASE_SHORTCUT = 'Control+S+C+'

const MEDIA = [
  {
    file: 'party_hard.gif',
    shortcut: '1',
    //displayTime: 2000
  },
  {
    file: 'thanks.gif',
    shortcut: '2'
  },
  {
    file: 'hello.webp',
    shortcut: '3'
  },
  {
    file: 'confetti.gif',
    shortcut: '4'
  },
  {
    file: 'see_you_soon_dwayne.gif',
    shortcut: '5'
  },
  {
    file: 'see_you_soon_spongebob.gif',
    shortcut: '6'
  }
]

let window = null

function createWindow() {
  window = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false
  })
}

app.whenReady().then( () => {
  createWindow()
  MEDIA.forEach(gif => {
    globalShortcut.register(BASE_SHORTCUT + gif.shortcut, async () => {
      console.log(gif.file, BASE_SHORTCUT + gif.shortcut);
      await window.loadFile(MEDIA_DIR + gif.file);
      window.show();
      setTimeout(async () => {
        await window.loadFile(MEDIA_DIR + 'placeholder.svg');
        window.minimize();
      }, gif.displayTime || DEFAULT_DISPLAY_TIME);
    })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
