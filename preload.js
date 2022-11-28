const { contextBridge, ipcRenderer } = require("electron");

// dialogAPI->让主线程去执行保存操作->主线程有所有的node环境和electron模块环境
contextBridge.exposeInMainWorld("dialogAPI", {
  savePicture: (imgData) => {
    ipcRenderer.invoke("savePicture", imgData);
  },
  saveMovie: (blob) => {
    let reader = new FileReader();
    reader.onload = () => {
      let buffer = Buffer.from(reader.result);
      // 让主线程去保存，预加载在此进行转换Blob到Buffer，主线程无法处理Blob
      ipcRenderer.invoke("saveMovie", buffer);
    };
    reader.readAsArrayBuffer(blob);
  },
  // 退出摄像头通知发送-主线程去做
  quitVedio: (msg) => {
    // console.log(msg);
    ipcRenderer.invoke("quitVedio", msg);
  },
  // 暂停摄像头通知发送-主线程去做
  pauseVedio: (msg) => {
    ipcRenderer.invoke("pauseVedio", msg);
  },
  // 继续摄像头通知发送-主线程去做
  resumeVedio: (msg) => {
    ipcRenderer.invoke("resumeVedio", msg);
  },
  // 退出录像通知发送-主线程去做
  quitRecord: (msg) => {
    // console.log(msg);
    ipcRenderer.invoke("quitRecord", msg);
  },
  // 暂停摄像头通知发送-主线程去做
  pauseRecord: (msg) => {
    ipcRenderer.invoke("pauseRecord", msg);
  },
  // 继续录像通知发送-主线程去做
  resumeRecord: (msg) => {
    ipcRenderer.invoke("resumeRecord", msg);
  },
  // 退出拍照通知发送-主线程去做
  quitPhoto: (msg) => {
    ipcRenderer.invoke("quitPhoto", msg);
  },
});
contextBridge.exposeInMainWorld("goBiliniliAPI", {
  goBilibili: () => {
    ipcRenderer.invoke("goBilibili");
  },
});
