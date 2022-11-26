const { contextBridge, ipcRenderer } = require("electron");
// const fs = require("fs");

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
      // fs.writeFile("test.mp4", buffer, {}, (err, res) => {
      //   if (err) return console.error(err);
      // });
    };
    reader.readAsArrayBuffer(blob);
  },
});
