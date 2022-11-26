const { contextBridge, ipcRenderer } = require("electron");

// dialogAPI->让主线程去执行保存操作->主线程有所有的node环境和electron模块环境
contextBridge.exposeInMainWorld("dialogAPI", {
  savePicture: (imgData) => {
    // console.log(imgData);
    ipcRenderer.invoke("savePicture", imgData);
  },
});
