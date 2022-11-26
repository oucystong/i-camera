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
});
contextBridge.exposeInMainWorld("goBiliniliAPI", {
  goBilibili: () => {
    ipcRenderer.invoke("goBilibili");
  },
});
