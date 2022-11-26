const { app, BrowserWindow } = require("electron");
// require("@electron/remote/main").initialize();
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const path = require("path");

// 实现热部署
const isDevelopment = !app.isPackaged;
if (isDevelopment) {
  try {
    require("electron-reloader")(module);
  } catch (err) {}
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 330,
    height: 60,
    // frame: false,
    // transparent: true,
    webPreferences: {
      // 开启node环境
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // 打开调试模式
  win.webContents.openDevTools();

  // 设置打开子窗口处理器-增强原生window.open中的feature参数
  win.webContents.setWindowOpenHandler((urlData) => {
    if (urlData != null) {
      return {
        action: "allow",
        overrideBrowserWindowOptions: {
          width: 160,
          height: 160,
          roundedCorners: false,
          frame: false,
          movable: true,
          resizable: false,
          transparent: true,
          alwaysOnTop: true,
          show: true,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
          },
        },
      };
    }
    return { action: "deny" };
  });

  // 加载remote模块
  // require("@electron/remote/main").enable(win.webContents);
  // 加载主界面
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
