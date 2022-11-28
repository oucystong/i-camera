const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Notification,
  shell,
} = require("electron");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const path = require("path");
const fs = require("fs");

// // 实现热部署-开发专用-npm install electron-reloader --save-dev
// const isDevelopment = !app.isPackaged;
// if (isDevelopment) {
//   try {
//     require("electron-reloader")(module);
//   } catch (err) {}
// }

const createWindow = () => {
  const win = new BrowserWindow({
    width: 345,
    height: 60,
    resizable: false,
    show: true,
    // alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // 打开调试模式
  // win.webContents.openDevTools();
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
            preload: path.join(__dirname, "preload.js"),
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
          resizable: false,
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
    } else if (htmlName === "record_window") {
      // 录像窗口配置
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
          // vibrancy: "selection",
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

// 不要重复监听处理
// 执行保存文件操作
ipcMain.handle("savePicture", (event, imgData) => {
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

ipcMain.handle("saveMovie", (event, buffer) => {
  // 保存视频文件
  let dia = dialog.showSaveDialogSync({
    buttonLabel: "保存我的录像",
    filters: [{ name: "Custom File Type", extensions: ["mp4"] }],
  });
  if (!dia) {
    //点击取消时
    new Notification({
      title: "ICamera",
      body: "取消保存",
    }).show();
  } else {
    // 确认保存
    fs.writeFile(dia, buffer, function (err) {
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

ipcMain.handle("goBilibili", (event) => {
  shell.openExternal("https://space.bilibili.com/52459877");
});

ipcMain.handle("quitVedio", (event, msg) => {
  sendSystemNotification(msg);
});

ipcMain.handle("pauseVedio", (event, msg) => {
  sendSystemNotification(msg);
});

ipcMain.handle("resumeVedio", (event, msg) => {
  sendSystemNotification(msg);
});

ipcMain.handle("quitRecord", (event, msg) => {
  sendSystemNotification(msg);
});

ipcMain.handle("pauseRecord", (event, msg) => {
  sendSystemNotification(msg);
});

ipcMain.handle("resumeRecord", (event, msg) => {
  sendSystemNotification(msg);
});

ipcMain.handle("quitPhoto", (event, msg) => {
  sendSystemNotification(msg);
});

sendSystemNotification = (msg) => {
  new Notification({
    title: "ICamera",
    body: msg,
  }).show();
};
