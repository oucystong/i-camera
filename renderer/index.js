// const { BrowserWindow, ipcMain } = require("@electron/remote");
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
    let vedioWindow = window.open("html/vedio_window.html", "_blank");
    // 消息监听器-监听来自子窗口的消息
    window.addEventListener("message", (msg) => {
      if (JSON.stringify(msg.data) != null) {
        if (vedioWindow != null) {
          vedioWindow.close();
          vedioWindow = null;
        }
        openVedioBtn.removeAttribute("disabled");
        startRecordBtn.removeAttribute("disabled");
        takePhotoBtn.removeAttribute("disabled");
      }
    });
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
