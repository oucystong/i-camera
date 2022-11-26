const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Notification,
} = require("electron");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const path = require("path");
const fs = require("fs");

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
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // 打开调试模式
  win.webContents.openDevTools();
  // 设置打开子窗口处理器-增强原生window.open中的feature参数
  win.webContents.setWindowOpenHandler((urlData) => {
    let htmlName = urlData.url.substring(
      urlData.url.lastIndexOf("/") + 1,
      urlData.url.lastIndexOf(".")
    );
    if (htmlName === "vedio_window") {
      // 直播摄像头窗口配置
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
    } else if (htmlName === "photo_window") {
      // 拍照窗口配置
      return {
        action: "allow",
        overrideBrowserWindowOptions: {
          width: 200,
          height: 300,
          roundedCorners: false,
          frame: false,
          movable: true,
          resizable: true,
          transparent: true,
          alwaysOnTop: true,
          show: true,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
          },
        },
      };
    }
    return { action: "deny" };
  });

  // 执行保存文件操作
  ipcMain.handle("savePicture", (event, imgData) => {
    // console.log(imgData);

    let base64 = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = Buffer.from(base64, "base64");
    let dia = dialog.showSaveDialogSync({
      buttonLabel: "保存我的照片",
      filters: [{ name: "Custom File Type", extensions: ["png", "jpg"] }],
    });

    if (!dia) {
      //点击取消时
      new Notification({
        title: "ICamera",
        body: "取消保存",
      }).show();
    } else {
      // 确认保存
      fs.writeFile(dia, dataBuffer, function (err) {
        if (err) {
          new Notification({
            title: "ICamera",
            body: "保存失败",
          }).show();
        } else {
          new Notification({
            title: "ICamera",
            body: "保存成功",
          }).show();
        }
      });
    }
  });

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
