const { BrowserWindow, ipcMain } = require("@electron/remote");
// require("@electron/remote/main").initialize();

// 获取按钮元素
var openVedioBtn = document.getElementById("openVedioBtn");
var startRecordBtn = document.getElementById("startRecordBtn");
var stopRecordBtn = document.getElementById("stopRecordBtn");
var takePhotoBtn = document.getElementById("takePhotoBtn");

// 绑定点击事件
window.onload = () => {
  // 打开直播摄像头
  openVedioBtn.onclick = () => {
    // 禁用打开按钮
    openVedioBtn.setAttribute("disabled", true);
    startRecordBtn.setAttribute("disabled", true);
    takePhotoBtn.setAttribute("disabled", true);
    let vedioWindow = new BrowserWindow({
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
      },
    });
    // let vedioWindow = window.electron.getVedioWindow();
    // 打开调试模式
    // vedioWindow.webContents.openDevTools();
    // 加载remote模块
    // require("@electron/remote/main").enable(vedioWindow.webContents);
    // 窗口穿透
    // vedioWindow.setIgnoreMouseEvents(true);
    // console.log("===");
    vedioWindow.loadFile("html/vedio_window.html");
    // 监听窗口的关闭 缩小 放大
    ipcMain.on("window-close", () => {
      if (vedioWindow != null) {
        vedioWindow.close();
        vedioWindow = null;
      }
      // 解除按钮禁用
      openVedioBtn.removeAttribute("disabled");
      startRecordBtn.removeAttribute("disabled");
      takePhotoBtn.removeAttribute("disabled");
    });
    // this.createWindow();
    // this.createWindow("html/vedio_window.html");
  };
  // 录制视频
  startRecordBtn.onclick = () => {};
  // 结束录制
  stopRecordBtn.onclick = () => {};
  // 拍照
  takePhotoBtn.onclick = () => {
    // 禁用打开按钮
    openVedioBtn.setAttribute("disabled", true);
    startRecordBtn.setAttribute("disabled", true);
    takePhotoBtn.setAttribute("disabled", true);
    let vedioWindow = new BrowserWindow({
      width: 500,
      height: 280,
      movable: true, // 可移动
      resizable: true, // 不可改变大小
      webPreferences: {
        // 开启node环境
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    // 打开调试模式
    vedioWindow.webContents.openDevTools();
    // 加载remote模块;
    // require("@electron/remote/main").enable(win.webContents);
    // 窗口穿透
    // vedioWindow.setIgnoreMouseEvents(true);
    vedioWindow.loadFile("html/photo_window.html");
    // 监听窗口的关闭 缩小 放大
    ipcMain.on("window-close", () => {
      vedioWindow.close();
    });
    // 监听窗口关闭
    vedioWindow.on("closed", () => {
      vedioWindow = null;
      // 解除按钮禁用
      openVedioBtn.removeAttribute("disabled");
      startRecordBtn.removeAttribute("disabled");
      takePhotoBtn.removeAttribute("disabled");
    });
  };
};
