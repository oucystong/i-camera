const {
  contextBridge,
  ipcRenderer,
  remote,
  shell,
  dialog,
  ipcMain,
  BrowserWindow,
} = require("electron");
contextBridge.exposeInMainWorld("electron", {
  getVedioWindow: () => {
    return new BrowserWindow({
      width: 160,
      height: 160,
      roundedCorners: false, // 防止在Mac上的无边框透明窗口有上面那个白线
      frame: false, // 无边框
      movable: true, // 可移动
      resizable: false, // 不可改变大小
      transparent: true, // 透明
      alwaysOnTop: true, // 总是在最上方
      show: true,
      webPreferences: {
        // 开启node环境
        nodeIntegration: true,
        contextIsolation: false,
        // preload: path.join(__dirname, "preload.js"),
      },
    });
  },
});
